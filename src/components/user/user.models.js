import { pool } from "../../config/databaseConnection.js";

export const obtenerUsuarios = async () => {
  const client = await pool.connect();
  try {
    const response = await pool.query(
      "SELECT USUARIO.*,ROL.CARGO FROM USUARIO,ROL WHERE ROL.ID = USUARIO.ID_ROL ;"
    );
    client.release();
    return response?.rows;
  } catch (error) {
    console.log(error);
    client.release();
    return error;
  }
};

export const obtenerCajeros = async () => {
  const client = await pool.connect();
  const res = await pool.query(
    "SELECT USUARIO.NOMBRE, ROL.CARGO FROM USUARIO,ROL WHERE USUARIO.ID_ROL = ROL.ID AND ROL.CARGO = 'cajero' "
  );
  client.release();

  return res.rows;
};

export const registrarUsuarios = async (
  ci,
  nombre,
  telefono,
  fechaDeNacimiento,
  correo,
  sexo,
  contraseña,
  id_rol,
  imagen = "https://friconix.com/png/fi-ctluxx-anonymous-user-circle-solid.png"
) => {
  const client = await pool.connect();

  const res = await pool.query(
    "INSERT INTO USUARIO(ci, nombre, telefono, fechaDeNacimiento, correo, sexo, contraseña, id_rol, imagen) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    [
      ci,
      nombre,
      telefono,
      fechaDeNacimiento,
      correo,
      sexo,
      contraseña,
      id_rol,
      imagen,
    ]
  );

  client.release();

  return res;
};

export const updateUsuario = async (User) => {
  const {
    imagen,
    ci,
    nombre,
    telefono,
    correo,
    fechaDeNacimiento,
    sexo,
    id_rol,
  } = User;
  const client = await pool.connect();
  try {
    const response = await pool.query(
      "UPDATE USUARIO SET ci = $1 , nombre = $2, telefono = $3,fechadenacimiento = $4, correo = $5, sexo = $6, imagen = $7, id_rol = $8 where ci = $9",
      [ci, nombre, telefono,fechaDeNacimiento,correo, sexo,imagen, id_rol, ci]
    );
    client.release();
    return response;
  } catch (error) {
    client.release();
    return error;
  }
};

export const deleteUser = async (carnet) => {
    const client = await pool.connect(); 
    try {
        const res = await pool.query('DELETE FROM USUARIO WHERE ci = $1',[carnet]);
        client.release();
        return res ; 
    } catch (error) {
        client.release()  ; 
        console.log(error);
        return error
    }

}

export const validarCorreosUnicos = async (correo) => {
  try {
    const client = await pool.connect();
    const res = await pool.query("SELECT ci FROM usuario WHERE correo=$1", [
      correo,
    ]);
    client.release();
    return res.rows.length > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const cambiarContraseña = async (ci, nuevaContraseña) => {
  const client = await pool.connect();
  const res = await pool.query("UPDATE USUARIO SET contraseña=$1 WHERE ci=$2", [
    nuevaContraseña,
    ci,
  ]);
  client.release();
  return res;
};

export const constraseñaActual = async (ci) => {
  const client = await pool.connect();
  const resp = await pool.query("Select contraseña from usuario where ci=$1", [
    ci,
  ]);
  client.release();
  return resp.rows[0].contraseña;
};

export const validarUsuariosExistentes = async (ci) => {
  try {
    const client = await pool.connect();
    const res = await pool.query("SELECT ci FROM usuario WHERE ci=$1", [ci]);
    client.release();
    return res.rows.length > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const obtenerUsuarioPorCarnetDeIdentidad = async (ci) => {
  try {
    const client = await pool.connect();
    const res = await pool.query("SELECT * FROM usuario WHERE ci=$1", [ci]);
    client.release();
    return res.rows;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const obtenerUsuarioPorSuNombre = async (nombre) => {
  try {
    const client = await pool.connect();
    const res = await pool.query(
      "SELECT usuario.*, rol.cargo from usuario,rol where usuario.id_rol = rol.id and usuario.nombre=$1",
      [nombre]
    );
    client.release();
    return res.rows[0];
  } catch (error) {
    console.error(error);
    return error;
  }
};
