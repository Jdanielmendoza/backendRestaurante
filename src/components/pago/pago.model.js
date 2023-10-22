import { pool } from "../../config/databaseConnection.js";

const getPago = async () => {
  const client = await pool.connect();

  try {
    const res = await pool.query("select * from tipoDePago");
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
};


const createPago = async (newPago) => {
    const client = await pool.connect(); 
    try {
        const {id, nombre } = newPago; 
        const res = await pool.query('INSERT INTO tipoDePago VALUES($1,$2)',[id,nombre]);
        client.release();
        return res ; 
    } catch (error) {
        client.release()  ; 
        console.log(error);
        return error
    }

}

const updatePago = async(idPago, pago)=>{
    const {nombre} = pago; 
    const client = await pool.connect(); 
    try {
        const response = await pool.query("UPDATE tipoDePago SET nombre = $1 where id = $2", [nombre, idPago]) ;
        client.release() ; 
        return response ; 
    } catch (error) {
        client.release() ; 
        return error ; 
    }

}

const deletePago = async (idPago) => {
    const client = await pool.connect(); 
    try {
        const res = await pool.query('DELETE FROM tipoDePago WHERE id = $1',[idPago]);
        client.release();
        return res ; 
    } catch (error) {
        client.release()  ; 
        console.log(error);
        return error
    }

}

export const pagoModel = {
  getPago,
  createPago, 
  updatePago,
  deletePago
};
