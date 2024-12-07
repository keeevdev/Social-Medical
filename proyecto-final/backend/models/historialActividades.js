const mongoose = require('mongoose');

const HistorialActividadesSchema = new mongoose.Schema({
    actividad_id: { type: Number, required: true, unique: true },
    usuario_id: { type: Number, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    tipo_actividad: { type: String, required: true }
}, { collection: 'HistorialActividades' });

const HistorialActividades = mongoose.model('HistorialActividades', HistorialActividadesSchema);

module.exports = HistorialActividades;
