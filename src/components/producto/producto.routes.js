import { Router } from "express";
import { productController } from "./producto.controller.js";

const routerProducto = Router() ; 

routerProducto.get('/', productController.getProducts) ;

routerProducto.get('/:idProducto', productController.getOneProduct) ;

routerProducto.post('/',productController.createProduct);

routerProducto.patch('/:idProducto',productController.updateProduct);

routerProducto.delete('/:idProducto', productController.deleteProduct);


export default routerProducto; 