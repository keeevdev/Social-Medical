const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getNextServicioId } = require('../models/contadorModel');

const ServiciosSaludSchema = new mongoose.Schema({
    servicio_id: { type: Number, required: true, unique: true },
    nombre_servicio: String,
    tipo: String,
    descripcion: String,
    precio: Number,
    duracion: Number,
    categorias: [String],
    profesional_id: Number
}, { collection: 'ServiciosSalud' });

servicioSchema.pre('save', async function(next) {
    if (!this.servicio_id) {
        this.servicio_id = await getNextServicioId();
    }
    next();
});

const ServiciosSalud = mongoose.model('ServiciosSalud', ServiciosSaludSchema);

module.exports = ServiciosSalud;
