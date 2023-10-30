import { obtenerCategoria,crearCategoria,eliminarCategoria,actualizarCategoria} from "./categoria.model.js";

const errorServidor={
  message:"Error de servidor", success:"false"
}


export const postCategoria=async(req,res)=>{
  
try {
  const {id,nombre,descripcion,id_categoria}=req.body
  if(!nombre || !descripcion){
    return res.status(403).json({message:"No se admiten nulos"})
 }
  await crearCategoria(id,nombre,descripcion,id_categoria);
  res.status(200).json({message:"Categoria creada!"});
} catch (error) {
  res.status(500).json(errorServidor);
}
}


export const getCategoria=async(req,res)=>{
 
  try {
    
    const mesa=await obtenerCategoria();
    
    res.status(200).json(mesa)
   

  } catch (error) {
    res.status(500).json(errorServidor);
  }
  
  }

export const putCategoria=async(req,res)=>{
try {
  const {id,nombre,descripcion}=req.body;
  if(!nombre || !descripcion){
     return res.status(403).json({message:"No se admiten nulos"})
  }
  const mesa=await actualizarCategoria(id,nombre,descripcion);
  res.status(200).json({message:"Categoria actualizada exitosamente"})
} catch (error) {
  res.status(500).json(errorServidor);
}
}

export const deleteCategoria=async(req,res)=>{
  try {
    const {id}=req.body;
    await eliminarCategoria(id);
    res.status(200).json({message:"Categoria eliminada"})
  } catch (error) {
    res.status(500).json(errorServidor);
  }
}

