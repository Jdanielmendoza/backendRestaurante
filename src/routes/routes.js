import { Router } from "express";
import routerUser from "../components/user/user.routes.js";
import authRouter from "../services/auth/auth.routes.js";
import routerTable from "../components/mesa/mesa.routes.js"
import routerCategory from "../components/categoria/categoria.routes.js";import routerProducto from "../components/producto/producto.routes.js";
import pagoRouter from "../components/pago/pago.routes.js";
import pedidoRouter from "../components/pedido/pedido.routes.js";
import insumoRouter from "../components/insumos/insumos.routes.js";

const router = Router(); 
router.use('/mesa',routerTable);
router.use('/usuario', routerUser); 
router.use('/auth', authRouter);
router.use('/categoria',routerCategory);
router.use('/producto', routerProducto);
router.use('/tipoDePago',pagoRouter);
router.use('/pedido',pedidoRouter); 
router.use('/insumo',insumoRouter);

export default router ;


