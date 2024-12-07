const AlertasNotificaciones = require('../models/alertasNotificaciones');

exports.createAlerta = async (req, res) => {
    try {
        const nuevaAlerta = new AlertasNotificaciones(req.body);
        const alertaGuardada = await nuevaAlerta.save();
        res.status(201).json(alertaGuardada);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la alerta: " + error.message });
    }
};

exports.getAllAlertas = async (req, res) => {
    try {
        const alertas = await AlertasNotificaciones.find();
        res.json(alertas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las alertas: " + error.message });
    }
};

exports.getAlertaById = async (req, res) => {
    try {
        const alerta = await AlertasNotificaciones.findOne({ alerta_id: req.params.id });
        if (!alerta) {
            return res.status(404).json({ message: "Alerta no encontrada" });
        }
        res.json(alerta);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la alerta: " + error.message });
    }
};

exports.updateAlerta = async (req, res) => {
    try {
        const alertaActualizada = await AlertasNotificaciones.findOneAndUpdate(
            { alerta_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!alertaActualizada) {
            return res.status(404).json({ message: "Alerta no encontrada" });
        }
        res.json(alertaActualizada);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la alerta: " + error.message });
    }
};

exports.deleteAlerta = async (req, res) => {
    try {
        const alertaEliminada = await AlertasNotificaciones.findOneAndDelete({ alerta_id: req.params.id });
        if (!alertaEliminada) {
            return res.status(404).json({ message: "Alerta no encontrada" });
        }
        res.json({ message: "Alerta eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la alerta: " + error.message });
    }
};
