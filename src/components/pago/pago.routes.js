import { Router } from "express";
import { pagoController } from "./pago.controller.js";

const pagoRouter = Router() ; 

pagoRouter.get('/', pagoController.getPago) ;

pagoRouter.post('/',pagoController.createPago);

pagoRouter.patch('/:idPago',pagoController.updatePago);

pagoRouter.delete('/:idPago', pagoController.deletePago);


export default pagoRouter; 

