const express = require('express');
const router = express.Router();
const pagosTransaccionesController = require('../controllers/pagosTransaccionesController');

router.post('/PagosTransacciones', pagosTransaccionesController.createPago);
router.get('/PagosTransacciones', pagosTransaccionesController.getAllPagos);
router.get('/PagosTransacciones/:id', pagosTransaccionesController.getPagoById);
router.put('/PagosTransacciones/:id', pagosTransaccionesController.updatePago);
router.delete('/PagosTransacciones/:id', pagosTransaccionesController.deletePago);

module.exports = router;
