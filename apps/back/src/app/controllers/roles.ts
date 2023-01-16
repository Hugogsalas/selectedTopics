import { Request, Response } from 'express';
import { Request as SQLRequest, VarChar, Int } from 'mssql';
import { getDbConnection } from '../helpers/db';

export const create = async (req: Request, res: Response) => {
  try {
    const { descripcion } = req.body;

    const conn = await getDbConnection();

    const query = `
    INSERT INTO roles (descripcion)
    VALUES (@descripcion)
  `;

    const request = new SQLRequest(conn);
    request.input('descripcion', VarChar, descripcion);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Rol creado exitosamente',
    });
  } catch (err) {
    console.error('Error al crear el rol:', err);
    res.status(500).send({
      success: false,
      message: 'Error al crear el rol',
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id_rol } = req.body;

    const conn = await getDbConnection();

    const query = 'DELETE FROM roles WHERE id_rol = @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_rol);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Rol eliminado exitosamente',
    });
  } catch (err) {
    console.error('Error al crear el rol:', err);
    res.status(500).send({
      success: false,
      message: 'Error al eliminar el rol',
    });
  }
};

export const get = (req: Request, res: Response) => {
  const { id_rol } = req.query;

  if (id_rol) getById(req, res);
  else getAll(req, res);
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id_rol } = req.query;

    const conn = await getDbConnection();

    const query = 'SELECT * FROM roles WHERE id_rol = @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_rol);

    const result = await request.query(query);

    const role = result.recordset[0];

    conn.close();

    if (!role)
      res.status(400).send({
        success: false,
        message: 'Error, rol no encontrado',
      });
    else
      res.send({
        success: true,
        role: role,
      });
  } catch (err) {
    console.error('Error al consultar el rol:', err);
    res.status(500).send({
      success: false,
      message: 'Error al consultar el rol',
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const conn = await getDbConnection();

    const query = 'SELECT * FROM roles';

    const request = new SQLRequest(conn);

    const result = await request.query(query);

    const roles = result.recordset;

    conn.close();

    res.send({
      success: true,
      roles: roles,
    });
  } catch (err) {
    console.error('Error al consultar los roles:', err);
    res.status(500).send({
      success: false,
      message: 'Error al consultar los roles',
    });
  }
};

export const updateById = async (req: Request, res: Response) => {
  try {
    const { id_rol, descripcion } = req.body;

    const conn = await getDbConnection();

    const query =
      'UPDATE roles SET descripcion = @descripcion WHERE id_rol = @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_rol);
    request.input('descripcion', VarChar, descripcion);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Rol actualizado exitosamente',
    });
  } catch (err) {
    console.error('Error al actualizar el rol:', err);
    res.status(500).send({
      success: false,
      message: 'Error al actualizar el rol',
    });
  }
};
