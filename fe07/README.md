# FE-07 - Tool results and structured output

A self-contained project for the FlyRank Frontend AI Engineering assignment.

## Run locally

\`\`\`bash
npm install
npm run dev
\`\`\`

## Tool contract

### \`analyzeProject\`

- **Purpose:** evaluates whether a software project is ready to present in a portfolio.
- **Input schema:** Zod object with \`projectName\` (2-80 characters), \`description\` (12-500 characters), and \`hasLiveDemo\` (boolean).
- **Return shape:** \`{ score, level, findings: [{ area, status, detail }], nextStep }\`.
- **Definition and execution:** \`api/analyze.js\`. The tool runs on the server; the browser only receives the structured result.

## Required lifecycle states

1. **Input streaming** - animated violet state while input is prepared.
2. **Input available** - cyan state after input is ready for server validation.
3. **Output available** - readiness score and findings are rendered as real components.
4. **Output error** - a red designed error state with recovery guidance.

## Deploy to Vercel

Import this GitHub repository in Vercel and set **Root Directory** to \`fe07\`. The deployed URL is the Preview URL for FE-07. Submit the GitHub link to \`fe07/api/analyze.js\` as the tool definition file.