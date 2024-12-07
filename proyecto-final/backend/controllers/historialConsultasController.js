const HistorialConsultas = require('../models/historialConsultas');

exports.createHistorialConsulta = async (req, res) => {
    try {
        const nuevaConsulta = new HistorialConsultas(req.body);
        const consultaGuardada = await nuevaConsulta.save();
        res.status(201).json(consultaGuardada);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el historial de consulta: " + error.message });
    }
};

exports.getAllHistorialConsultas = async (req, res) => {
    try {
        const consultas = await HistorialConsultas.find();
        res.json(consultas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los historiales: " + error.message });
    }
};

exports.getHistorialConsultaById = async (req, res) => {
    try {
        const consulta = await HistorialConsultas.findOne({ consulta_id: req.params.id });
        if (!consulta) {
            return res.status(404).json({ message: "Consulta no encontrada" });
        }
        res.json(consulta);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el historial: " + error.message });
    }
};

exports.updateHistorialConsulta = async (req, res) => {
    try {
        const consultaActualizada = await HistorialConsultas.findOneAndUpdate(
            { consulta_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!consultaActualizada) {
            return res.status(404).json({ message: "Consulta no encontrada" });
        }
        res.json(consultaActualizada);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el historial: " + error.message });
    }
};

exports.deleteHistorialConsulta = async (req, res) => {
    try {
        const consultaEliminada = await HistorialConsultas.findOneAndDelete({ consulta_id: req.params.id });
        if (!consultaEliminada) {
            return res.status(404).json({ message: "Consulta no encontrada" });
        }
        res.json({ message: "Consulta eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el historial de consulta: " + error.message });
    }
};
