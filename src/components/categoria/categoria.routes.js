import {Router} from "express"
const routerUser = Router() ; 
import {getCategoria,postCategoria,putCategoria,deleteCategoria} from "./categoria.controller.js"
import { validateCreateCategoria } from "../../validators/categoria.js";

routerUser.get('/', getCategoria);
routerUser.post('/',validateCreateCategoria,postCategoria);
routerUser.put('/',validateCreateCategoria,putCategoria);
routerUser.delete('/:id',validateCreateCategoria, deleteCategoria);

export default routerUser; 