import { obtenerCajeros } from "./user.models.js";

export const getCajeros = async (req,res)=>{
    try {
        const cajeros = await obtenerCajeros(); 
        console.log(cajeros);
        res.send(cajeros);
    } catch (error) {
        res.status(500).send(error);
    }
}