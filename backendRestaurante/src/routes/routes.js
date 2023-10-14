import { Router } from "express";
import routerUser from "../components/user/user.routes.js";
import authRouter from "../services/auth/auth.routes.js";

const router = Router(); 
router.use('/user', routerUser); 
router.use('/auth', authRouter)

export default router ;


