const NVIDIA_API = "https://integrate.api.nvidia.com/v1/chat/completions";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const body = await request.text();

    const upstream = await fetch(NVIDIA_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.NVIDIA_NIM_API_KEY}`,
      },
      body,
    });

    const headers = new Headers(upstream.headers);
    Object.entries(CORS).forEach(([k, v]) => headers.set(k, v));

    return new Response(upstream.body, {
      status: upstream.status,
      headers,
    });
  },
};
