// Rutas: qué URI llama a qué función y quién puede usarla.
const { Router } = require('express');
const controller = require('../controllers/tickets.controller');
const { verificarToken, requiereRol } = require('../middlewares/auth');

const router = Router();

// TODAS las rutas exigen token
router.use(verificarToken);

// GET: cualquier rol
router.get('/', controller.listar);
router.get('/:id', controller.obtener);

// POST, PUT y DELETE: solo administrador
router.post('/', requiereRol('administrador'), controller.crear);
router.put('/:id', requiereRol('administrador'), controller.actualizar);
router.delete('/:id', requiereRol('administrador'), controller.eliminar);

module.exports = router;