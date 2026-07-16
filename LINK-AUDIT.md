# Auditoría HTTP 403 de SIMULA

Fecha de revisión: **16 de julio de 2026**.

Se revisaron los **612 enlaces** de la edición anterior mediante solicitudes
HTTP con redirecciones y agente de usuario de navegador. Después de la revisión
se retiraron **14 recursos**, por lo que el catálogo final contiene **598
recursos únicos en 29 categorías**.

## Recursos retirados

### HTTP 403 confirmado

- Test-English.
- Spanish-Games.net.
- British Council LearnEnglish Teens.
- Virtual Courtroom Open University.

### Grupo iCivics retirado

La red del usuario mostró un error 403 de CloudFront en Court Quest. Se retiró
el directorio general de iCivics y los nueve juegos que utilizaban su misma
infraestructura de entrega para evitar que el problema se repita:

- iCivics.
- Argument Wars.
- Do I Have a Right?
- Court Quest.
- LawCraft.
- Branches of Power.
- Race to Ratify.
- Constitutional Compromise.
- Immigration Nation.
- NewsFeed Defenders.

## Validaciones del catálogo final

- 598 direcciones HTTPS.
- 598 identificadores únicos.
- Ningún título duplicado.
- Ninguna dirección duplicada.
- 29 categorías con metadatos válidos.

Los sitios externos pueden modificar sus permisos o disponibilidad en el
futuro. Para ejecutar una revisión nueva se puede usar `npm run audit:links`.
