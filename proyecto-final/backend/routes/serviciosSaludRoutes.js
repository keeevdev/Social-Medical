const express = require('express');
const router = express.Router();
const {
    crearServicio,
    obtenerServicios,
    obtenerServicioPorId,
    actualizarServicio,
    eliminarServicio
} = require('../controllers/ServiciosSaludController');

router.post('/ServiciosSalud', crearServicio);

router.get('/ServiciosSalud', obtenerServicios);

router.get('/ServiciosSalud/:id', obtenerServicioPorId);

router.put('/ServiciosSalud/:id', actualizarServicio);

router.delete('/ServiciosSalud/:id', eliminarServicio);

module.exports = router;
