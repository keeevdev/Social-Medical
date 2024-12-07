const express = require('express');
const router = express.Router();
const historialActividadesController = require('../controllers/historialActividadesController');

router.post('/HistorialActividades', historialActividadesController.createActividad);
router.get('/HistorialActividades', historialActividadesController.getAllActividades);
router.get('/HistorialActividades/:id', historialActividadesController.getActividadById);
router.put('/HistorialActividades/:id', historialActividadesController.updateActividad);
router.delete('/HistorialActividades/:id', historialActividadesController.deleteActividad);

module.exports = router;
