# Actualización del catálogo de Simula

Esta versión amplía el catálogo hasta **528 recursos en 27 categorías**.

## Áreas incorporadas

- IA y datos: 22 recursos.
- Ciberseguridad: 19 recursos.
- Agricultura: 20 recursos.
- Sostenibilidad: 20 recursos.
- Emprendimiento: 17 recursos.
- Psicología: 28 recursos.
- Derecho: 25 recursos.
- Comunicación: 25 recursos.
- Oficios: 22 recursos.
- Arquitectura: 29 recursos.

## Funciones actualizadas

- Búsqueda por título, descripción, categoría y etiquetas.
- Filtros para las 27 categorías y los tres tipos de acceso.
- Asistente con vocabulario específico de las diez áreas nuevas.
- Favoritos almacenados localmente en el navegador.
- Enlaces externos abiertos en una pestaña nueva.
- Compilación relativa compatible con GitHub Pages.
- `index.html` autocontenido para publicación directa e inserción en Google Sites.

## Comprobaciones incluidas

El script `npm run validate:catalog` comprueba cantidad mínima, categorías,
identificadores, etiquetas, tipos de acceso y enlaces HTTPS. La compilación
estática y las pruebas automatizadas se ejecutan antes de generar el ZIP. El
comando `npm run smoke:github-pages` comprueba por HTTP la portada, el CSS y el
JavaScript de la versión publicada.
