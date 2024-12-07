const mongoose = require('mongoose');

const PagosTransaccionesSchema = new mongoose.Schema({
    transaccion_id: Number,
    usuario_id: Number,
    profesional_id: Number,
    servicio_id: Number,
    monto: Number,
    fecha: Date,
    metodo_pago: String,
    estado_pago: String
}, { collection: 'PagosTransacciones' });

const PagosTransacciones = mongoose.model('PagosTransacciones', PagosTransaccionesSchema);

module.exports = PagosTransacciones;
