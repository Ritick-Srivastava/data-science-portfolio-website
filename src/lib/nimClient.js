import { aboutMeSystemPrompt } from "../data/aboutMe";

const API_URL = import.meta.env.DEV
  ? "/nim-api/chat/completions"
  : "/api/nim";

export async function* streamChat(messages) {
  const headers = { "Content-Type": "application/json" };

  if (import.meta.env.DEV) {
    headers["Authorization"] = `Bearer ${import.meta.env.VITE_NVIDIA_NIM_API_KEY}`;
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "meta/llama-3.3-70b-instruct",
      messages: [{ role: "system", content: aboutMeSystemPrompt }, ...messages],
      stream: true,
      max_tokens: 512,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("NIM API error:", response.status, err);
    throw new Error(`API ${response.status}: ${err}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop();

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") return;
      try {
        const parsed = JSON.parse(data);
        const text = parsed.choices?.[0]?.delta?.content;
        if (text) yield text;
      } catch {
        // skip malformed SSE lines
      }
    }
  }
}
