const express = require('express');
const router = express.Router();
const historialConsultasController = require('../controllers/historialConsultasController');

router.post('/HistorialConsultas', historialConsultasController.createHistorialConsulta);
router.get('/HistorialConsultas', historialConsultasController.getAllHistorialConsultas);
router.get('/HistorialConsultas/:id', historialConsultasController.getHistorialConsultaById);
router.put('/HistorialConsultas/:id', historialConsultasController.updateHistorialConsulta);
router.delete('/HistorialConsultas/:id', historialConsultasController.deleteHistorialConsulta);

module.exports = router;
