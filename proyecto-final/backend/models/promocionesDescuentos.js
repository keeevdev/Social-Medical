const mongoose = require('mongoose');

const PromocionesDescuentosSchema = new mongoose.Schema({
    promocion_id: Number,
    nombre_promocion: String,
    descripcion: String,
    descuento: Number,
    fecha_inicio: Date,
    fecha_fin: Date,
    profesional_id: Number
}, { collection: 'PromocionesDescuentos' });

const PromocionesDescuentos = mongoose.model('PromocionesDescuentos', PromocionesDescuentosSchema);

module.exports = PromocionesDescuentos;
