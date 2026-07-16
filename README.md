# Simula

Biblioteca web de simuladores, simulacros, herramientas y juegos gratuitos.
Esta edición incluye **307 recursos**, organizados en **17 categorías**, con
búsqueda, filtros de acceso, favoritos locales y diseño adaptable a móviles.

## Lista para publicar

- `index.html`: versión autocontenida que funciona desde la raíz del repositorio.
- `docs/`: versión estática preparada para GitHub Pages.
- `.github/workflows/deploy-pages.yml`: publicación automática con GitHub Actions.
- `app/catalog.ts`: catálogo completo y editable.
- `GUIA-GITHUB-PAGES.md`: instrucciones de publicación e inserción en Google Sites.

La web pública no necesita servidor, base de datos, inicio de sesión ni claves.
Los recursos externos se abren en una pestaña nueva para que también funcionen
cuando Simula está incorporado dentro de Google Sites.

## Uso rápido

Para usar la versión incluida, abre `index.html`. Para modificar y recompilar:

```bash
npm ci
npm run build:github-pages
npm run preview:github-pages
```

Requiere Node.js 22 o superior únicamente para desarrollo. Consulta
`GUIA-GITHUB-PAGES.md` para el procedimiento completo.
