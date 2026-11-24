# Parcial 3 · Redes y Servicios Multimedia (Módulo 3)

Estudiantes: Gabriela Mellizo Barrera y María Paula Zambrano Fernandez · UAO

Entidad asignada: **ms-tickets** (puerto 3011). Incluye también **ms-usuarios** (puerto 3001, versión completa) para el login y los tokens.

## Arquitectura del Sistema

| Microservicio | Puerto por defecto | Base de Datos | Responsabilidad principal |
| :--- | :--- | :--- | :--- |
| **`ms-usuarios`** | `3010` | `usuarios_db` | Registro, autenticación de usuarios y generación de tokens JWT. |
| **`ms-equipos`** | `3012` | `equipos_db` | Gestión del inventario de equipos y consulta individual o por lotes (`?ids=`). |
| **`ms-tickets`** | `3011` | `tickets_db` | Creación y gestión de tickets de soporte, validando el equipo en `ms-equipos` y componiendo la respuesta con los datos del equipo asociado. |

### Flujo de Comunicación
1. El cliente se autentica en **`ms-usuarios`** y obtiene un **Bearer Token (JWT)**.
2. Las peticiones a **`ms-tickets`** y **`ms-equipos`** incluyen el token en el encabezado `Authorization: Bearer <TOKEN>`.
3. Al crear un ticket (`POST /tickets`), **`ms-tickets`** consulta a **`ms-equipos`** (`GET /equipos/:id`) para verificar que el equipo exista y esté disponible antes de persistirlo en `tickets_db`.
4. Al listar tickets (`GET /tickets`), **`ms-tickets`** consulta en lote los equipos relacionados (`GET /equipos?ids=...`) para enriquecer la respuesta.

---

## Requisitos Previos

* **Node.js** (v18 o superior recomendado)
* **MySQL Server** (v8.0)
* **Postman** (o cliente HTTP similar para probar los endpoints)

---

## Configuración e Instalación

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd parcial3redes_Zambrano_Mellizo