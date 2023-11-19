import { pool } from "../../config/databaseConnection.js";

export const crearCategoria=async(id,nombre,descripcion,id_categoria)=>{
  const client= await pool.connect();
  try {
    const res= await pool.query("INSERT INTO CATEGORIA(id,nombre,descripcion,id_categoria) values($1,$2,$3,$4)",[id,nombre,descripcion,id_categoria]);
    client.release();
    return res;
  } catch (error) {
    client.release();
    return error;
  }
};

export const obtenerCategoria = async () => {
  const client = await pool.connect();
  try {
    
    const res = await pool.query(
      "SELECT CATEGORIA_HIJO.*, CATEGORIA_PADRE.nombre AS categoria_padre FROM CATEGORIA AS CATEGORIA_HIJO LEFT JOIN CATEGORIA AS CATEGORIA_PADRE ON CATEGORIA_HIJO.id_categoria =   CATEGORIA_PADRE.id;"
    );
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
};



export const eliminarCategoria=async(id)=>{
  const client=await pool.connect();
  try {
  
    const res=await pool.query("DELETE FROM CATEGORIA WHERE id=$1",[id]);
    client.release();
    return res;
  } catch (error) {
    client.release();
    return error;
  }
};

export const actualizarCategoria=async(id,nombre,descripcion,id_categoria)=>{
  const client=await pool.connect();
  try {
    
    const res= await pool.query("UPDATE CATEGORIA SET nombre=$1,descripcion=$2,id_categoria = $3  WHERE id=$4",[nombre,descripcion,id_categoria,id]);
    client.release();
    return res;
  } catch (error) {
    client.release();
    return error;
  }
};
