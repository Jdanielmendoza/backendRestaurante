import { Router } from "express";
import { pedidoController } from "./pedido.controller.js";
const pedidoRouter=Router();

pedidoRouter.get('/',pedidoController.getDatosPedidos);

pedidoRouter.get('/:idPedido',pedidoController.getDetallePedidos);

pedidoRouter.post('/',pedidoController.createPedido);

pedidoRouter.put('/:idPedido',pedidoController.updatePedido);
pedidoRouter.put('/change/:idPedido',pedidoController.actualizarDatosPedido);

pedidoRouter.delete('/:idPedido',pedidoController.deletePedido);

export default pedidoRouter;