import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 
import { obtenerUsuarioPorCarnetDeIdentidad,obtenerUsuarioPorSuNombre } from "../../components/user/user.models.js";


export const loginUser = async (req, res) => {
    let { nombre, contraseña } = req.body;
    nombre = nombre?.toLowerCase().trim() ; 
    console.log(nombre + " " + contraseña);
    const result = await obtenerUsuarioPorSuNombre(nombre);
    if (!!!result) {
      return res.status(404).json({ message: "El usuario no se encontro!" , success:false}); // Not Found
    }
    try {
      const checkPassword = await bcrypt.compare(contraseña, result.contraseña);
      if (!checkPassword) {
        return res.status(401).json({ message: "Contraseña incorrecta!" ,  success:false}); // Unauthorized
      }
      const token = jwt.sign(
        { carnet: result.ci, nombre },
        process.env.SECRET_KEY_TOKEN,
        {
          expiresIn: "48h",
        }
      );
  
      return res.status(200).json({
             message: "inicio de sesión con éxito!", 
             token ,
             success:true , 
             data: {
                ci: result.ci,
                nombre:result.nombre,
                telefono:result.telefono, 
                id_rol : result.id_rol, 
                imagen : result.imagen
                } 
            });

    } catch (error) {
      return res.status(500).json({ message: error.message ,success:false}); // Internal Server Error
    }
  };
  