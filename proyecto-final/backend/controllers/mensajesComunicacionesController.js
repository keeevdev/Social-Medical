const MensajesComunicaciones = require('../models/mensajesComunicaciones');

exports.createMensaje = async (req, res) => {
    try {
        const nuevoMensaje = new MensajesComunicaciones(req.body);
        const mensajeGuardado = await nuevoMensaje.save();
        res.status(201).json(mensajeGuardado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el mensaje: " + error.message });
    }
};

exports.getAllMensajes = async (req, res) => {
    try {
        const mensajes = await MensajesComunicaciones.find();
        res.json(mensajes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los mensajes: " + error.message });
    }
};

exports.getMensajeById = async (req, res) => {
    try {
        const mensaje = await MensajesComunicaciones.findOne({ mensaje_id: req.params.id });
        if (!mensaje) {
            return res.status(404).json({ message: "Mensaje no encontrado" });
        }
        res.json(mensaje);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el mensaje: " + error.message });
    }
};

exports.updateMensaje = async (req, res) => {
    try {
        const mensajeActualizado = await MensajesComunicaciones.findOneAndUpdate(
            { mensaje_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!mensajeActualizado) {
            return res.status(404).json({ message: "Mensaje no encontrado" });
        }
        res.json(mensajeActualizado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el mensaje: " + error.message });
    }
};

exports.deleteMensaje = async (req, res) => {
    try {
        const mensajeEliminado = await MensajesComunicaciones.findOneAndDelete({ mensaje_id: req.params.id });
        if (!mensajeEliminado) {
            return res.status(404).json({ message: "Mensaje no encontrado" });
        }
        res.json({ message: "Mensaje eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el mensaje: " + error.message });
    }
};
