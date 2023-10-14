import { Router } from "express";
import routerUser from "../components/user/user.routes.js";

const router = Router(); 
router.use('/user', routerUser); 


export default router ;


