const mongoose = require('mongoose');

const AlertasNotificacionesSchema = new mongoose.Schema({
    alerta_id: { type: Number, required: true, unique: true },
    usuario_id: { type: Number, required: true },
    mensaje: { type: String, required: true },
    tipo: { type: String, required: true },
    fecha_envio: { type: Date, required: true },
    estado: { type: String, required: true }
}, { collection: 'AlertasNotificaciones' });

const AlertasNotificaciones = mongoose.model('AlertasNotificaciones', AlertasNotificacionesSchema);

module.exports = AlertasNotificaciones;
