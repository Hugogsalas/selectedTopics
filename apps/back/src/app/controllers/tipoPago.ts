import { Request, Response } from 'express';
import { Request as SQLRequest, VarChar, Int } from 'mssql';
import { getDbConnection } from '../helpers/db';

export const create = async (req: Request, res: Response) => {
  try {
    const { descripcion } = req.body;

    const conn = await getDbConnection();

    const query = `
    INSERT INTO tipo_pago (descripcion)
    VALUES (@descripcion)
  `;

    const request = new SQLRequest(conn);
    request.input('descripcion', VarChar, descripcion);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Tipo de pago creado exitosamente',
    });
  } catch (err) {
    console.error('Error al crear el tipo de pago:', err);
    res.status(500).send({
      success: false,
      message: 'Error al crear el tipo de pago',
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id_tipo_pago } = req.body;

    const conn = await getDbConnection();

    const query = 'DELETE FROM tipo_pago WHERE id_tipo_pago = @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_tipo_pago);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Tipo de pago eliminado exitosamente',
    });
  } catch (err) {
    console.error('Error al eliminar el tipo de pago:', err);
    res.status(500).send({
      success: false,
      message: 'Error al eliminar el tipo de pago',
    });
  }
};

export const get = (req: Request, res: Response) => {
  const { id_tipo_pago } = req.query;

  if (id_tipo_pago) getById(req, res);
  else getAll(req, res);
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id_tipo_pago } = req.query;

    const conn = await getDbConnection();

    const query = 'SELECT * FROM tipo_pago WHERE id_tipo_pago = @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_tipo_pago);

    const result = await request.query(query);

    const tipoPago = result.recordset[0];

    conn.close();

    if (!tipoPago)
      res.status(400).send({
        success: false,
        message: 'Error, tipo de pago no encontrado',
      });
    else
      res.send({
        success: true,
        tipoPago: tipoPago,
      });
  } catch (err) {
    console.error('Error al consultar el tipo de pago:', err);
    res.status(500).send({
      success: false,
      message: 'Error al consultar el tipo de pago',
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const conn = await getDbConnection();

    const query = 'SELECT * FROM tipo_pago';

    const request = new SQLRequest(conn);

    const result = await request.query(query);

    const tiposPago = result.recordset;

    conn.close();

    res.send({
      success: true,
      tiposPago: tiposPago,
    });
  } catch (err) {
    console.error('Error al consultar los tipos de pago:', err);
    res.status(500).send({
      success: false,
      message: 'Error al consultar los tipos de pago',
    });
  }
};

export const updateById = async (req: Request, res: Response) => {
  try {
    const { id_tipo_pago, descripcion } = req.body;

    const conn = await getDbConnection();

    const query =
      'UPDATE tipo_pago SET descripcion = @descripcion WHERE id_tipo_pago = @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_tipo_pago);
    request.input('descripcion', VarChar, descripcion);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Tipo de pago actualizado exitosamente',
    });
  } catch (err) {
    console.error('Error al actualizar el tipo de pago:', err);
    res.status(500).send({
      success: false,
      message: 'Error al actualizar el tipo de pago',
    });
  }
};
