export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });
  const mode = request.query.mode || "success";
  if (mode === "network") return response.status(503).json({ error: "Network service is unavailable. Check your connection and retry." });
  if (mode === "rate-limit") return response.status(429).json({ error: "Rate limit reached. Please wait before retrying." });
  const prompt = typeof request.body?.prompt === "string" ? request.body.prompt.trim() : "";
  if (!prompt) return response.status(400).json({ error: "A message is required." });
  await new Promise(resolve => setTimeout(resolve, 650));
  return response.status(200).json({ reply: "Here is a concise starting point: describe the problem your project solves, the specific feature you built, and the evidence a reviewer can inspect. Keep the claim factual and link to the working result when available." });
}