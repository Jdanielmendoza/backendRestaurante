import { pool } from "../../config/databaseConnection.js";

const getProducts = async () => {
  const client = await pool.connect();

  try {
    const res = await pool.query("select producto.*,categoria.nombre as nombreCategoria from producto, categoria where producto.id_categoria = categoria.id ");
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
};

const getOneProduct = async (idProducto) => {
  const client = await pool.connect();
  try {
    const res = await pool.query("select * from producto where id = $1", [
      idProducto,
    ]);

    client.release();

    return res.rows[0];
  } catch (error) {
    client.release();
    return error;
  }
};

const createProduct = async (producto) => {
    const client = await pool.connect(); 
    try {
        const {id, nombre , descripcion, precio, stock, imagen, id_categoria} = producto; 
        const res = await pool.query('INSERT INTO PRODUCTO VALUES($1,$2,$3,$4,$5,$6,$7)',[id,nombre,descripcion,precio,stock,imagen,id_categoria]);
        client.release();
        return res ; 
    } catch (error) {
        client.release()  ; 
        console.log(error);
        return error
    }

}

const updateProduct = async(idProducto, producto)=>{
    const {nombre , descripcion, precio, stock, imagen, id_categoria} = producto; 
    const client = await pool.connect(); 
    try {
        const response = await pool.query("UPDATE PRODUCTO SET nombre = $1 , descripcion = $2, precio = $3,STOCK = $4, imagen = $5, id_categoria = $6 where id = $7", [nombre,descripcion,precio,stock,imagen,id_categoria,idProducto]) ;
        client.release() ; 
        return response ; 
    } catch (error) {
        client.release() ; 
        return error ; 
    }

}

const deleteProduct = async (idProducto) => {
    const client = await pool.connect(); 
    try {
        const res = await pool.query('DELETE FROM PRODUCTO WHERE id = $1',[idProducto]);
        client.release();
        return res ; 
    } catch (error) {
        client.release()  ; 
        console.log(error);
        return error
    }

}

export const productModel = {
  getProducts,
  getOneProduct,
  createProduct, 
  updateProduct,
  deleteProduct
};
