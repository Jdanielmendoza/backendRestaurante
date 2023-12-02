import { pool } from "../../config/databaseConnection.js";

async function getDatosPedidos() {
  const client = await pool.connect();
  try {
    const res = await pool.query("SELECT * FROM obtener_datos_pedidos()");
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
}

async function getDetallePedidos(idPedido) {
  const client = await pool.connect();
  try {
    const res = await pool.query("SELECT * FROM obtenerDetallesDelPedido($1)", [
      idPedido,
    ]);
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
}

async function createPedido(
  id,
  estado,
  total,
  descuento,
  detalle,
  fecha,
  ci_usuario,
  id_tipodepago,
  id_mesa,
  nro,
  arreglo_de_detalles_de_pedidos
) {
  const client = await pool.connect();
  try {
    const res = await pool.query(
      "SELECT * FROM crearpedidoynota($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [
        id,
        estado,
        total,
        descuento,
        detalle,
        fecha,
        ci_usuario,
        id_tipodepago,
        id_mesa,
        nro,
        JSON.stringify(arreglo_de_detalles_de_pedidos),
      ]
    );
    client.release();
    return res;
  } catch (error) {
    client.release();
    return error;
  }
}

async function updatePedido(
  idPedido,
  estado,
  total,
  descuento,
  detalle,
  id_tipodepago
) {
  const client = await pool.connect();
  try {
    const res = pool.query(
      "UPDATE pedido SET estado = $1, total=$2, descuento=$3, detalle=$4, id_tipodepago=$5 where id = $6",
      [estado, total, descuento, detalle, id_tipodepago, idPedido]
    );
    client.release();
    return res;
  } catch (error) {
    client.release();
    return error;
  }
}

async function changePedido(idPedido, id_mesa, id_tipodepago, estado, nro) {
  const client = await pool.connect();
  try {
    const res = pool.query(
      "UPDATE pedido SET id_mesa = $1, id_tipodepago=$2, estado = $3, nro=$4 where id = $5",
      [id_mesa, id_tipodepago, estado, nro, idPedido]
    );
    client.release();
    return res;
  } catch (error) {
    client.release();
    return error;
  }
}

async function deletePedido(idPedido) {
  const client = await pool.connect();
  try {
    const res = pool.query("DELETE FROM pedido WHERE id = $1", [idPedido]);
    client.release();
    return res;
  } catch (error) {
    client.release();
    return error;
  }
}

export const pedidoModels = {
  getDatosPedidos,
  getDetallePedidos,
  createPedido,
  updatePedido,
  deletePedido,
  changePedido,
};
