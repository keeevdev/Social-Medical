const mongoose = require('mongoose');

const ServiciosSaludSchema = new mongoose.Schema({
    servicio_id: Number,
    nombre_servicio: String,
    tipo: String,
    descripcion: String,
    precio: Number,
    duracion: Number,
    categorias: [String],
    profesional_id: Number
}, { collection: 'ServiciosSalud' });

const ServiciosSalud = mongoose.model('ServiciosSalud', ServiciosSaludSchema);

module.exports = ServiciosSalud;
