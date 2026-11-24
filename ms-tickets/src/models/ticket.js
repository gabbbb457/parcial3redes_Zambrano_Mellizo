// CAPA DE MODELO: qué campos tiene un Ticket y qué reglas cumple.
const PRIORIDADES = ['baja', 'media', 'alta'];
const ESTADOS = ['abierto', 'cerrado'];

// Acepta solo fechas reales con formato AAAA-MM-DD (rechaza 2026-02-31)
function fechaValida(texto) {
  if (typeof texto !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(texto)) return false;
  const f = new Date(`${texto}T00:00:00Z`);
  return !isNaN(f) && f.toISOString().slice(0, 10) === texto;
}

// Devuelve una lista de errores (vacía si todo está bien)
function validarTicket(datos) {
  const errores = [];
  if (!datos || typeof datos !== 'object') {
    return ['Se esperaba un objeto JSON con los datos del ticket'];
  }
  if (typeof datos.numero !== 'string' || datos.numero.trim() === '') {
    errores.push('numero es obligatorio');
  }
  if (typeof datos.asunto !== 'string' || datos.asunto.trim() === '') {
    errores.push('asunto es obligatorio');
  }
  if (!PRIORIDADES.includes(datos.prioridad)) {
    errores.push(`prioridad debe ser una de: ${PRIORIDADES.join(', ')}`);
  }
  if (!ESTADOS.includes(datos.estado)) {
    errores.push(`estado debe ser uno de: ${ESTADOS.join(', ')}`);
  }
  if (!fechaValida(datos.fecha)) {
    errores.push('fecha es obligatoria y debe tener formato AAAA-MM-DD');
  }
  if (!Number.isInteger(datos.equipo_id) || datos.equipo_id <= 0) {
  errores.push('equipo_id es obligatorio y debe ser un entero positivo');
}
  return errores;
}

// Construye un ticket "limpio" solo con los campos permitidos
function construirTicket(datos) {
  return {
    numero: datos.numero.trim(),
    asunto: datos.asunto.trim(),
    prioridad: datos.prioridad,
    estado: datos.estado,
    fecha: datos.fecha,
    equipo_id: datos.equipo_id,
    
  };
}

module.exports = { validarTicket, construirTicket };