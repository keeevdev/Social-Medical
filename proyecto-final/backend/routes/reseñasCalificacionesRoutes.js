const express = require('express');
const router = express.Router();
const reseñasCalificacionesController = require('../controllers/reseñasCalificacionesController');

router.post('/ResenasCalificaciones', reseñasCalificacionesController.createResena);
router.get('/ResenasCalificaciones', reseñasCalificacionesController.getAllResenas);
router.get('/ResenasCalificaciones/:id', reseñasCalificacionesController.getResenaById);
router.put('/ResenasCalificaciones/:id', reseñasCalificacionesController.updateResena);
router.delete('/ResenasCalificaciones/:id', reseñasCalificacionesController.deleteResena);

module.exports = router;
