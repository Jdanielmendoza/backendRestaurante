import {Router} from "express"
const routerUser = Router() ; 
import {getMesa,postMesa,putMesa,deleteMesa} from "./mesa.controller.js"
import { validateCreateMesa } from "../../validators/mesa.js";




routerUser.get('/', getMesa);
routerUser.post('/',validateCreateMesa,postMesa)
routerUser.put('/',validateCreateMesa,putMesa)
routerUser.delete('/',validateCreateMesa, deleteMesa);


export default routerUser; 