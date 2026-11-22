// CAPA DE PRESENTACIÓN (controlador): traduce HTTP <-> servicio.
const service = require('../services/tickets.service');
const HttpError = require('../utils/http-error');

function leerId(req) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) throw new HttpError(400, 'El id debe ser un entero positivo');
  return id;
}

// GET /tickets  y  GET /tickets?prioridad=alta
async function listar(req, res) {
  res.status(200).json(await service.listar({ prioridad: req.query.prioridad }));
}

// GET /tickets/:id
async function obtener(req, res) {
  res.status(200).json(await service.obtener(leerId(req)));
}

// POST /tickets
async function crear(req, res) {
  const nuevo = await service.crear(req.body);
  res.status(201).location(`${req.baseUrl}/${nuevo.id}`).json(nuevo);
}

// PUT /tickets/:id
async function actualizar(req, res) {
  res.status(200).json(await service.actualizar(leerId(req), req.body));
}

// DELETE /tickets/:id
async function eliminar(req, res) {
  await service.eliminar(leerId(req));
  res.status(204).end();
}

module.exports = { listar, obtener, crear, actualizar, eliminar };