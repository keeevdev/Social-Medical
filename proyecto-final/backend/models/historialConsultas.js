const mongoose = require('mongoose');

const HistorialConsultasSchema = new mongoose.Schema({
    consulta_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' },
    profesional_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProfesionalesSalud' },
    fecha: { type: Date, default: Date.now },
    diagnostico: String,
    notas_profesional: String
}, { collection: 'HistorialConsultas' });

const HistorialConsultas = mongoose.model('HistorialConsultas', HistorialConsultasSchema);

module.exports = HistorialConsultas;
