import { obtenerCajeros, registrarUsuarios,validarCorreosUnicos,cambiarContraseña,constraseñaActual,validarUsuariosExistentes } from "./user.models.js";
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

        nombre = nombre?.toLowerCase().trim();
        if(await validarCorreosUnicos(correo)){
            console.log(validarCorreosUnicos(correo))
            res.status(403).send('Correo ya existe')
            return
        }
        
        await registrarUsuarios(ci, nombre, telefono, fechaDeNacimiento, correo, sexo, 
            await encryptarContraseña(contraseña), id_rol, imagen).then(()=>res.status(200).send('Usuario registrado satisfactoriamente'))
      
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}


export const patchContraseña=async(req,res)=>{
    
    try {
        const {ci,antiguaContraseña,nuevaContraseña} =req.body;
        if(!await validarUsuariosExistentes(ci)){
           
            res.status(403).send(`El usuario con el ci : ${ci} no existe  `)
            return
        }
        const match= await bcrypt.compare(antiguaContraseña,await constraseñaActual(ci));
        console.log(match)
        if(match){
            await cambiarContraseña(ci,await encryptarContraseña(nuevaContraseña))
            res.status(200).send("La contraseña ha sido actualizada");
        }else{
            res.status(403).send("Las contraseñas no coinciden");
        }
       
    } catch (error) {
        res.status(500).send(error);
    }
}

const encryptarContraseña=async(contraseña)=>{
    const salt= await bcrypt.genSalt(5);
    const newHash = await bcrypt.hash(contraseña, salt);
    return newHash
}