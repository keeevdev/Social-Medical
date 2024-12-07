const mongoose = require('mongoose');

const ReseñasCalificacionesSchema = new mongoose.Schema({
    reseña_id: Number,
    usuario_id: Number,
    profesional_id: Number,
    comentario: String,
    calificacion: Number,
    fecha: Date
}, { collection: 'ResenasCalificaciones' });

const ReseñasCalificaciones = mongoose.model('ResenasCalificaciones', ReseñasCalificacionesSchema);

module.exports = ReseñasCalificaciones;
