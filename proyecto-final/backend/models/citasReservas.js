const mongoose = require('mongoose');

const CitasReservasSchema = new mongoose.Schema({
    cita_id: { type: Number, required: true, unique: true },
    usuario_id: { type: Number, required: true },
    profesional_id: { type: Number, required: true },
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    estado_reserva: { type: String, required: true },
    costo: { type: Number, required: true },
    detalles: { type: String, required: true }
}, { collection: 'CitasReservas' });

const CitasReservas = mongoose.model('CitasReservas', CitasReservasSchema);

module.exports = CitasReservas;
