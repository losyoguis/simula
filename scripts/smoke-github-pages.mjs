import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const viteBin = path.join(projectRoot, "node_modules", "vite", "bin", "vite.js");
const port = 4319;
const origin = `http://127.0.0.1:${port}`;

const server = spawn(
  process.execPath,
  [viteBin, "preview", "--config", "vite.github-pages.config.ts", "--host", "127.0.0.1", "--port", String(port), "--strictPort"],
  {
    cwd: projectRoot,
    env: { ...process.env, NO_PROXY: "127.0.0.1,localhost", no_proxy: "127.0.0.1,localhost" },
    stdio: ["ignore", "pipe", "pipe"],
  },
);

let serverLog = "";
server.stdout.on("data", (chunk) => { serverLog += chunk; });
server.stderr.on("data", (chunk) => { serverLog += chunk; });

const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

try {
  let response;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      response = await fetch(origin);
      if (response.ok) break;
    } catch {
      await pause(100);
    }
  }

  assert.ok(response?.ok, `La portada estática no respondió correctamente.\n${serverLog}`);
  const html = await response.text();
  assert.match(html, /<html lang="es">/);
  assert.match(html, /<div id="root"><\/div>/);

  const assetPaths = [
    ...html.matchAll(/(?:src|href)="\.\/(assets\/[^\"]+)"/g),
  ].map((match) => match[1]);
  assert.ok(assetPaths.length >= 2, "No se encontraron los recursos CSS y JavaScript compilados.");

  let javascript = "";
  for (const assetPath of assetPaths) {
    const assetResponse = await fetch(`${origin}/${assetPath}`);
    assert.ok(assetResponse.ok, `No se pudo cargar ${assetPath}.`);
    if (assetPath.endsWith(".js")) javascript += await assetResponse.text();
  }

  assert.match(html, /SIMULA — La enciclopedia de la simulación/);
  for (const expectedText of [
    "La enciclopedia de la simulación",
    "Una enciclopedia para aprender haciendo.",
    "Industria y manufactura",
    "Deportes y educación física",
  ]) {
    assert.ok(javascript.includes(expectedText), `La compilación no contiene: ${expectedText}`);
  }
  assert.ok(!javascript.includes("universal-search"), "El buscador retirado todavía aparece en la compilación.");

  console.log(`Prueba HTTP correcta: portada y ${assetPaths.length} recursos estáticos disponibles.`);
} finally {
  server.kill("SIGTERM");
}
