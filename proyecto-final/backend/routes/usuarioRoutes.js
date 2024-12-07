const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/Usuarios', usuarioController.getAllUsuarios);
router.get('/Usuarios/:id', usuarioController.getUsuarioById);
router.post('/Usuarios', usuarioController.createUsuario);
router.put('/Usuarios/:id', usuarioController.updateUsuario);
router.delete('/Usuarios/:id', usuarioController.deleteUsuario);

module.exports = router;
