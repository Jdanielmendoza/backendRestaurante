import { Router } from "express";
import routerUser from "../components/user/user.routes.js";
import authRouter from "../services/auth/auth.routes.js";
import routerTable from "../components/mesa/mesa.routes.js"
import routerCategory from "../components/categoria/categoria.routes.js";
const router = Router(); 
router.use('/mesa',routerTable);
router.use('/user', routerUser); 
router.use('/auth', authRouter);
router.use('/categoria',routerCategory);


export default router ;


