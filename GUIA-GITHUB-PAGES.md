# Publicar Simula en GitHub Pages e incrustarlo en Google Sites

Simula incluye una compilación estática independiente preparada para funcionar
tanto en un dominio raíz como en la subcarpeta de un repositorio de GitHub Pages.
No requiere servidor, base de datos, variables de entorno ni claves de API.

La página principal es `index.html` en la raíz. Ese archivo se regenera con la
aplicación compilada cada vez que ejecutas `npm run build:github-pages`. La misma
compilación queda en `docs/`, que es la carpeta publicada por GitHub Actions.
Esta edición contiene 307 recursos en 17 categorías.

El `index.html` principal contiene internamente todo el CSS y JavaScript de la
interfaz. Por eso también puede abrirse directamente desde el explorador de
archivos del computador, sin instalar Node.js ni iniciar un servidor.

## Opción recomendada: publicación automática

1. Crea un repositorio en GitHub y sube todo el contenido de esta carpeta a la
   rama `main`.
2. En el repositorio abre **Settings > Pages**.
3. En **Build and deployment > Source**, selecciona **GitHub Actions**.
4. Abre la pestaña **Actions** y espera a que termine el flujo
   **Publicar Simula en GitHub Pages**.
5. GitHub mostrará una dirección similar a
   `https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/`.

El archivo `.github/workflows/deploy-pages.yml` instala las dependencias,
genera la web en `docs/` y la publica automáticamente después de cada cambio en
`main`. Las rutas de imágenes, CSS y JavaScript son relativas, por lo que no es
necesario escribir el nombre del repositorio en el código.

## Opción directa desde la rama

Como `index.html` está en la raíz, también puedes elegir **Deploy from a branch**
en **Settings > Pages** y seleccionar **main** y **/(root)**. Esta alternativa
publica los archivos ya compilados que vienen incluidos, sin ejecutar el flujo
de GitHub Actions. Después de modificar el catálogo, ejecuta
`npm run build:github-pages` antes de subir los cambios para actualizar tanto
`index.html` como `docs/`.

## Probar o generar la web en tu computador

### Abrir la versión descargada sin instalar nada

1. Descomprime el ZIP completo; no muevas `index.html` fuera de su carpeta.
2. Haz doble clic en `index.html` o ábrelo con Chrome, Edge o Firefox.
3. La enciclopedia, búsqueda, categorías y favoritos funcionarán localmente.

La plataforma se puede recorrer sin conexión, pero para abrir los simuladores
externos es necesario tener internet. Las imágenes locales se encuentran en
`public/images/` y deben conservarse junto al resto del proyecto.

### Desarrollo y recompilación

Requiere Node.js 22 o superior.

```bash
npm ci
npm run build:github-pages
npm run preview:github-pages
```

La versión compilada queda en `docs/`. Para probar exactamente esos archivos
también puedes ejecutar:

```bash
npx serve docs
```

## Incrustar en Google Sites

1. Abre tu proyecto en Google Sites.
2. En el panel derecho elige **Insertar > Incorporar**.
3. Selecciona **Por URL** y pega la dirección pública de GitHub Pages completa,
   incluida la barra final.
4. Pulsa **Insertar**, amplía el bloque al ancho disponible y dale suficiente
   altura para navegar cómodamente.
5. Publica el sitio de Google.

También puedes usar **Páginas > + > Incorporación de página completa** para que
Simula ocupe una página entera. La interfaz es responsive y los enlaces de cada
simulador se abren en una pestaña nueva, algo especialmente útil dentro del
marco de Google Sites.

## Estructura relevante

- `app/`: aplicación y catálogo completo.
- `index.html`: página principal lista para servir desde la raíz.
- `public/`: imágenes y favicon.
- `github-pages/`: punto de entrada estático.
- `vite.github-pages.config.ts`: configuración compatible con subcarpetas.
- `docs/`: resultado compilado que se publica.
- `.github/workflows/deploy-pages.yml`: despliegue automático.

## Actualizar el catálogo

Edita el catálogo `resources` en `app/catalog.ts`, guarda los cambios y súbelos
a la rama `main`. GitHub Actions regenerará y publicará el sitio automáticamente.

## Documentación oficial

- [Configurar una fuente de publicación de GitHub Pages](https://docs.github.com/es/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Usar flujos de trabajo personalizados con GitHub Pages](https://docs.github.com/es/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Incorporar contenido de sitios web en Google Sites](https://support.google.com/sites/answer/90569?hl=es)
