const HistorialActividades = require('../models/historialActividades');

exports.createActividad = async (req, res) => {
    try {
        const nuevaActividad = new HistorialActividades(req.body);
        const actividadGuardada = await nuevaActividad.save();
        res.status(201).json(actividadGuardada);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la actividad: " + error.message });
    }
};

exports.getAllActividades = async (req, res) => {
    try {
        const actividades = await HistorialActividades.find();
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las actividades: " + error.message });
    }
};

exports.getActividadById = async (req, res) => {
    try {
        const actividad = await HistorialActividades.findOne({ actividad_id: req.params.id });
        if (!actividad) {
            return res.status(404).json({ message: "Actividad no encontrada" });
        }
        res.json(actividad);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la actividad: " + error.message });
    }
};

exports.updateActividad = async (req, res) => {
    try {
        const actividadActualizada = await HistorialActividades.findOneAndUpdate(
            { actividad_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!actividadActualizada) {
            return res.status(404).json({ message: "Actividad no encontrada" });
        }
        res.json(actividadActualizada);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la actividad: " + error.message });
    }
};

exports.deleteActividad = async (req, res) => {
    try {
        const actividadEliminada = await HistorialActividades.findOneAndDelete({ actividad_id: req.params.id });
        if (!actividadEliminada) {
            return res.status(404).json({ message: "Actividad no encontrada" });
        }
        res.json({ message: "Actividad eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la actividad: " + error.message });
    }
};
