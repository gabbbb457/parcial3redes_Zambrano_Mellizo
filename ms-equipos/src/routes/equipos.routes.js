// CAPA DE PRESENTACIÓN: rutas de equipos (solo lectura, cualquier rol autenticado)
const { Router } = require('express');
const controller = require('../controllers/equipos.controller');
const { verificarToken } = require('../middlewares/auth');

const router = Router();

router.use(verificarToken);                // todas las rutas exigen token

router.get('/', controller.listar);       // GET /equipos  y  GET /equipos?ids=1,3
router.get('/:id', controller.obtener);   // GET /equipos/:id

module.exports = router;
