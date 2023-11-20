import { pool } from "../../config/databaseConnection.js";

async function getDatosPedidos(){
  const client = await pool.connect();
  try {
    const res=await pool.query("SELECT * FROM obtener_datos_pedidos()");
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }

}

async function getDetallePedidos(idPedido){
  const client = await pool.connect();
  try {
    const res=await pool.query("SELECT * FROM obtenerDetallesDelPedido($1)",[idPedido]);
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }

}

async function createPedido(id,estado,total,descuento,detalle,fecha,ci_usuario,id_tipodepago,
  id_mesa,nro,arreglo_de_detalles_de_pedidos){
const client= await pool.connect();
try {
  const res= await pool.query("SELECT * FROM crearpedidoynota($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",[id,estado,total,descuento,detalle,fecha,ci_usuario,id_tipodepago,id_mesa,nro,JSON.stringify(arreglo_de_detalles_de_pedidos)])
  client.release();
  return res
} catch (error) {
client.release();
return error
}

}

async function updatePedido(idPedido,estado,total,descuento,detalle,id_tipodepago,ci_usuario){
  const client= await pool.connect();
  try {
  const res= pool.query("UPDATE pedido SET id=$1,estado = $2,total=$3,descuento=$4,detalle=$5,id_tipodepago=$6,ci_usuario=$7 where id = $8",[idPedido,estado,total,descuento,detalle,id_tipodepago,ci_usuario])
  client.release();
  return res;
  } catch (error) {
    client.release();
    return error;
  }
}

async function deletePedido(idPedido){
  const client= await pool.connect();
  try {
    const res= pool.query('DELETE FROM pedido WHERE id = $1',[idPedido])
    client.release();
    return res;
  } catch (error) {
    client.release();
    return error;
  }
}


export const pedidoModels={
  getDatosPedidos,
  getDetallePedidos,
  createPedido,
  updatePedido,
  deletePedido
}