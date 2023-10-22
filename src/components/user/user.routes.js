import {Router} from "express"
import { getCajeros, postUsuario,patchContraseña } from "./user.controllers.js";
const routerUser = Router() ; 
import { validateCreate } from "../../validators/user.js";


routerUser.get('/admin', (req,res) =>{
    res.send("admin");
});

routerUser.get('/cook', (req,res) =>{
    res.send("cook");
});

routerUser.get('/cajero', getCajeros);

routerUser.post('/registro',validateCreate,postUsuario)
routerUser.patch('/cambiarClave',patchContraseña)



export default routerUser; 