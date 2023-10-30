import { obtenerMesa,crearMesa,eliminarMesa,actualizarMesa} from "./mesa.model.js";

const errorServidor={
  message:"Error de servidor", success:"false"
}


export const postMesa=async(req,res)=>{
  
try {
  const {id,nro,nroSillas}=req.body
  await crearMesa(id,nro,nroSillas);
  res.status(200).json({message:"Mesa creada!"});
} catch (error) {
  res.status(500).json(errorServidor);
}
}


export const getMesa=async(req,res)=>{
 
  try {
    
    const mesa=await obtenerMesa();
    
    res.status(200).json(mesa)
   

  } catch (error) {
    res.status(500).json(errorServidor);
  }
  
  }

export const putMesa=async(req,res)=>{
try {
  const {id,nro,nroSillas}=req.body;
  const mesa=await actualizarMesa(id,nro,nroSillas);
  res.status(200).json({message:"Mesa actualizada exitosamente"})
} catch (error) {
  res.status(500).json(errorServidor);
}
}

export const deleteMesa=async(req,res)=>{
  try {
    const {id}=req.params;
    await eliminarMesa(id);
    res.status(200).json({message:"Mesa eliminada"})
  } catch (error) {
    res.status(500).json(errorServidor);
  }
}

