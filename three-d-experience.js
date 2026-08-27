const startButton = document.querySelector("#load-scene");
const host = document.querySelector("#canvas-host");
const fallback = document.querySelector("#fallback");
const controls = document.querySelector("#controls");
const status = document.querySelector("#scene-status");
const performanceNote = document.querySelector("#performance-note");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

startButton.addEventListener("click", async () => {
  if (prefersReducedMotion.matches) { status.textContent = "Reduced motion is enabled, so the static preview remains active."; return; }
  startButton.disabled = true;
  startButton.textContent = "Loading scene...";
  try {
    const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.166.1/build/three.module.js");
    beginScene(THREE);
  } catch {
    startButton.disabled = false;
    startButton.textContent = "Try loading 3D again";
    status.textContent = "The 3D scene could not load. The static preview remains available.";
  }
});

function beginScene(THREE) {
  fallback.hidden = true; host.hidden = false; controls.hidden = false; startButton.hidden = true;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, host.clientWidth / host.clientHeight, 0.1, 100);
  camera.position.set(0, 0.5, 7);
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(host.clientWidth, host.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xcff6ff, 0x07202d, 2.3));
  const key = new THREE.DirectionalLight(0xffffff, 2.5); key.position.set(4, 5, 6); scene.add(key);
  const artifact = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({ color: "#56d8ff", metalness: 0.35, roughness: 0.32 });
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.25, 2), material); artifact.add(core);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.75, .08, 12, 80), new THREE.MeshStandardMaterial({ color: "#d7f8ff", metalness: .8, roughness: .18 }));
  ring.rotation.x = 1.1; artifact.add(ring);
  const satellite = new THREE.Mesh(new THREE.SphereGeometry(.18, 20, 20), new THREE.MeshStandardMaterial({ color: "#ffd166", emissive: "#6c3e00", emissiveIntensity: .6 }));
  satellite.position.set(2.05, .25, 0); artifact.add(satellite); scene.add(artifact);

  let dragging = false, previousX = 0, previousY = 0, spin = true, frames = 0, lastTime = performance.now(), lastFpsUpdate = lastTime;
  renderer.domElement.addEventListener("pointerdown", event => { dragging = true; previousX = event.clientX; previousY = event.clientY; renderer.domElement.setPointerCapture(event.pointerId); });
  renderer.domElement.addEventListener("pointermove", event => { if (!dragging) return; artifact.rotation.y += (event.clientX - previousX) * .012; artifact.rotation.x += (event.clientY - previousY) * .008; previousX = event.clientX; previousY = event.clientY; });
  renderer.domElement.addEventListener("pointerup", () => dragging = false);
  document.querySelector("#spin").addEventListener("change", event => spin = event.target.checked);
  document.querySelector("#color").addEventListener("input", event => material.color.set(event.target.value));
  document.querySelector("#surface").addEventListener("change", event => {
    const modes = { matte: [0.08, .74], metal: [.9, .18], glass: [.18, .08] };
    [material.metalness, material.roughness] = modes[event.target.value];
  });
  new ResizeObserver(() => { camera.aspect = host.clientWidth / host.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(host.clientWidth, host.clientHeight); }).observe(host);

  function render(time) {
    const delta = Math.min((time - lastTime) / 1000, .05); lastTime = time;
    if (spin && !dragging) { artifact.rotation.y += delta * .45; artifact.rotation.z += delta * .08; }
    frames++;
    if (time - lastFpsUpdate > 1000) { performanceNote.textContent = "Frame rate: " + Math.round(frames * 1000 / (time - lastFpsUpdate)) + " FPS (live estimate)"; frames = 0; lastFpsUpdate = time; }
    renderer.render(scene, camera); requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
  status.textContent = "3D experience loaded. Drag the artifact, then use the controls to change its material.";
}