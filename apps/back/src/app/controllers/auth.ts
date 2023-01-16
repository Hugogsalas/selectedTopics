import { Request, Response } from 'express';
import { Request as SQLRequest, VarChar, Int } from 'mssql';
import { getDbConnection } from '../helpers/db';
import * as jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, clave } = req.body;

    const conn = await getDbConnection();

    const query = `
      SELECT id_usuario, nombre_usuario, email, nombre, apellido_paterno, apellido_materno, id_rol
      FROM usuario
      WHERE email = @email AND clave = @clave
    `;

    const request = new SQLRequest(conn);
    request.input('email', VarChar, email);
    request.input('clave', VarChar, clave);

    const result = await request.query(query);

    if (result.recordset.length > 0) {
      // El usuario existe y la contraseña es correcta
      const usuario = result.recordset[0];
      const token = jwt.sign(
        { id: usuario.id_usuario },
        process.env.JWT_SECRET
      );

      res.send({
        success: true,
        message: 'Inicio de sesión exitoso',
        token: token,
        usuario: {
          id: usuario.id_usuario,
          nombre_usuario: usuario.nombre_usuario,
          email: usuario.email,
          nombre: usuario.nombre,
          apellido_paterno: usuario.apellido_paterno,
          apellido_materno: usuario.apellido_materno,
          id_rol: usuario.id_rol,
        },
      });
    } else {
      // El usuario no existe o la contraseña es incorrecta
      res.status(401).send({
        success: false,
        message: 'Nombre de usuario o contraseña incorrectos',
      });
    }
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(500).send({
      success: false,
      message: 'Error al iniciar sesión',
    });
  }
};
