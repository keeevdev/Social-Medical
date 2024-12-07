const Usuarios = require('../models/usuarioModel');

const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuarios.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios: " + error.message });
    }
};

const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuarios.findOne({ usuario_id: req.params.id });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario: " + error.message });
    }
};

const createUsuario = async (req, res) => {
    try {
        const nuevoUsuario = new Usuarios(req.body);
        const usuarioGuardado = await nuevoUsuario.save();
        res.status(201).json(usuarioGuardado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario: " + error.message });
    }
};

const updateUsuario = async (req, res) => {
    try {
        const usuarioActualizado = await Usuarios.findOneAndUpdate(
            { usuario_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!usuarioActualizado) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario: " + error.message });
    }
};

const deleteUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await Usuarios.findOneAndDelete({ usuario_id: req.params.id });
        if (!usuarioEliminado) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario: " + error.message });
    }
};

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
};
