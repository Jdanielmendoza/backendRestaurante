import { pedidoModels } from "./pedido.model.js"

const getDatosPedidos=async(req,res)=>{
  try {
    const response = await pedidoModels.getDatosPedidos();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
}
const getDetallePedidos=async(req,res)=>{
  const {idPedido}=req.params;
  try {
    const response = await pedidoModels.getDetallePedidos(idPedido);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
}
const createPedido = async (req, res) => {
  const {id,estado,total,descuento,detalle,fecha,ci_usuario,id_tipodepago,
    id_mesa,nro,arreglo_de_detalles_de_pedidos} = req.body;
  try {
    const response = await pedidoModels.createPedido(id,estado,total,descuento,detalle,fecha,ci_usuario,id_tipodepago,
      id_mesa,nro,arreglo_de_detalles_de_pedidos);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.json(404).json(error);
  }
};

const updatePedido = async(req,res)=>{
  const {idPedido} = req.params;
  const {estado,total,descuento,detalle,id_tipodepago,ci_usuario} = req.body;
  try {
    const response = await pedidoModels.updatePedido(idPedido,estado,total,descuento,detalle,id_tipodepago,ci_usuario);
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    res.status(404).json(error);
  }

}

const deletePedido = async (req, res) => {
  const { idPedido } = req.params;
  try {
    const response = await pedidoModels.deletePedido(idPedido);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const pedidoController={
  getDatosPedidos,
  getDetallePedidos,
  updatePedido,
  createPedido,
  deletePedido
}