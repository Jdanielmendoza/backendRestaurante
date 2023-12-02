import { pool } from "../../config/databaseConnection.js";


async function getIngresoPorVentas() {
    const client = await pool.connect();
    try {
      const res = await pool.query("SELECT public.ingreso_por_ventas()");
      client.release();
      return res.rows;
    } catch (error) {
      client.release();
      return error;
    }
  }

async function getVentasDeLaSemana(){ 
    const client = await pool.connect() ; 
    try {
        const res = await pool.query("SELECT to_char(DATE(fecha), 'Day') as dia, COUNT(*) as cantidad FROM pedido WHERE fecha >= DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '0 day' AND estado = 'terminado' GROUP BY dia ORDER BY dia; "); 
        client.release(); 
        return res.rows; 

    } catch (error) {
        client.release() ; 
        return error ; 
    }
}
export const reportsModel = {
    getIngresoPorVentas,
    getVentasDeLaSemana
}