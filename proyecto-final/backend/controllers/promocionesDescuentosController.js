const PromocionesDescuentos = require('../models/promocionesDescuentos');

exports.createPromocion = async (req, res) => {
    try {
        const nuevaPromocion = new PromocionesDescuentos(req.body);
        const promocionGuardada = await nuevaPromocion.save();
        res.status(201).json(promocionGuardada);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la promoción: " + error.message });
    }
};

exports.getAllPromociones = async (req, res) => {
    try {
        const promociones = await PromocionesDescuentos.find();
        res.json(promociones);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las promociones: " + error.message });
    }
};

exports.getPromocionById = async (req, res) => {
    try {
        const promocion = await PromocionesDescuentos.findOne({ promocion_id: req.params.id });
        if (!promocion) {
            return res.status(404).json({ message: "Promoción no encontrada" });
        }
        res.json(promocion);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la promoción: " + error.message });
    }
};

exports.updatePromocion = async (req, res) => {
    try {
        const promocionActualizada = await PromocionesDescuentos.findOneAndUpdate(
            { promocion_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!promocionActualizada) {
            return res.status(404).json({ message: "Promoción no encontrada" });
        }
        res.json(promocionActualizada);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la promoción: " + error.message });
    }
};

exports.deletePromocion = async (req, res) => {
    try {
        const promocionEliminada = await PromocionesDescuentos.findOneAndDelete({ promocion_id: req.params.id });
        if (!promocionEliminada) {
            return res.status(404).json({ message: "Promoción no encontrada" });
        }
        res.json({ message: "Promoción eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la promoción: " + error.message });
    }
};
