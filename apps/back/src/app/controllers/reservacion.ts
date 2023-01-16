import { Request, Response } from 'express';
import { Request as SQLRequest, Int, DateTime } from 'mssql';
import { getDbConnection } from '../helpers/db';

export const create = async (req: Request, res: Response) => {
  try {
    const { id_cliente, id_habitacion, fecha_inicio, fecha_fin } = req.body;
    const conn = await getDbConnection();

    const query = `
  INSERT INTO reservacion (id_cliente, id_habitacion, fecha_inicio, fecha_fin)
  VALUES (@id_cliente, @id_habitacion, @fecha_inicio, @fecha_fin)
`;

    const request = new SQLRequest(conn);
    request.input('id_cliente', Int, id_cliente);
    request.input('id_habitacion', Int, id_habitacion);
    request.input('fecha_inicio', DateTime, fecha_inicio);
    request.input('fecha_fin', DateTime, fecha_fin);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Reservación creada exitosamente',
    });
  } catch (err) {
    console.error('Error al crear la reservación:', err);
    res.status(500).send({
      success: false,
      message: 'Error al crear la reservación',
    });
  }
};

export const get = (req: Request, res: Response) => {
  const { id_reservacion } = req.query;

  if (id_reservacion) getById(req, res);
  else getAll(req, res);
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id_reservacion } = req.body;
    const conn = await getDbConnection();

    const query = `SELECT * FROM reservacion WHERE id_reservacion = @id`;

    const request = new SQLRequest(conn);
    request.input('id', Int, id_reservacion);

    const result = await request.query(query);

    conn.close();

    const reservacion = result.recordset[0];

    if (!reservacion)
      res.status(400).send({
        success: false,
        message: 'Error, reservación no encontrada',
      });
    else
      res.send({
        success: true,
        reservacion: reservacion,
      });
  } catch (err) {
    console.error('Error al obtener la reservación:', err);
    res.status(500).send({
      success: false,
      message: 'Error al obtener la reservación',
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const conn = await getDbConnection();
    const query = `SELECT * FROM reservacion`;

    const request = new SQLRequest(conn);

    const result = await request.query(query);

    conn.close();

    const reservaciones = result.recordset;

    res.send({
      success: true,
      reservaciones: reservaciones,
    });
  } catch (err) {
    console.error('Error al obtener las reservaciones:', err);
    res.status(500).send({
      success: false,
      message: 'Error al obtener las reservaciones',
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id_reservacion } = req.body;

    const conn = await getDbConnection();

    const query = `DELETE FROM reservacion WHERE id_reservacion = @id_reservacion`;

    const request = new SQLRequest(conn);
    request.input('id_reservacion', Int, id_reservacion);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Reservación eliminada exitosamente',
    });
  } catch (err) {
    console.error('Error al eliminar la reservación:', err);
    res.status(500).send({
      success: false,
      message: 'Error al eliminar la reservación',
    });
  }
};

export const updateById = async (req: Request, res: Response) => {
  try {
    const {
      id_reservacion,
      id_cliente,
      id_habitacion,
      fecha_inicio,
      fecha_fin,
    } = req.body;

    const conn = await getDbConnection();

    const query = `
    UPDATE reservacion
    SET id_cliente = @id_cliente, id_habitacion = @id_habitacion, fecha_inicio = @fecha_inicio, fecha_fin = @fecha_fin
    WHERE id_reservacion = @id_reservacion
  `;

    const request = new SQLRequest(conn);
    request.input('id_reservacion', Int, id_reservacion);
    request.input('id_cliente', Int, id_cliente);
    request.input('id_habitacion', Int, id_habitacion);
    request.input('fecha_inicio', DateTime, fecha_inicio);
    request.input('fecha_fin', DateTime, fecha_fin);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Reservación actualizada exitosamente',
    });
  } catch (err) {
    console.error('Error al actualizar la reservación:', err);
    res.status(500).send({
      success: false,
      message: 'Error al actualizar la reservación',
    });
  }
};
