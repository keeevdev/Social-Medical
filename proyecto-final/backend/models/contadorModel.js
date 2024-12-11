const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contadorSchema = new Schema({
    collectionName: String,
    currentValue: { type: Number, default: 1 }
});

const Contador = mongoose.model('Contador', contadorSchema);

async function getNextServicioId() {
    const contador = await Contador.findOneAndUpdate(
        { collectionName: 'ServiciosSalud' },
        { $inc: { currentValue: 1 } },
        { new: true, upsert: true }
    );
    return contador.currentValue;
}

module.exports = { getNextServicioId };
