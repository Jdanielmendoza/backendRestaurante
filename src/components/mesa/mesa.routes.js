import {Router} from "express"
const routerUser = Router() ; 
import {getMesa,postMesa,putMesa,deleteMesa} from "./mesa.controller.js"
import { validateCreateMesa } from "../../validators/mesa.js";




routerUser.get('/', getMesa);
routerUser.post('/',validateCreateMesa,postMesa)
routerUser.put('/',putMesa)
routerUser.delete('/:id', deleteMesa);


export default routerUser; 