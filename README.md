# Parcial 3 · Redes y Servicios Multimedia (Módulo 3)

Estudiantes: Gabriela Mellizo Barrera y María Paula Zambrano Fernandez · UAO

Entidad asignada: **ms-tickets** (puerto 3011). Incluye también **ms-usuarios** (puerto 3001, versión completa) para el login y los tokens.

## Estructura
| Carpeta | Qué es | Guía |
|---|---|---|
| `ms-usuarios/` | Login y tokens JWT (versión completa, sin modificar) | `ms-usuarios/README.md` |
| `ms-tickets/` | Microservicio de tickets: CRUD, 409 por `numero`, filtro `?prioridad=` | `ms-tickets/README.md` |
| `ms-tickets/docs/` | Colección de Postman | |

## Orden para ejecutarlos
1. Levantar `ms-usuarios` (3001) siguiendo su README.
2. Levantar `ms-tickets` (3011) siguiendo su README, con el **mismo** `JWT_SECRET` en los dos `.env`.
3. Importar `ms-tickets/docs/ms-tickets.postman_collection.json` en Postman y ejecutar la colección completa.

Los archivos `.env` no se suben al repositorio; cada carpeta trae su `.env.example`.