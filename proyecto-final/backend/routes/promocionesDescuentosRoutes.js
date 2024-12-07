const express = require('express');
const router = express.Router();
const promocionesDescuentosController = require('../controllers/promocionesDescuentosController');

router.post('/PromocionesDescuentos', promocionesDescuentosController.createPromocion);
router.get('/PromocionesDescuentos', promocionesDescuentosController.getAllPromociones);
router.get('/PromocionesDescuentos/:id', promocionesDescuentosController.getPromocionById);
router.put('/PromocionesDescuentos/:id', promocionesDescuentosController.updatePromocion);
router.delete('/PromocionesDescuentos/:id', promocionesDescuentosController.deletePromocion);

module.exports = router;
