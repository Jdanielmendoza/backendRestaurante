import { insumoModel } from "./insumos.model.js";


const getInsumo = async (req, res) => {
  try {
    const response = await insumoModel.getInsumo();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

const createInsumo = async (req, res) => {
  const newInsumo = req.body;
  try {
    const response = await insumoModel.createInsumo(newInsumo);

    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.json(404).json(error);
  }
};

const updateInsumo = async (req, res) => {
  const { idInsumo } = req.params;
  const insumo = req.body;
  try {
    const response = await insumoModel.updateInsumo(idInsumo,insumo);
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

const deleteInsumo = async (req, res) => {
  const { idInsumo } = req.params;
  try {
    const response = await insumoModel.deleteInsumo(idInsumo);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const insumoController = {
  getInsumo,
  createInsumo,
  updateInsumo,
  deleteInsumo,
};
