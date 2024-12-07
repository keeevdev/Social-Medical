const mongoose = require('mongoose');

const MensajesComunicacionesSchema = new mongoose.Schema({
    mensaje_id: Number,
    usuario_id: Number,
    profesional_id: Number,
    contenido: String,
    fecha_envio: Date,
    leido: String
}, { collection: 'MensajesComunicaciones' });

const MensajesComunicaciones = mongoose.model('MensajesComunicaciones', MensajesComunicacionesSchema);

module.exports = MensajesComunicaciones;
