// CAPA DE ACCESO A DATOS: la única que habla con MySQL.
const pool = require('../db');

async function findAll(filtros = {}) {
  let sql = 'SELECT * FROM tickets';
  const valores = [];
  if (filtros.prioridad) {
    sql += ' WHERE prioridad = ?';
    valores.push(filtros.prioridad);
  }
  const [filas] = await pool.query(sql + ' ORDER BY id', valores);
  return filas;
}

async function findById(id) {
  const [filas] = await pool.query('SELECT * FROM tickets WHERE id = ?', [id]);
  return filas.length > 0 ? filas[0] : null;
}

async function findByNumero(numero) {
  const [filas] = await pool.query('SELECT * FROM tickets WHERE numero = ?', [numero]);
  return filas.length > 0 ? filas[0] : null;
}

async function create(t) {
  const [resultado] = await pool.query(
    'INSERT INTO tickets (numero, asunto, prioridad, estado, fecha) VALUES (?, ?, ?, ?, ?)',
    [t.numero, t.asunto, t.prioridad, t.estado, t.fecha]);
  return findById(resultado.insertId);
}

async function update(id, t) {
  const [resultado] = await pool.query(
    'UPDATE tickets SET numero = ?, asunto = ?, prioridad = ?, estado = ?, fecha = ? WHERE id = ?',
    [t.numero, t.asunto, t.prioridad, t.estado, t.fecha, id]);
  if (resultado.affectedRows === 0) return null;
  return findById(id);
}

async function remove(id) {
  const [resultado] = await pool.query('DELETE FROM tickets WHERE id = ?', [id]);
  return resultado.affectedRows > 0;
}

module.exports = { findAll, findById, findByNumero, create, update, remove };