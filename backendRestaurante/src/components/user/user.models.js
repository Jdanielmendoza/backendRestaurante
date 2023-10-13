import {pool} from "../../config/databaseConnection.js"; 


export const obtenerCajeros = async() => {
    const client = await pool.connect(); 
    const res =  await pool.query( "SELECT USUARIO.NOMBRE, ROL.CARGO FROM USUARIO,ROL WHERE USUARIO.ID_ROL = ROL.ID AND ROL.CARGO = 'cajero' " );
    client.release();  

    return res.rows ; 
}