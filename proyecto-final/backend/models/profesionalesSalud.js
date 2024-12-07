const mongoose = require('mongoose');

const ProfesionalesSaludSchema = new mongoose.Schema({
    profesional_id: Number,
    nombre: String,
    especialidad: String,
    ubicacion: String,
    experiencia: Number,
    horario_atencion: [String],
    tarifa: Number,
    calificaciones: [String],
    contacto: String,
    disponibilidad: Boolean
}, { collection: 'ProfesionalesSalud' });

const ProfesionalesSalud = mongoose.model('ProfesionalesSalud', ProfesionalesSaludSchema);

module.exports = ProfesionalesSalud;
