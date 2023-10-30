import { pool } from "../../config/databaseConnection.js";

export const crearMesa=async(id,nro,nroSillas=0)=>{
  const client= await pool.connect();
  try {
    
    const res= await pool.query("INSERT INTO MESA(id,nro,nroSillas) values($1,$2,$3)",[id,nro,nroSillas]);
    client.release();
    return res
  } catch (error) {
    client.release();
    return error
  }
}

export const obtenerMesa = async () => {
  const client = await pool.connect();
  try {

    const res = await pool.query("SELECT * FROM MESA")
    client.release();
    return res.rows;
  } catch (error) {
   client.release();
   return error
  }

}

export const eliminarMesa=async(id)=>{
  const client=await pool.connect();
  try {

    const res=await pool.query("DELETE FROM MESA WHERE id=$1",[id]);
    client.release();
    return res;
  } catch (error) {
    client.release();
    return error
  }
}

export const actualizarMesa=async(id,nro,nroSillas)=>{
  const client=await pool.connect();
  try {

    const res= await pool.query("UPDATE MESA SET nro=$1,nroSillas=$2  WHERE id=$3",[nro,nroSillas,id]);
    client.release();
    return res
    
  } catch (error) {
    client.release();
    return error
  }
}

