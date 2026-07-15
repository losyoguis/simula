import { readFile, writeFile } from "node:fs/promises";

const compiledIndexUrl = new URL("../docs/index.html", import.meta.url);
const rootIndexUrl = new URL("../index.html", import.meta.url);

const compiledHtml = await readFile(compiledIndexUrl, "utf8");

const scriptMatch = compiledHtml.match(
  /[ \t]*<script\b[^>]*\btype="module"[^>]*\bsrc="\.\/assets\/([^"]+\.js)"[^>]*><\/script>\r?\n?/,
);
const stylesheetMatch = compiledHtml.match(
  /<link\b[^>]*\brel="stylesheet"[^>]*\bhref="\.\/assets\/([^"]+\.css)"[^>]*>/,
);

if (!scriptMatch || !stylesheetMatch) {
  throw new Error("No se encontraron los recursos compilados para el index.html principal.");
}

const [compiledJavascript, compiledStylesheet] = await Promise.all([
  readFile(new URL(`../docs/assets/${scriptMatch[1]}`, import.meta.url), "utf8"),
  readFile(new URL(`../docs/assets/${stylesheetMatch[1]}`, import.meta.url), "utf8"),
]);

const safeJavascript = compiledJavascript.replaceAll("</script", "<\\/script");
const safeStylesheet = compiledStylesheet.replaceAll("</style", "<\\/style");

const rootHtml = compiledHtml
  .replace('href="./favicon.svg"', 'href="./public/favicon.svg"')
  .replace(scriptMatch[0], "")
  .replace(stylesheetMatch[0], () => `<style>\n${safeStylesheet}\n</style>`)
  .replace(
    /window\.__SIMULA_ASSET_BASE__\s*=\s*["']\.\/["']\s*;/,
    'window.__SIMULA_ASSET_BASE__="./public/";',
  )
  .replace("</body>", () => `<script>\n${safeJavascript}\n</script>\n  </body>`);

if (!rootHtml.includes('window.__SIMULA_ASSET_BASE__="./public/";')) {
  throw new Error("No se pudo configurar la ruta de imágenes del index.html principal.");
}

if (/<script\b[^>]*\bsrc=|<link\b[^>]*\brel="stylesheet"/i.test(rootHtml)) {
  throw new Error("El index.html principal aún depende de JavaScript o CSS externo.");
}

await writeFile(rootIndexUrl, `${rootHtml.trim()}\n`, "utf8");
