import { useState } from "react";

export default function App() {
  const [form, setForm] = useState({ projectName: "", description: "", hasLiveDemo: false });
  const [state, setState] = useState("idle");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value });
  async function submit(event) {
    event.preventDefault(); setResult(null); setError(""); setState("input-streaming");
    await new Promise((resolve) => setTimeout(resolve, 450)); setState("input-available");
    try {
      const response = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The tool could not run.");
      setResult(data); setState("output-available");
    } catch (caught) { setError(caught.message); setState("output-error"); }
  }
  return <main><header><p className="eyebrow">FLYRANK FE-07 · SERVER-SIDE TOOL</p><h1>Project Readiness Analyzer</h1><p>Submit a project summary and receive a structured assessment, rendered as components instead of a JSON dump.</p></header><div className="grid"><form onSubmit={submit} className="panel"><h2>Project input</h2><label>Project name<input required minLength="2" name="projectName" value={form.projectName} onChange={update} placeholder="e.g. VoxelVerse" /></label><label>Short description<textarea required minLength="12" name="description" value={form.description} onChange={update} placeholder="What problem does it solve, and what did you build?" /></label><label className="check"><input type="checkbox" name="hasLiveDemo" checked={form.hasLiveDemo} onChange={update} /> Live demo available</label><button>Analyze project</button></form><section className="panel" aria-live="polite"><h2>Tool lifecycle</h2>{state === "idle" && <div className="state idle">Waiting for a project input.</div>}{state === "input-streaming" && <div className="state streaming"><i />Preparing <b>analyzeProject</b> tool input...</div>}{state === "input-available" && <div className="state input"><b>Input available</b><span>{form.projectName || "Untitled project"} is ready for server-side validation.</span></div>}{state === "output-error" && <div className="state error"><b>Tool execution failed</b><span>{error}</span><small>Check both required fields and try again.</small></div>}{state === "output-available" && <Result data={result.output} />}</section></div></main>;
}
function Result({ data }) { return <div className="result"><div className="score"><strong>{data.score}</strong><div><b>{data.level}</b><small>portfolio readiness score</small></div></div><h3>Structured findings</h3><div className="findings">{data.findings.map((finding) => <article key={finding.area}><span className={finding.status === "Ready" ? "ready" : "improve"}>{finding.status}</span><b>{finding.area}</b><p>{finding.detail}</p></article>)}</div><div className="next"><b>Recommended next step</b><p>{data.nextStep}</p></div></div>;}