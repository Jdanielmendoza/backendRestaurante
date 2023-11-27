import {Router} from "express"
import { getCajeros, postUsuario,patchContraseña, getUsuarios, actualizarUsuario, eliminarUsuario } from "./user.controllers.js";
const routerUser = Router() ; 
import { validateCreate } from "../../validators/user.js";


routerUser.get('/admin', (req,res) =>{
    res.send("admin");
});

routerUser.get('/cook', (req,res) =>{
    res.send("cook");
});

routerUser.get('/cajero', getCajeros);


routerUser.get('/', getUsuarios)
routerUser.put('/',actualizarUsuario)
routerUser.post('/registro',postUsuario)
routerUser.patch('/cambiarClave',patchContraseña)
routerUser.delete('/:carnet',eliminarUsuario )


export default routerUser; 