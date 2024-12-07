const express = require('express');
const router = express.Router();
const especialidadesMedicasController = require('../controllers/especialidadesMedicasController');

router.post('/EspecialidadesMedicas', especialidadesMedicasController.createEspecialidad);
router.get('/EspecialidadesMedicas', especialidadesMedicasController.getAllEspecialidades);
router.get('/EspecialidadesMedicas/:id', especialidadesMedicasController.getEspecialidadById);
router.put('/EspecialidadesMedicas/:id', especialidadesMedicasController.updateEspecialidad);
router.delete('/EspecialidadesMedicas/:id', especialidadesMedicasController.deleteEspecialidad);

module.exports = router;
