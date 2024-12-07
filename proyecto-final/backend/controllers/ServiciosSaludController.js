const ServiciosSalud = require('../models/ServiciosSalud');

const crearServicio = async (req, res) => {
    try {
        const nuevoServicio = new ServiciosSalud(req.body);
        const servicioGuardado = await nuevoServicio.save();
        res.status(201).json(servicioGuardado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el servicio: " + error.message });
    }
};

const obtenerServicios = async (req, res) => {
    try {
        const servicios = await ServiciosSalud.find();
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los servicios: " + error.message });
    }
};

const obtenerServicioPorId = async (req, res) => {
    try {
        const servicio = await ServiciosSalud.findOne({ servicio_id: req.params.id });
        if (!servicio) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }
        res.json(servicio);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el servicio: " + error.message });
    }
};

const actualizarServicio = async (req, res) => {
    try {
        const servicioActualizado = await ServiciosSalud.findOneAndUpdate(
            { servicio_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!servicioActualizado) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }
        res.json(servicioActualizado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el servicio: " + error.message });
    }
};

const eliminarServicio = async (req, res) => {
    try {
        const servicioEliminado = await ServiciosSalud.findOneAndDelete({ servicio_id: req.params.id });
        if (!servicioEliminado) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }
        res.json({ message: "Servicio eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el servicio: " + error.message });
    }
};

module.exports = {
    crearServicio,
    obtenerServicios,
    obtenerServicioPorId,
    actualizarServicio,
    eliminarServicio
};
