import { Router } from "express";
import { insumoController } from "./insumos.controller.js";

const insumoRouter = Router() ; 

insumoRouter.get('/',insumoController.getInsumo ) ;

insumoRouter.post('/',insumoController.createInsumo);

insumoRouter.put('/:idInsumo',insumoController.updateInsumo);

insumoRouter.delete('/:idInsumo',insumoController.deleteInsumo);


export default insumoRouter; 

