import { obtenerCajeros, registrarUsuarios,validarCorreosUnicos } from "./user.models.js";
import bcrypt from "bcrypt"

export const getCajeros = async (req, res) => {
    try {
        const cajeros = await obtenerCajeros();
        console.log(cajeros);
        res.send(cajeros);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const postUsuario = async (req, res) => {
    try {
        const { ci, telefono, fechaDeNacimiento, correo, sexo, contraseña, id_rol, imagen } = req.body;
        let nombre = req.body.nombre;
        const saltRounds = 10;
        const myPlaintextPassword = 's0/\/\P4$$w0rD';
        
        nombre = nombre?.toLowerCase().trim();
        if(await validarCorreosUnicos(correo)){
            console.log(validarCorreosUnicos(correo))
            res.status(403).send('Correo ya existe')
            return
        }
        
        bcrypt.hash(myPlaintextPassword, saltRounds, async (err, hash) =>{
            await registrarUsuarios(ci, nombre, telefono, fechaDeNacimiento, correo, sexo, hash, id_rol, imagen).then(()=>res.status(200).send('Usuario registrado satisfactoriamente'))
        });
        
      
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}


