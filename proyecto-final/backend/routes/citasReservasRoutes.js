const express = require('express');
const router = express.Router();
const citasReservasController = require('../controllers/citasReservasController');

router.post('/CitasReservas', citasReservasController.createCita);
router.get('/CitasReservas', citasReservasController.getAllCitas);
router.get('/CitasReservas/:id', citasReservasController.getCitaById);
router.put('/CitasReservas/:id', citasReservasController.updateCita);
router.delete('/CitasReservas/:id', citasReservasController.deleteCita);

module.exports = router;
