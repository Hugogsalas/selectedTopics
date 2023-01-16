import { Request, Response } from 'express';
import { Request as SQLRequest, VarChar, Int } from 'mssql';
import { getDbConnection } from '../helpers/db';

export const create = async (req: Request, res: Response) => {
  try {
    const { descripcion } = req.body;

    const conn = await getDbConnection();

    const query = `
    INSERT INTO estatus_habitacion (descripcion)
    VALUES (@descripcion)
  `;

    const request = new SQLRequest(conn);
    request.input('descripcion', VarChar, descripcion);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Estatus de habitación creado exitosamente',
    });
  } catch (err) {
    console.error('Error al crear el estatus de habitación:', err);
    res.status(500).send({
      success: false,
      message: 'Error al crear el estatus de habitación',
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id_status } = req.body;

    const conn = await getDbConnection();

    const query = 'DELETE FROM estatus_habitacion WHERE id_status= @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_status);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Estatus de habitación eliminado exitosamente',
    });
  } catch (err) {
    console.error('Error al crear el estatus de habitación:', err);
    res.status(500).send({
      success: false,
      message: 'Error al eliminar el estatus de habitación',
    });
  }
};

export const get = (req: Request, res: Response) => {
  const { id_status } = req.query;

  if (id_status) getById(req, res);
  else getAll(req, res);
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id_status } = req.query;

    const conn = await getDbConnection();

    const query = 'SELECT * FROM estatus_habitacion WHERE id_status= @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_status);

    const result = await request.query(query);

    const estatus_de_habitacion = result.recordset[0];

    conn.close();

    if (!estatus_de_habitacion)
      res.status(400).send({
        success: false,
        message: 'Error, estatus de habitación no encontrado',
      });
    else
      res.send({
        success: true,
        estatus_de_habitacion: estatus_de_habitacion,
      });
  } catch (err) {
    console.error('Error al consultar el estatus de habitación:', err);
    res.status(500).send({
      success: false,
      message: 'Error al consultar el estatus de habitación',
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const conn = await getDbConnection();

    const query = 'SELECT * FROM estatus_habitacion';

    const request = new SQLRequest(conn);

    const result = await request.query(query);

    const estatus_habitacion = result.recordset;

    conn.close();

    res.send({
      success: true,
      estatus_habitacion: estatus_habitacion,
    });
  } catch (err) {
    console.error('Error al consultar los estatus de habitaciones:', err);
    res.status(500).send({
      success: false,
      message: 'Error al consultar los estatus de habitaciones',
    });
  }
};

export const updateById = async (req: Request, res: Response) => {
  try {
    const { id_status, descripcion } = req.body;

    const conn = await getDbConnection();

    const query =
      'UPDATE estatus_habitacion SET descripcion = @descripcion WHERE id_status= @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_status);
    request.input('descripcion', VarChar, descripcion);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Estatus de habitación actualizado exitosamente',
    });
  } catch (err) {
    console.error('Error al actualizar el estatus de habitación:', err);
    res.status(500).send({
      success: false,
      message: 'Error al actualizar el estatus de habitación',
    });
  }
};
