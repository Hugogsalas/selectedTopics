import { Request, Response } from 'express';
import { Request as SQLRequest, Int, Money } from 'mssql';
import { getDbConnection } from '../helpers/db';

export const create = async (req: Request, res: Response) => {
  try {
    const { id_usuario, salario } = req.body;

    const conn = await getDbConnection();

    const query = `
    INSERT INTO trabajador (id_usuario, salario)
    VALUES (@id_usuario, @salario)
  `;

    const request = new SQLRequest(conn);
    request.input('id_usuario', Int, id_usuario);
    request.input('salario', Int, salario);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Trabajador creado exitosamente',
    });
  } catch (err) {
    console.error('Error al crear el trabajador:', err);
    res.status(500).send({
      success: false,
      message: 'Error al crear el trabajador',
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id_trabajador } = req.body;

    const conn = await getDbConnection();

    const query = 'DELETE FROM trabajador WHERE id_trabajador = @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_trabajador);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Trabajador eliminado exitosamente',
    });
  } catch (err) {
    console.error('Error al eliminar el trabajador:', err);
    res.status(500).send({
      success: false,
      message: 'Error al eliminar el trabajador',
    });
  }
};

export const get = (req: Request, res: Response) => {
  const { id_trabajador } = req.query;

  if (id_trabajador) getById(req, res);
  else getAll(req, res);
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id_trabajador } = req.query;

    const conn = await getDbConnection();

    const query =
      'SELECT id_trabajador,salario,usuario.* FROM trabajador INNER JOIN usuario ON usuario.id_usuario=trabajador.id_usuario WHERE id_trabajador = @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_trabajador);

    const result = await request.query(query);

    const trabajador = result.recordset[0];

    conn.close();

    if (!trabajador)
      res.status(400).send({
        success: false,
        message: 'Error, trabajador no encontrado',
      });
    else
      res.send({
        success: true,
        trabajador: trabajador,
      });
  } catch (err) {
    console.error('Error al consultar el trabajador', err);
    res.status(500).send({
      success: false,
      message: 'Error al consultar el trabajador',
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const conn = await getDbConnection();

    const query =
      'SELECT id_trabajador,salario,usuario.* FROM trabajador INNER JOIN usuario ON usuario.id_usuario=trabajador.id_usuario';

    const request = new SQLRequest(conn);

    const result = await request.query(query);

    const trabajadores = result.recordset;

    conn.close();

    res.send({
      success: true,
      trabajadores: trabajadores,
    });
  } catch (err) {
    console.error('Error al consultar los trabajadores:', err);
    res.status(500).send({
      success: false,
      message: 'Error al consultar los trabajadores',
    });
  }
};

export const updateById = async (req: Request, res: Response) => {
  try {
    const { id_trabajador, salario } = req.body;

    const conn = await getDbConnection();

    const query =
      'UPDATE trabajador SET salario = @salario WHERE id_trabajador = @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_trabajador);
    request.input('salario', Money, salario);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Trabajador actualizado exitosamente',
    });
  } catch (err) {
    console.error('Error al actualizar el trabajador:', err);
    res.status(500).send({
      success: false,
      message: 'Error al actualizar el trabajador',
    });
  }
};
