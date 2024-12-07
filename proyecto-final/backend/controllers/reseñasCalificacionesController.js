const ReseñasCalificaciones = require('../models/reseñasCalificaciones');

exports.createResena = async (req, res) => {
    try {
        const nuevaResena = new ReseñasCalificaciones(req.body);
        const resenaGuardada = await nuevaResena.save();
        res.status(201).json(resenaGuardada);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la reseña: " + error.message });
    }
};

exports.getAllResenas = async (req, res) => {
    try {
        const resenas = await ReseñasCalificaciones.find();
        res.json(resenas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las reseñas: " + error.message });
    }
};

exports.getResenaById = async (req, res) => {
    try {
        const resena = await ReseñasCalificaciones.findOne({ reseña_id: req.params.id });
        if (!resena) {
            return res.status(404).json({ message: "Reseña no encontrada" });
        }
        res.json(resena);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la reseña: " + error.message });
    }
};

exports.updateResena = async (req, res) => {
    try {
        const resenaActualizada = await ReseñasCalificaciones.findOneAndUpdate(
            { reseña_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!resenaActualizada) {
            return res.status(404).json({ message: "Reseña no encontrada" });
        }
        res.json(resenaActualizada);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la reseña: " + error.message });
    }
};

exports.deleteResena = async (req, res) => {
    try {
        const resenaEliminada = await ReseñasCalificaciones.findOneAndDelete({ reseña_id: req.params.id });
        if (!resenaEliminada) {
            return res.status(404).json({ message: "Reseña no encontrada" });
        }
        res.json({ message: "Reseña eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la reseña: " + error.message });
    }
};
