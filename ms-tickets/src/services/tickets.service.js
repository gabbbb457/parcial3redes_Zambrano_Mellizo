// CAPA DE SERVICIO: reglas de negocio. No sabe de HTTP ni de SQL.
const repo = require('../repositories/tickets.repository');
const { validarTicket, construirTicket } = require('../models/ticket');
const equipos = require('../clients/equipos.client');
const HttpError = require('../utils/http-error');

async function componer(tickets, token) {
  const ids = [...new Set(tickets.map((t) => t.equipo_id))];
  let mapa = new Map();
  let fallo = false;

  try {
    mapa = await equipos.obtenerPorIds(ids, token);
  } catch (e) {
    fallo = true;
  }

  return tickets.map((t) => {
    if (fallo) {
      return {
        ...t,
        equipo: null,
        aviso: 'No se pudo consultar ms-equipos',
      };
    }
    const e = mapa.get(t.equipo_id);
    return {
      ...t,
      equipo: e ? { id: e.id, serial: e.serial, descripcion: e.descripcion } : null,
    };
  });
}

async function verificarEquipo(ticket, token) {
  const e = await equipos.obtenerPorId(ticket.equipo_id, token);
  if (!e) {
    throw new HttpError(400, `No existe el equipo ${ticket.equipo_id}`);
  }
  if (e.estado_equipo === 'de_baja') {
    throw new HttpError(409, 'No se puede abrir un ticket sobre un equipo dado de baja');
  }
}

async function listar(filtros, token) {
  return componer(await repo.findAll(filtros), token);
}

async function obtener(id, token) {
  const ticket = await repo.findById(id);
  if (!ticket) throw new HttpError(404, `No existe el ticket con id ${id}`);
  return (await componer([ticket], token))[0];
}

async function crear(datos, token) {
  const errores = validarTicket(datos);
  if (errores.length > 0) throw new HttpError(400, 'Datos inválidos', errores);

  const ticket = construirTicket(datos);
  await verificarEquipo(ticket, token);

  if (await repo.findByNumero(ticket.numero)) {
    throw new HttpError(409, `Ya existe un ticket con el numero ${ticket.numero}`);
  }

  const creado = await repo.create(ticket);
  return (await componer([creado], token))[0];
}

async function actualizar(id, datos, token) {
  const errores = validarTicket(datos);
  if (errores.length > 0) throw new HttpError(400, 'Datos inválidos', errores);

  const ticket = construirTicket(datos);
  await verificarEquipo(ticket, token);

  const otro = await repo.findByNumero(ticket.numero);
  if (otro && otro.id !== id) {
    throw new HttpError(409, `Ya existe un ticket con el numero ${ticket.numero}`);
  }

  const actualizado = await repo.update(id, ticket);
  if (!actualizado) throw new HttpError(404, `No existe el ticket con id ${id}`);
  return (await componer([actualizado], token))[0];
}

async function eliminar(id) {
  const eliminado = await repo.remove(id);
  if (!eliminado) throw new HttpError(404, `No existe el ticket con id ${id}`);
}

module.exports = { listar, obtener, crear, actualizar, eliminar };