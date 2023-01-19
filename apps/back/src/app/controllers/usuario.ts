import { Request, Response } from 'express';
import { Request as SQLRequest, Int, VarChar } from 'mssql';
import { getDbConnection } from '../helpers/db';

export const create = async (req: Request, res: Response) => {
  try {
    const {
      nombre_usuario,
      email,
      clave,
      apellido_paterno,
      apellido_materno,
      nombre,
      telefono,
      direccion,
      rfc,
      id_rol,
    } = req.body;

    const conn = await getDbConnection();

    const query = `
      INSERT INTO usuario (nombre_usuario, email, clave, apellido_paterno, apellido_materno, nombre, telefono, direccion, rfc, id_rol)
      VALUES (@nombre_usuario, @email, @clave, @apellido_paterno, @apellido_materno, @nombre, @telefono, @direccion, @rfc, @id_rol)
    `;

    const request = new SQLRequest(conn);
    request.input('nombre_usuario', VarChar, nombre_usuario);
    request.input('email', VarChar, email);
    request.input('clave', VarChar, clave);
    request.input('apellido_paterno', VarChar, apellido_paterno);
    request.input('apellido_materno', VarChar, apellido_materno);
    request.input('nombre', VarChar, nombre);
    request.input('telefono', VarChar, telefono);
    request.input('direccion', VarChar, direccion);
    request.input('rfc', VarChar, rfc);
    request.input('id_rol', Int, id_rol);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Usuario creado exitosamente',
    });
  } catch (err) {
    console.error('Error al crear el usuario:', err);
    res.status(500).send({
      success: false,
      message: 'Error al crear el usuario',
    });
  }
};

export const get = (req: Request, res: Response) => {
  const { id_usuario } = req.query;

  if (id_usuario) getById(req, res);
  else getAll(req, res);
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const conn = await getDbConnection();

    const query = 'SELECT * FROM usuario';

    const request = new SQLRequest(conn);

    const result = await request.query(query);

    conn.close();

    res.send({
      success: true,
      usuarios: result.recordset,
    });
  } catch (err) {
    console.error('Error al obtener los usuarios:', err);
    res.status(500).send({
      success: false,
      message: 'Error al obtener los usuarios',
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id_usuario } = req.query;

    const conn = await getDbConnection();

    const query = 'SELECT * FROM usuario WHERE id_usuario = @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_usuario);

    const result = await request.query(query);

    conn.close();

    res.send({
      success: true,
      usuario: result.recordset[0],
    });
  } catch (err) {
    console.error('Error al obtener el usuario:', err);
    res.status(500).send({
      success: false,
      message: 'Error al obtener el usuario',
    });
  }
};

export const updateById = async (req: Request, res: Response) => {
  try {
    const {
      id_usuario,
      nombre_usuario,
      email,
      apellido_paterno,
      apellido_materno,
      nombre,
      telefono,
      direccion,
      rfc,
      id_rol,
    } = req.body;

    const conn = await getDbConnection();

    const query = `
      UPDATE usuario
      SET nombre_usuario = @nombre_usuario, email = @email, apellido_paterno = @apellido_paterno, apellido_materno = @apellido_materno, nombre = @nombre, telefono = @telefono, direccion = @direccion, rfc = @rfc, id_rol = @id_rol
      WHERE id_usuario = @id
    `;

    const request = new SQLRequest(conn);
    request.input('id', Int, id_usuario);
    request.input('nombre_usuario', VarChar, nombre_usuario);
    request.input('email', VarChar, email);
    request.input('apellido_paterno', VarChar, apellido_paterno);
    request.input('apellido_materno', VarChar, apellido_materno);
    request.input('nombre', VarChar, nombre);
    request.input('telefono', VarChar, telefono);
    request.input('direccion', VarChar, direccion);
    request.input('rfc', VarChar, rfc);
    request.input('id_rol', Int, id_rol);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Usuario actualizado exitosamente',
    });
  } catch (err) {
    console.error('Error al actualizar el usuario:', err);
    res.status(500).send({
      success: false,
      message: 'Error al actualizar el usuario',
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id_usuario } = req.body;

    const conn = await getDbConnection();

    const query = 'DELETE FROM usuario WHERE id_usuario = @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_usuario);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Usuario eliminado exitosamente',
    });
  } catch (err) {
    console.error('Error al eliminar el usuario:', err);
    res.status(500).send({
      success: false,
      message: 'Error al eliminar el usuario',
    });
  }
};
