const EspecialidadesMedicas = require('../models/especialidadesMedicas');

exports.createEspecialidad = async (req, res) => {
    try {
        const nuevaEspecialidad = new EspecialidadesMedicas(req.body);
        const especialidadGuardada = await nuevaEspecialidad.save();
        res.status(201).json(especialidadGuardada);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la especialidad: " + error.message });
    }
};

exports.getAllEspecialidades = async (req, res) => {
    try {
        const especialidades = await EspecialidadesMedicas.find();
        res.json(especialidades);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las especialidades: " + error.message });
    }
};

exports.getEspecialidadById = async (req, res) => {
    try {
        const especialidad = await EspecialidadesMedicas.findOne({ especialidad_id: req.params.id });
        if (!especialidad) {
            return res.status(404).json({ message: "Especialidad no encontrada" });
        }
        res.json(especialidad);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la especialidad: " + error.message });
    }
};

exports.updateEspecialidad = async (req, res) => {
    try {
        const especialidadActualizada = await EspecialidadesMedicas.findOneAndUpdate(
            { especialidad_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!especialidadActualizada) {
            return res.status(404).json({ message: "Especialidad no encontrada" });
        }
        res.json(especialidadActualizada);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la especialidad: " + error.message });
    }
};

exports.deleteEspecialidad = async (req, res) => {
    try {
        const especialidadEliminada = await EspecialidadesMedicas.findOneAndDelete({ especialidad_id: req.params.id });
        if (!especialidadEliminada) {
            return res.status(404).json({ message: "Especialidad no encontrada" });
        }
        res.json({ message: "Especialidad eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la especialidad: " + error.message });
    }
};
