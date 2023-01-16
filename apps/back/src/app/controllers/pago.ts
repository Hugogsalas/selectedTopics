import { Request, Response } from 'express';
import { Request as SQLRequest, Int, DateTime } from 'mssql';
import { getDbConnection } from '../helpers/db';

export const create = async (req: Request, res: Response) => {
  try {
    const { id_tipo_pago, fecha } = req.body;

    const conn = await getDbConnection();

    const query = `
      INSERT INTO pago (id_tipo_pago, fecha)
      VALUES (@id_tipo_pago, @fecha)
    `;

    const request = new SQLRequest(conn);
    request.input('id_tipo_pago', Int, id_tipo_pago);
    request.input('fecha', DateTime, fecha);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Pago creado exitosamente',
    });
  } catch (err) {
    console.error('Error al crear el pago:', err);
    res.status(500).send({
      success: false,
      message: 'Error al crear el pago',
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id_pago } = req.body;

    const conn = await getDbConnection();

    const query = 'DELETE FROM pago WHERE id_pago = @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_pago);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Pago eliminado exitosamente',
    });
  } catch (err) {
    console.error('Error al eliminar el pago:', err);
    res.status(500).send({
      success: false,
      message: 'Error al eliminar el pago',
    });
  }
};

export const get = (req: Request, res: Response) => {
  const { id_pago } = req.query;

  if (id_pago) getById(req, res);
  else getAll(req, res);
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id_pago } = req.query;

    const conn = await getDbConnection();

    const query = 'SELECT * FROM pago WHERE id_pago = @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_pago);

    const result = await request.query(query);

    const pago = result.recordset[0];

    conn.close();

    if (!pago) {
      res.status(400).send({
        success: false,
        message: 'Error, pago no encontrado',
      });
    } else {
      res.send({
        success: true,
        pago: pago,
      });
    }
  } catch (err) {
    console.error('Error al consultar el pago:', err);
    res.status(500).send({
      success: false,
      message: 'Error al consultar el pago',
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const conn = await getDbConnection();

    const query = 'SELECT * FROM pago';

    const request = new SQLRequest(conn);

    const result = await request.query(query);

    const pagos = result.recordset;

    conn.close();

    res.send({
      success: true,
      pagos: pagos,
    });
  } catch (err) {
    console.error('Error al consultar los pagos:', err);
    res.status(500).send({
      success: false,
      message: 'Error al consultar los pagos',
    });
  }
};

export const updateById = async (req: Request, res: Response) => {
  try {
    const { id_pago, id_tipo_pago, fecha } = req.body;

    const conn = await getDbConnection();

    const query = `
      UPDATE pago
      SET id_tipo_pago = @id_tipo_pago, fecha = @fecha
      WHERE id_pago = @id
    `;

    const request = new SQLRequest(conn);
    request.input('id', Int, id_pago);
    request.input('id_tipo_pago', Int, id_tipo_pago);
    request.input('fecha', DateTime, fecha);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Pago actualizado exitosamente',
    });
  } catch (err) {
    console.error('Error al actualizar el pago:', err);
    res.status(500).send({
      success: false,
      message: 'Error al actualizar el pago',
    });
  }
};
