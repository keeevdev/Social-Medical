const express = require('express');
const router = express.Router();
const mensajesComunicacionesController = require('../controllers/mensajesComunicacionesController');

router.post('/MensajesComunicaciones', mensajesComunicacionesController.createMensaje);
router.get('/MensajesComunicaciones', mensajesComunicacionesController.getAllMensajes);
router.get('/MensajesComunicaciones/:id', mensajesComunicacionesController.getMensajeById);
router.put('/MensajesComunicaciones/:id', mensajesComunicacionesController.updateMensaje);
router.delete('/MensajesComunicaciones/:id', mensajesComunicacionesController.deleteMensaje);

module.exports = router;
