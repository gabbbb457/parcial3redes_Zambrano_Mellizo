// =====================================================================
// CLIENTE HTTP de ms-equipos, para el microservicio de tickets.
// Copie este archivo en ms-tickets/src/clients/ y COMPLÉTELO:
// la función pedir() ya está hecha; faltan las funciones que usan
// la validación, la regla de negocio y la composición.
// En el .env de ms-tickets:  EQUIPOS_URL=http://127.0.0.1:3012
// =====================================================================
const HttpError = require('../utils/http-error');
const BASE = process.env.EQUIPOS_URL;

async function pedir(ruta, token) {
  try {
    return await fetch(`${BASE}${ruta}`, {
      headers: { Authorization: token },
      signal: AbortSignal.timeout(3000),
    });
  } catch (e) {
    throw new HttpError(503, 'ms-equipos no responde');
  }
}

async function obtenerPorId(id, token) {
  const r = await pedir(`/equipos/${id}`, token);
  if (r.status === 404) return null;
  if (!r.ok) throw new HttpError(503, 'ms-equipos respondió con un error');
  return r.json();
}

async function obtenerPorIds(ids, token) {
  if (ids.length === 0) return new Map();
  const r = await pedir(`/equipos?ids=${ids.join(',')}`, token);
  if (!r.ok) throw new HttpError(503, 'ms-equipos respondió con un error');
  const lista = await r.json();
  return new Map(lista.map((e) => [e.id, e]));
}

module.exports = { obtenerPorId, obtenerPorIds };