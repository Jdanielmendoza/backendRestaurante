import { pool } from "../../config/databaseConnection.js";

export const crearCategoria=async(id,nombre,descripcion,id_categoria)=>{
  try {
    const client= await pool.connect();
    const res= await pool.query("INSERT INTO CATEGORIA(id,nombre,descripcion,id_categoria) values($1,$2,$3,$4)",[id,nombre,descripcion,id_categoria]);
    client.release();
    return res
  } catch (error) {
    client.release();
    return error
  }
}

export const obtenerCategoria = async () => {
  try {
    const client = await pool.connect();
    const res = await pool.query("SELECT * FROM CATEGORIA")
    client.release();
    return res.rows;
  } catch (error) {
   client.release();
   return error
  }

}

export const eliminarCategoria=async(id)=>{
  try {
    const client=await pool.connect();
    const res=await pool.query("DELETE FROM CATEGORIA WHERE id=$1",[id]);
    client.release();
    return res;
  } catch (error) {
    client.release();
    return error
  }
}

export const actualizarCategoria=async(id,nombre,descripcion)=>{
  try {
    const client=await pool.connect();
    const res= await pool.query("UPDATE CATEGORIA SET nombre=$1,descripcion=$2  WHERE id=$3",[nombre,descripcion,id]);
    client.release();
    return res
    
  } catch (error) {
    client.release();
    return error
  }
}

