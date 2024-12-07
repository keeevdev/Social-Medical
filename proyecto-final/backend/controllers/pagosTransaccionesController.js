const PagosTransacciones = require('../models/pagosTransacciones');

exports.createPago = async (req, res) => {
    try {
        const nuevoPago = new PagosTransacciones(req.body);
        const pagoGuardado = await nuevoPago.save();
        res.status(201).json(pagoGuardado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el pago: " + error.message });
    }
};

exports.getAllPagos = async (req, res) => {
    try {
        const pagos = await PagosTransacciones.find();
        res.json(pagos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los pagos: " + error.message });
    }
};

exports.getPagoById = async (req, res) => {
    try {
        const pago = await PagosTransacciones.findOne({ transaccion_id: req.params.id });
        if (!pago) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }
        res.json(pago);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el pago: " + error.message });
    }
};

exports.updatePago = async (req, res) => {
    try {
        const pagoActualizado = await PagosTransacciones.findOneAndUpdate(
            { transaccion_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!pagoActualizado) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }
        res.json(pagoActualizado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el pago: " + error.message });
    }
};

exports.deletePago = async (req, res) => {
    try {
        const pagoEliminado = await PagosTransacciones.findOneAndDelete({ transaccion_id: req.params.id });
        if (!pagoEliminado) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }
        res.json({ message: "Pago eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el pago: " + error.message });
    }
};
