import { Router } from "express";
import routerUser from "../components/user/user.routes.js";
import authRouter from "../services/auth/auth.routes.js";
import routerProducto from "../components/producto/producto.routes.js";
import pagoRouter from "../components/pago/pago.routes.js";

const router = Router(); 
router.use('/user', routerUser); 
router.use('/auth', authRouter); 
router.use('/producto', routerProducto);
router.use('/tipoDePago',pagoRouter)

export default router ;


