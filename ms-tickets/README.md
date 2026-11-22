# ms-tickets (Módulo 3)

Redes y Servicios Multimedia · UAO. Microservicio que gestiona **tickets** de soporte.
No emite tokens: los tokens los entrega `ms-usuarios` (puerto 3001) y este microservicio
solo los verifica con el mismo `JWT_SECRET`.

## Cómo ejecutarlo

Requisitos: Node.js 22.9 o superior y MySQL 8.

1. Crear la base de datos y su usuario (como root):

```sql
CREATE DATABASE tickets_db;
CREATE USER 'tickets_user'@'localhost' IDENTIFIED BY 'una-clave-segura';
GRANT ALL PRIVILEGES ON tickets_db.* TO 'tickets_user'@'localhost';
```

2. Crear la tabla y los 3 registros iniciales con `db/schema.sql` (en la consola: `SOURCE db/schema.sql;`).
3. `npm install`
4. Copiar `.env.example` como `.env` y poner el mismo `JWT_SECRET` de `ms-usuarios`.
5. `npm run dev`

Escucha en `http://127.0.0.1:3011`.

## El ticket

| Campo | Tipo | Regla |
|---|---|---|
| id | entero | lo asigna la base de datos |
| numero | texto | obligatorio y **único** (si se repite, 409) |
| asunto | texto | obligatorio |
| prioridad | texto | `baja`, `media` o `alta` |
| estado | texto | `abierto` o `cerrado` |
| fecha | texto | fecha real con formato `AAAA-MM-DD` |

Ejemplo de cuerpo para POST y PUT:

```json
{
  "numero": "T-004",
  "asunto": "No puedo imprimir",
  "prioridad": "media",
  "estado": "abierto",
  "fecha": "2026-11-10"
}
```

## Endpoints

Todas las rutas exigen el token en la cabecera `Authorization: Bearer <token>`.

| Método | URI | Quién | Respuesta exitosa | Errores |
|---|---|---|---|---|
| GET | /tickets | Cualquier rol | 200 arreglo (filtro `?prioridad=`) | 401 |
| GET | /tickets/:id | Cualquier rol | 200 ticket | 400 · 401 · 404 |
| POST | /tickets | administrador | 201 ticket + Location | 400 · 401 · 403 · 409 |
| PUT | /tickets/:id | administrador | 200 ticket | 400 · 401 · 403 · 404 · 409 |
| DELETE | /tickets/:id | administrador | 204 | 400 · 401 · 403 · 404 |

Filtro de ejemplo: `GET /tickets?prioridad=alta`.

## Códigos de error

| Código | Cuándo |
|---|---|
| 400 | Datos inválidos (cuerpo con `error` y `detalles`) o id que no es un entero positivo |
| 401 | Falta el token, es inválido o está vencido |
| 403 | El rol del token no es administrador en POST, PUT o DELETE |
| 404 | No existe el ticket con ese id, o la ruta no existe |
| 409 | Ya existe un ticket con ese `numero` |

## Seguridad

`src/middlewares/auth.js` es el mismo de `ms-usuarios`:

- `verificarToken`: exige un token válido (401 si falta, es inválido o venció).
- `requiereRol('administrador')`: deja pasar solo a ese rol (403 a los demás).

El token se obtiene con `POST http://localhost:3001/usuarios/login` y se verifica con
`JWT_SECRET`, que debe ser **igual** al de `ms-usuarios`.

## Registro de peticiones

Cada petición se imprime en la terminal con método, ruta y código de respuesta:

```
GET /tickets -> 200
POST /tickets -> 409
```

## Pruebas con Postman

La colección está en `docs/` e incluye el login (contra `ms-usuarios`) y un caso por cada código:
200, 201, 204, 400, 401, 403, 404 y 409.