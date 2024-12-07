const ProfesionalesSalud = require('../models/profesionalesSalud');

exports.createProfesional = async (req, res) => {
    try {
        const nuevoProfesional = new ProfesionalesSalud(req.body);
        const profesionalGuardado = await nuevoProfesional.save();
        res.status(201).json(profesionalGuardado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el profesional: " + error.message });
    }
};

exports.getAllProfesionales = async (req, res) => {
    try {
        const profesionales = await ProfesionalesSalud.find();
        res.json(profesionales);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los profesionales: " + error.message });
    }
};

exports.getProfesionalById = async (req, res) => {
    try {
        const profesional = await ProfesionalesSalud.findOne({ profesional_id: req.params.id });
        if (!profesional) {
            return res.status(404).json({ message: "Profesional no encontrado" });
        }
        res.json(profesional);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el profesional: " + error.message });
    }
};

exports.updateProfesional = async (req, res) => {
    try {
        const profesionalActualizado = await ProfesionalesSalud.findOneAndUpdate(
            { profesional_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!profesionalActualizado) {
            return res.status(404).json({ message: "Profesional no encontrado" });
        }
        res.json(profesionalActualizado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el profesional: " + error.message });
    }
};

exports.deleteProfesional = async (req, res) => {
    try {
        const profesionalEliminado = await ProfesionalesSalud.findOneAndDelete({ profesional_id: req.params.id });
        if (!profesionalEliminado) {
            return res.status(404).json({ message: "Profesional no encontrado" });
        }
        res.json({ message: "Profesional eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el profesional: " + error.message });
    }
};
