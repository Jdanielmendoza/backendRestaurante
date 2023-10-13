import {Router} from "express"
import { getCajeros } from "./user.controllers.js";
const routerUser = Router() ; 


routerUser.get('/admin', (req,res) =>{
    res.send("admin");
});

routerUser.get('/cook', (req,res) =>{
    res.send("cook");
});

routerUser.get('/cajero', getCajeros);


export default routerUser; 