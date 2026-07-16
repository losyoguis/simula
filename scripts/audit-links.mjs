import fs from "node:fs/promises";
import { simulators } from "../app/catalog.ts";

const CONCURRENCY = Number(process.env.LINK_AUDIT_CONCURRENCY ?? 14);
const TIMEOUT_MS = Number(process.env.LINK_AUDIT_TIMEOUT_MS ?? 15000);
const RETRIES = Number(process.env.LINK_AUDIT_RETRIES ?? 1);
const USER_AGENT = "Mozilla/5.0 (compatible; SIMULA-Link-Audit/1.0; educational-catalog)";

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const request = async (url, method) => {
  const headers = { "user-agent": USER_AGENT, accept: "text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8" };
  if (method === "GET") headers.range = "bytes=0-2047";
  const response = await fetch(url, {
    method,
    headers,
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (response.body) await response.body.cancel().catch(() => {});
  return { status: response.status, finalUrl: response.url, method };
};

const checkOnce = async (url) => {
  let head;
  try {
    head = await request(url, "HEAD");
    if (head.status >= 200 && head.status < 400) return head;
  } catch (error) {
    head = { error: error instanceof Error ? error.message : String(error), method: "HEAD" };
  }

  try {
    return await request(url, "GET");
  } catch (error) {
    return {
      status: head.status ?? null,
      finalUrl: head.finalUrl ?? url,
      method: "GET",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const classify = (result) => {
  if (result.status >= 200 && result.status < 400) return "ok";
  if (result.status === 403) return "bloqueado";
  if ([401, 405, 406, 409, 418, 429, 451].includes(result.status)) return "protegido";
  if ([404, 410].includes(result.status)) return "caído";
  return "revisar";
};

const check = async (simulator) => {
  let result;
  for (let attempt = 0; attempt <= RETRIES; attempt += 1) {
    result = await checkOnce(simulator.href);
    const state = classify(result);
    if (state === "ok" || state === "protegido" || state === "caído") break;
    if (attempt < RETRIES) await sleep(350 * (attempt + 1));
  }
  return {
    id: simulator.id,
    title: simulator.title,
    category: simulator.category,
    url: simulator.href,
    state: classify(result),
    status: result.status ?? null,
    finalUrl: result.finalUrl ?? simulator.href,
    method: result.method,
    error: result.error ?? null,
  };
};

const results = new Array(simulators.length);
let cursor = 0;
const workers = Array.from({ length: Math.min(CONCURRENCY, simulators.length) }, async () => {
  while (cursor < simulators.length) {
    const index = cursor;
    cursor += 1;
    results[index] = await check(simulators[index]);
    if ((index + 1) % 50 === 0) console.log(`Auditados ${index + 1} de ${simulators.length} enlaces…`);
  }
});

await Promise.all(workers);

const summary = Object.groupBy(results, (item) => item.state);
const counts = Object.fromEntries(Object.entries(summary).map(([key, values]) => [key, values.length]));
const generatedAt = new Date().toISOString();
await fs.writeFile("link-audit.json", `${JSON.stringify({ generatedAt, counts, results }, null, 2)}\n`);

const reviewRows = results
  .filter((item) => item.state !== "ok")
  .map((item) => `| ${item.state} | ${item.status ?? "—"} | ${item.title.replaceAll("|", "\\|")} | ${item.url} |`)
  .join("\n");
const report = `# Auditoría de enlaces de SIMULA

Fecha UTC: ${generatedAt}

- Recursos revisados: ${results.length}
- Correctos: ${counts.ok ?? 0}
- Bloqueados por HTTP 403: ${counts.bloqueado ?? 0}
- Protegidos contra robots pero existentes: ${counts.protegido ?? 0}
- Caídos confirmados por HTTP 404/410: ${counts["caído"] ?? 0}
- Revisión manual necesaria: ${counts.revisar ?? 0}

| Estado | HTTP | Recurso | URL |
| --- | ---: | --- | --- |
${reviewRows || "| ok | — | Sin incidencias | — |"}
`;
await fs.writeFile("LINK-AUDIT.md", report);
console.log(`Auditoría terminada: ${JSON.stringify(counts)}.`);
if ((counts["caído"] ?? 0) > 0 || (counts.bloqueado ?? 0) > 0) process.exitCode = 2;
