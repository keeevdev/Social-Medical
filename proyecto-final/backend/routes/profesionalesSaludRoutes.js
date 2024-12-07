const express = require('express');
const router = express.Router();
const profesionalesSaludController = require('../controllers/profesionalesSaludController');

router.post('/ProfesionalesSalud', profesionalesSaludController.createProfesional);
router.get('/ProfesionalesSalud', profesionalesSaludController.getAllProfesionales);
router.get('/ProfesionalesSalud/:id', profesionalesSaludController.getProfesionalById);
router.put('/ProfesionalesSalud/:id', profesionalesSaludController.updateProfesional);
router.delete('/ProfesionalesSalud/:id', profesionalesSaludController.deleteProfesional);

module.exports = router;
