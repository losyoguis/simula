# Actualización del catálogo de SIMULA

Esta versión contiene **598 recursos en 29 categorías** después de retirar los
destinos que devolvieron HTTP 403 durante la auditoría de acceso.

**La enciclopedia de la simulación**

**Una enciclopedia para aprender haciendo.**

## Áreas incorporadas

- IA y datos: 22 recursos.
- Ciberseguridad: 19 recursos.
- Agricultura: 20 recursos.
- Sostenibilidad: 20 recursos.
- Emprendimiento: 17 recursos.
- Psicología: 27 recursos.
- Derecho: 25 recursos.
- Comunicación: 24 recursos.
- Oficios: 17 recursos.
- Arquitectura: 29 recursos.
- Industria y manufactura: 44 recursos.
- Deportes y educación física: 53 recursos.

## Funciones actualizadas

- Búsqueda por título, descripción, categoría y etiquetas.
- Filtros para las 29 categorías y los tres tipos de acceso.
- Asistente con vocabulario específico de las doce áreas ampliadas.
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

El comando `npm run audit:links` permite volver a comprobar los destinos
externos, sus redirecciones y los códigos HTTP, separando sitios caídos de
portales que bloquean comprobadores automáticos.
