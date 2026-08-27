# Orbital Artifact - FE-AA2

A small interactive 3D browser experience made with Three.js. It is an inspectable orbital artifact rather than a downloaded model viewer, so the first load has no GLB asset to fetch.

## What it does

- Lazy-loads Three.js only after the user starts the experience.
- Renders procedural geometry, lighting and a staged scene in WebGL.
- Supports mouse and touch drag to rotate the artifact.
- Lets the user change the core color, surface treatment and auto-rotation.
- Shows a static CSS fallback when reduced motion is enabled or the 3D library cannot load.

## Run

Open `three-d-experience.html` through the deployed site, for example:

`https://your-site.vercel.app/three-d-experience.html`

## Performance note

The scene uses procedural primitives instead of a downloaded GLB, caps device pixel ratio at 1.5 and requests the browser's low-power graphics preference. Three.js is lazy-loaded after an explicit click, so visitors who do not open the experience do not download the 3D library. The UI includes a live FPS estimate for a manual FE-10 check; it does not claim a fixed device-independent frame rate.

## With more time

I would add compressed GLB upload support, a real environment map with a small fallback, saved color presets and a screenshot/export action.