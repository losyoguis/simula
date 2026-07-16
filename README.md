# SIMULA

**La enciclopedia de la simulación**

**Una enciclopedia para aprender haciendo.**

Biblioteca web de simuladores, simulacros, herramientas y juegos gratuitos.
Esta edición incluye **598 recursos**, organizados en **29 categorías**, con
filtros de acceso, favoritos locales, asistente de recomendaciones y
diseño adaptable a móviles.

La ampliación incorpora áreas específicas de **IA y datos, ciberseguridad,
agricultura, sostenibilidad, emprendimiento, psicología, derecho, comunicación,
oficios, arquitectura, industria y manufactura, y deportes y educación física**.
Todas participan en los filtros y en el asistente.

## Lista para publicar

- `index.html`: versión autocontenida que funciona desde la raíz del repositorio.
- `docs/`: versión estática preparada para GitHub Pages.
- `.github/workflows/deploy-pages.yml`: publicación automática con GitHub Actions.
- `app/catalog.ts`: catálogo completo y editable.
- `GUIA-GITHUB-PAGES.md`: instrucciones de publicación e inserción en Google Sites.
- `ACTUALIZACION-CATALOGO.md`: resumen de las nuevas categorías y verificaciones.
- `LINK-AUDIT.md`: registro de la revisión y de los enlaces HTTP 403 retirados.

La web pública no necesita servidor, base de datos, inicio de sesión ni claves.
Los recursos externos se abren en una pestaña nueva para que también funcionen
cuando SIMULA está incorporado dentro de Google Sites.

El asistente analiza la descripción escrita por el visitante directamente en
su navegador y recomienda recursos del catálogo. No necesita API, no utiliza
servicios externos y no almacena las consultas.

## Uso rápido

Para usar la versión incluida, abre `index.html`. Para modificar y recompilar:

```bash
npm ci
npm run audit:links
npm run build:github-pages
npm run smoke:github-pages
npm run preview:github-pages
```

Requiere Node.js 22 o superior únicamente para desarrollo. Consulta
`GUIA-GITHUB-PAGES.md` para el procedimiento completo.
