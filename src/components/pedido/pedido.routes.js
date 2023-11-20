import { Router } from "express";
import { pedidoController } from "./pedido.controller.js";
const pedidoRouter=Router();

pedidoRouter.get('/',pedidoController.getDatosPedidos);

pedidoRouter.get('/:idPedido',pedidoController.getDetallePedidos);

pedidoRouter.post('/',pedidoController.createPedido);

pedidoRouter.patch('/:idPedido',pedidoController.updatePedido);

pedidoRouter.delete('/:idPedido',pedidoController.deletePedido);

export default pedidoRouter;