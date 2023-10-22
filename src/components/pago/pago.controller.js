import { pagoModel } from "./pago.model.js";

const getPago = async (req, res) => {
  try {
    const response = await pagoModel.getPago();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

const createPago = async (req, res) => {
  const newPago = req.body;
  try {
    const response = await pagoModel.createPago(newPago);

    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.json(404).json(error);
  }
};

const updatePago = async (req, res) => {
  const { idPago } = req.params;
  const pago = req.body;
  try {
    const response = await pagoModel.updatePago(idPago, pago);
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

const deletePago = async (req, res) => {
  const { idPago } = req.params;
  try {
    const response = await pagoModel.deletePago(idPago);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const pagoController = {
  getPago,
  createPago,
  updatePago,
  deletePago,
};
