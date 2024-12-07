const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({
    usuario_id: Number,
    nombre: String,
    correo: String,
    contraseña: String,
    edad: Number,
    genero: String,
    ubicacion: String,
    preferencias: [String],
    reseñas: [String],
    historial_búsquedas: [String]
}, { collection: 'Usuarios' });

const Usuarios = mongoose.model('Usuarios', UsuariosSchema);

module.exports = Usuarios;
