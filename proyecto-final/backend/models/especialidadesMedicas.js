const mongoose = require('mongoose');

const EspecialidadesMedicasSchema = new mongoose.Schema({
    especialidad_id: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true }
}, { collection: 'EspecialidadesMedicas' });

const EspecialidadesMedicas = mongoose.model('EspecialidadesMedicas', EspecialidadesMedicasSchema);

module.exports = EspecialidadesMedicas;
