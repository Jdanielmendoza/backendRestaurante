import { pool } from "../../config/databaseConnection.js";

const getInsumo = async () => {
  const client = await pool.connect();

  try {
    const res = await pool.query("select * from insumos");
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
};


const createInsumo = async (newInsumo) => {
    const client = await pool.connect(); 
    try {
        const {id,nombre,cantidad,descripcion,ci_usuario,fecha} = newInsumo; 
        const res = await pool.query('INSERT INTO insumos VALUES($1,$2,$3,$4,$5,$6)',[id,nombre,cantidad,descripcion,ci_usuario,fecha]);
        client.release();
        return res ; 
    } catch (error) {
        client.release()  ; 
        console.log(error);
        return error
    }

}

const updateInsumo = async(idInsumo, insumo)=>{
    const {nombre,cantidad,descripcion,fecha} = insumo; 
    const client = await pool.connect(); 
    try {
        const response = await pool.query("UPDATE insumos SET nombre = $1,cantidad = $2, descripcion = $3,fecha=$4 where id = $5", [nombre,cantidad,descripcion,fecha, idInsumo]) ;
        client.release() ; 
        return response ; 
    } catch (error) {
        client.release() ; 
        return error ; 
    }

}

const deleteInsumo = async (idInsumo) => {
    const client = await pool.connect(); 
    try {
        const res = await pool.query('DELETE FROM insumos WHERE id = $1',[idInsumo]);
        client.release();
        return res ; 
    } catch (error) {
        client.release()  ; 
        console.log(error);
        return error
    }

}

export const insumoModel = {
  getInsumo,
  createInsumo, 
  updateInsumo,
  deleteInsumo
};
