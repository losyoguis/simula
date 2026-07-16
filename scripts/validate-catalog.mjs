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
];

assert.equal(categories.length, Object.keys(categoryMeta).length, "Las categorías y sus metadatos no coinciden.");
assert.ok(simulators.length >= 500, `El catálogo quedó incompleto: ${simulators.length} recursos.`);

const ids = new Set();
for (const simulator of simulators) {
  assert.ok(categories.includes(simulator.category), `Categoría desconocida en ${simulator.title}.`);
  assert.ok(!ids.has(simulator.id), `Identificador duplicado: ${simulator.id}.`);
  ids.add(simulator.id);
  assert.ok(simulator.title.trim(), "Hay un recurso sin título.");
  assert.ok(simulator.description.trim(), `Falta descripción en ${simulator.title}.`);
  assert.ok(simulator.tags.length >= 2, `Faltan etiquetas en ${simulator.title}.`);
  assert.ok(["directo", "opcional", "mixto"].includes(simulator.access), `Acceso inválido en ${simulator.title}.`);
  const url = new URL(simulator.href);
  assert.equal(url.protocol, "https:", `El enlace de ${simulator.title} no usa HTTPS.`);
}

for (const category of expandedCategories) {
  const count = simulators.filter((simulator) => simulator.category === category).length;
  assert.ok(count >= 15, `${category} solo tiene ${count} recursos.`);
}

console.log(`Catálogo validado: ${simulators.length} recursos, ${categories.length} categorías y ${ids.size} identificadores únicos.`);
