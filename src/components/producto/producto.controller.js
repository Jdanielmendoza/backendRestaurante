import { productModel } from "./producto.model.js";

const getProducts = async (req, res) => {
  try {
    const response = await productModel.getProducts();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getOneProduct = async (req, res) => {
  const { idProducto } = req.params;
  try {
    const response = await productModel.getOneProduct(idProducto);

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createProduct = async (req, res) => {
  const newProducto = req.body;
  try {
    const response = await productModel.createProduct(newProducto);

    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.json(404).json(error);
  }
};

const updateProduct = async (req, res) => {
  const { idProducto } = req.params;
  const producto = req.body;
  try {
    const response = await productModel.updateProduct(idProducto, producto);
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

const deleteProduct = async (req, res) => {
  const { idProducto } = req.params;
  try {
    const response = await productModel.deleteProduct(idProducto);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const productController = {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
