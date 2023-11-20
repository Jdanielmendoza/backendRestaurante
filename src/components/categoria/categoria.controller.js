import { obtenerCategoria,crearCategoria,eliminarCategoria,actualizarCategoria} from "./categoria.model.js";

const errorServidor={
  message:"Error de servidor", success:"false"
}


export const postCategoria=async(req,res)=>{
  
try {
  const {id,nombre,descripcion,id_categoria}=req.body
  if (nombre.trim().length == 0 || descripcion.trim().length == 0) {
    return res.status(400).send({ error: 'nombre y descripcion son requeridos' });
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
  const {id,nombre,descripcion, id_categoria}=req.body;
  if(nombre?.length == 0 || descripcion.length == 0){
     return res.status(403).json({message:"No se admiten nulos"})
  }
  const categoria =await actualizarCategoria(id,nombre,descripcion,id_categoria);
  res.status(200).json({message:"Categoria actualizada exitosamente", responseData:categoria})
} catch (error) {
  res.status(500).json(errorServidor);
}
}

export const deleteCategoria=async(req,res)=>{
  try {
    const {id}=req.params;
    await eliminarCategoria(id);
    res.status(200).json({message:"Categoria eliminada"})
  } catch (error) {
    res.status(500).json(errorServidor);
  }
}

