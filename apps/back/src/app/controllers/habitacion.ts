import { Request, Response } from 'express';
import { Request as SQLRequest, Int } from 'mssql';
import { getDbConnection } from '../helpers/db';

export const create = async (req: Request, res: Response) => {
  try {
    const { numero, id_tipo_habitacion, id_status } = req.body;

    const conn = await getDbConnection();

    const query = `
      INSERT INTO habitacion (numero, id_tipo_habitacion, id_status)
      VALUES (@numero, @id_tipo_habitacion, @id_status)
    `;

    const request = new SQLRequest(conn);
    request.input('numero', Int, numero);
    request.input('id_tipo_habitacion', Int, id_tipo_habitacion);
    request.input('id_status', Int, id_status);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Habitación creada exitosamente',
    });
  } catch (err) {
    console.error('Error al crear la habitación:', err);
    res.status(500).send({
      success: false,
      message: 'Error al crear la habitación',
    });
  }
};

export const get = (req: Request, res: Response) => {
  const { id_habitacion } = req.query;

  if (id_habitacion) getById(req, res);
  else getAll(req, res);
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id_habitacion } = req.body;

    const conn = await getDbConnection();

    const query = `SELECT * FROM habitacion WHERE id_habitacion = @id`;

    const request = new SQLRequest(conn);
    request.input('id', Int, id_habitacion);

    const result = await request.query(query);

    conn.close();

    const habitacion = result.recordset[0];

    if (!habitacion)
      res.status(400).send({
        success: false,
        message: 'Error, habitación no encontrada',
      });
    else
      res.send({
        success: true,
        habitacion: habitacion,
      });
  } catch (err) {
    console.error('Error al obtener la habitación:', err);
    res.status(500).send({
      success: false,
      message: 'Error al obtener la habitación',
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const conn = await getDbConnection();

    const query = `SELECT * FROM habitacion`;

    const request = new SQLRequest(conn);

    const result = await request.query(query);

    conn.close();

    const habitaciones = result.recordset;

    res.send({
      success: true,
      roles: habitaciones,
    });
  } catch (err) {
    console.error('Error al obtener las habitaciones:', err);
    res.status(500).send({
      success: false,
      message: 'Error al obtener las habitaciones',
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id_habitacion } = req.body;

    const conn = await getDbConnection();

    const query = `DELETE FROM habitacion WHERE id_habitacion = @id`;

    const request = new SQLRequest(conn);
    request.input('id', Int, id_habitacion);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Habitación eliminada exitosamente',
    });
  } catch (err) {
    console.error('Error al eliminar la habitación:', err);
    res.status(500).send({
      success: false,
      message: 'Error al eliminar la habitación',
    });
  }
};

export const updateById = async (req: Request, res: Response) => {
  try {
    const { id_habitacion, numero, id_tipo_habitacion, id_status } = req.body;

    const conn = await getDbConnection();

    const query = `
      UPDATE habitacion
      SET numero = @numero, id_tipo_habitacion = @id_tipo_habitacion, id_status = @id_status
      WHERE id = @id
    `;

    const request = new SQLRequest(conn);
    request.input('id', Int, id_habitacion);
    request.input('numero', Int, numero);
    request.input('id_tipo_habitacion', Int, id_tipo_habitacion);
    request.input('id_status', Int, id_status);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Habitación actualizada exitosamente',
    });
  } catch (err) {
    console.error('Error al actualizar la habitación:', err);
    res.status(500).send({
      success: false,
      message: 'Error al actualizar la habitación',
    });
  }
};
