const express = require('express');
const router = express.Router();
const alertasNotificacionesController = require('../controllers/alertasNotificacionesController');

router.post('/AlertasNotificaciones', alertasNotificacionesController.createAlerta);
router.get('/AlertasNotificaciones', alertasNotificacionesController.getAllAlertas);
router.get('/AlertasNotificaciones/:id', alertasNotificacionesController.getAlertaById);
router.put('/AlertasNotificaciones/:id', alertasNotificacionesController.updateAlerta);
router.delete('/AlertasNotificaciones/:id', alertasNotificacionesController.deleteAlerta);

module.exports = router;
