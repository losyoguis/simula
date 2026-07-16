import assert from "node:assert/strict";
import { categories, categoryMeta, simulators } from "../app/catalog.ts";

const expandedCategories = [
  "IA y datos",
  "Ciberseguridad",
  "Agricultura",
  "Sostenibilidad",
  "Emprendimiento",
  "Psicología",
  "Derecho",
  "Comunicación",
  "Oficios",
  "Arquitectura",
  "Industria y manufactura",
  "Deportes y educación física",
];

assert.equal(categories.length, Object.keys(categoryMeta).length, "Las categorías y sus metadatos no coinciden.");
assert.ok(simulators.length >= 500, `El catálogo quedó incompleto: ${simulators.length} recursos.`);

const ids = new Set();
const titles = new Set();
const urls = new Set();
for (const simulator of simulators) {
  assert.ok(categories.includes(simulator.category), `Categoría desconocida en ${simulator.title}.`);
  assert.ok(!ids.has(simulator.id), `Identificador duplicado: ${simulator.id}.`);
  ids.add(simulator.id);
  assert.ok(simulator.title.trim(), "Hay un recurso sin título.");
  const normalizedTitle = simulator.title.trim().toLocaleLowerCase("es");
  assert.ok(!titles.has(normalizedTitle), `Título duplicado: ${simulator.title}.`);
  titles.add(normalizedTitle);
  assert.ok(simulator.description.trim(), `Falta descripción en ${simulator.title}.`);
  assert.ok(simulator.tags.length >= 2, `Faltan etiquetas en ${simulator.title}.`);
  assert.ok(["directo", "opcional", "mixto"].includes(simulator.access), `Acceso inválido en ${simulator.title}.`);
  const url = new URL(simulator.href);
  assert.equal(url.protocol, "https:", `El enlace de ${simulator.title} no usa HTTPS.`);
  const normalizedUrl = url.href.replace(/\/$/, "");
  assert.ok(!urls.has(normalizedUrl), `Enlace duplicado: ${simulator.href}.`);
  urls.add(normalizedUrl);
}

for (const category of expandedCategories) {
  const count = simulators.filter((simulator) => simulator.category === category).length;
  assert.ok(count >= 15, `${category} solo tiene ${count} recursos.`);
}

console.log(`Catálogo validado: ${simulators.length} recursos, ${categories.length} categorías y ${ids.size} identificadores únicos.`);
