import { Request, Response } from 'express';
import { Request as SQLRequest, Int, VarChar, Money } from 'mssql';
import { getDbConnection } from '../helpers/db';

export const create = async (req: Request, res: Response) => {
  try {
    const { capacidad, descripcion, precio } = req.body;

    const conn = await getDbConnection();

    const query = `
      INSERT INTO tipo_habitacion (capacidad, descripcion, precio)
      VALUES (@capacidad, @descripcion, @precio)
    `;

    const request = new SQLRequest(conn);
    request.input('capacidad', Int, capacidad);
    request.input('descripcion', VarChar, descripcion);
    request.input('precio', Int, precio);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Tipo de habitación creado exitosamente',
    });
  } catch (err) {
    console.error('Error al crear el tipo de habitación:', err);
    res.status(500).send({
      success: false,
      message: 'Error al crear el tipo de habitación',
    });
  }
};

export const get = (req: Request, res: Response) => {
  const { id_tipo_habitacion } = req.query;

  if (id_tipo_habitacion) getById(req, res);
  else getAll(req, res);
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id_tipo_habitacion } = req.params;

    const conn = await getDbConnection();

    const query = `
      SELECT id_tipo_habitacion, capacidad, descripcion, precio
      FROM tipo_habitacion
      WHERE id_tipo_habitacion = @id
    `;

    const request = new SQLRequest(conn);
    request.input('id', Int, id_tipo_habitacion);

    const result = await request.query(query);

    conn.close();

    if (result.recordset.length === 0) {
      res.status(404).send({
        success: false,
        message: 'Tipo de habitación no encontrado',
      });
      return;
    }

    res.send({
      success: true,
      tipoHabitacion: result.recordset[0],
    });
  } catch (err) {
    console.error('Error al obtener el tipo de habitación:', err);
    res.status(500).send({
      success: false,
      message: 'Error al obtener el tipo de habitación',
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const conn = await getDbConnection();

    const query = `
      SELECT id_tipo_habitacion, capacidad, descripcion, precio
      FROM tipo_habitacion
    `;

    const request = new SQLRequest(conn);

    const result = await request.query(query);

    conn.close();

    res.send({
      success: true,
      tiposHabitacion: result.recordset,
    });
  } catch (err) {
    console.error('Error al obtener los tipos de habitación:', err);
    res.status(500).send({
      success: false,
      message: 'Error al obtener los tipos de habitación',
    });
  }
};

export const updateById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { capacidad, descripcion, precio } = req.body;

    const conn = await getDbConnection();

    const query = `
      UPDATE tipo_habitacion
      SET capacidad = @capacidad, descripcion = @descripcion, precio = @precio
      WHERE id_tipo_habitacion = @id
    `;

    const request = new SQLRequest(conn);
    request.input('id', Int, id);
    request.input('capacidad', Int, capacidad);
    request.input('descripcion', descripcion);
    request.input('precio', Money, precio);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Tipo de habitación actualizado exitosamente',
    });
  } catch (err) {
    console.error('Error al actualizar el tipo de habitación:', err);
    res.status(500).send({
      success: false,
      message: 'Error al actualizar el tipo de habitación',
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id_tipo_habitacion } = req.params;

    const conn = await getDbConnection();

    const query = `
      DELETE FROM tipo_habitacion
      WHERE id_tipo_habitacion = @id
    `;

    const request = new SQLRequest(conn);
    request.input('id', Int, id_tipo_habitacion);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Tipo de habitación eliminado exitosamente',
    });
  } catch (err) {
    console.error('Error al eliminar el tipo de habitación:', err);
    res.status(500).send({
      success: false,
      message: 'Error al eliminar el tipo de habitación',
    });
  }
};
