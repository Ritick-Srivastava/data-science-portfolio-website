export const config = { runtime: "edge" };

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  const body = await req.text();

  const upstream = await fetch(
    "https://integrate.api.nvidia.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NVIDIA_NIM_API_KEY}`,
      },
      body,
    }
  );

  const headers = new Headers(upstream.headers);
  Object.entries(CORS).forEach(([k, v]) => headers.set(k, v));

  return new Response(upstream.body, { status: upstream.status, headers });
}
