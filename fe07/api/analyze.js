import { z } from "zod";

// Tool contract: the schema constrains every value received by the server.
export const analyzeProjectInput = z.object({
  projectName: z.string().min(2).max(80),
  description: z.string().min(12).max(500),
  hasLiveDemo: z.boolean()
});

export const analyzeProject = {
  name: "analyzeProject",
  description: "Assess whether a software project is ready to present in a portfolio.",
  inputSchema: analyzeProjectInput,
  execute(input) {
    const words = input.description.trim().split(/\\s+/).length;
    const score = Math.min(95, 45 + (input.hasLiveDemo ? 22 : 0) + Math.min(18, words) + (/(react|next|typescript|ai|api|python)/i.test(input.description) ? 10 : 0));
    return { score, level: score >= 80 ? "Strong" : score >= 62 ? "Promising" : "Early stage", findings: [
      { area: "Project summary", status: words >= 18 ? "Ready" : "Improve", detail: words >= 18 ? "The description gives reviewers useful context." : "Explain the user problem and your contribution in 2-3 more sentences." },
      { area: "Live demonstration", status: input.hasLiveDemo ? "Ready" : "Improve", detail: input.hasLiveDemo ? "A live link lets reviewers test the experience." : "Deploy a small working version before submitting your portfolio." },
      { area: "Evidence", status: "Improve", detail: "Add screenshots, a GitHub link and a short technical decision note." }
    ], nextStep: input.hasLiveDemo ? "Write a concise case study and add your repository link." : "Deploy the project, then capture two screenshots for your case study." };
  }
};

export default function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });
  try { const input = analyzeProjectInput.parse(request.body); return response.status(200).json({ toolName: analyzeProject.name, input, output: analyzeProject.execute(input) }); }
  catch (error) { return response.status(400).json({ error: error instanceof Error ? error.message : "The tool could not run." }); }
}