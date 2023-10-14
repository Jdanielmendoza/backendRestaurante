import {pool} from "../../config/databaseConnection.js"; 


export const obtenerCajeros = async() => {
    const client = await pool.connect(); 
    const res =  await pool.query( "SELECT USUARIO.NOMBRE, ROL.CARGO FROM USUARIO,ROL WHERE USUARIO.ID_ROL = ROL.ID AND ROL.CARGO = 'cajero' " );
    client.release();  

    return res.rows ; 
}

export const registrarUsuarios= async(ci, nombre, telefono, fechaDeNacimiento, correo, sexo, contraseña, id_rol, imagen="https://friconix.com/png/fi-ctluxx-anonymous-user-circle-solid.png")=>{
    const client = await pool.connect(); 

    const res = await pool.query("INSERT INTO USUARIO(ci, nombre, telefono, fechaDeNacimiento, correo, sexo, contraseña, id_rol, imagen) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)", [ci, nombre, telefono, fechaDeNacimiento, correo, sexo, contraseña, id_rol, imagen]);

    client.release();

    return res
}

export const validarCorreosUnicos = async (correo) => {
    try {
        const client = await pool.connect();
        const res = await pool.query("SELECT ci FROM usuario WHERE correo=$1", [correo]);
        client.release();
        return res.rows.length > 0;
    } catch (error) {
        console.error(error);
        return false;
    }
};

