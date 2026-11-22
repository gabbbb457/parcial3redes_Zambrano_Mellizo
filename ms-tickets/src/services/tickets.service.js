// CAPA DE SERVICIO: reglas de negocio. No sabe de HTTP ni de SQL.
const repo = require('../repositories/tickets.repository');
const { validarTicket, construirTicket } = require('../models/ticket');
const HttpError = require('../utils/http-error');

async function listar(filtros) {
  return repo.findAll(filtros);
}

async function obtener(id) {
  const ticket = await repo.findById(id);
  if (!ticket) throw new HttpError(404, `No existe el ticket con id ${id}`);
  return ticket;
}

async function crear(datos) {
  const errores = validarTicket(datos);
  if (errores.length > 0) throw new HttpError(400, 'Datos inválidos', errores);
  const ticket = construirTicket(datos);

  // Regla: no puede haber dos tickets con el mismo numero
  if (await repo.findByNumero(ticket.numero)) {
    throw new HttpError(409, `Ya existe un ticket con el numero ${ticket.numero}`);
  }
  return repo.create(ticket);
}

async function actualizar(id, datos) {
  const errores = validarTicket(datos);
  if (errores.length > 0) throw new HttpError(400, 'Datos inválidos', errores);
  const ticket = construirTicket(datos);

  const otro = await repo.findByNumero(ticket.numero);
  if (otro && otro.id !== id) {
    throw new HttpError(409, `Ya existe un ticket con el numero ${ticket.numero}`);
  }

  const actualizado = await repo.update(id, ticket);
  if (!actualizado) throw new HttpError(404, `No existe el ticket con id ${id}`);
  return actualizado;
}

async function eliminar(id) {
  const eliminado = await repo.remove(id);
  if (!eliminado) throw new HttpError(404, `No existe el ticket con id ${id}`);
}

module.exports = { listar, obtener, crear, actualizar, eliminar };