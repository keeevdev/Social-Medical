const CitasReservas = require('../models/citasReservas');

exports.createCita = async (req, res) => {
    try {
        const nuevaCita = new CitasReservas(req.body);
        const citaGuardada = await nuevaCita.save();
        res.status(201).json(citaGuardada);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la cita: " + error.message });
    }
};


exports.getAllCitas = async (req, res) => {
    try {
        const citas = await CitasReservas.find();
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las citas: " + error.message });
    }
};

exports.getCitaById = async (req, res) => {
    try {
        const cita = await CitasReservas.findOne({ cita_id: req.params.id });
        if (!cita) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }
        res.json(cita);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la cita: " + error.message });
    }
};

exports.updateCita = async (req, res) => {
    try {
        const citaActualizada = await CitasReservas.findOneAndUpdate(
            { cita_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!citaActualizada) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }
        res.json(citaActualizada);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la cita: " + error.message });
    }
};

exports.deleteCita = async (req, res) => {
    try {
        const citaEliminada = await CitasReservas.findOneAndDelete({ cita_id: req.params.id });
        if (!citaEliminada) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }
        res.json({ message: "Cita eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la cita: " + error.message });
    }
};
