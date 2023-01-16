import { Request, Response } from 'express';
import { Request as SQLRequest, VarChar, Money, Int, Date } from 'mssql';
import { getDbConnection } from '../helpers/db';

export const create = async (req: Request, res: Response) => {
  try {
    const { id_reservacion, descripcion, monto, fecha, id_pago } = req.body;

    const conn = await getDbConnection();

    const query = `
      INSERT INTO cargo (id_reservacion, descripcion, monto, fecha, id_pago)
      VALUES (@id_reservacion, @descripcion, @monto, @fecha, @id_pago)
    `;

    const request = new SQLRequest(conn);
    request.input('id_reservacion', Int, id_reservacion);
    request.input('descripcion', VarChar, descripcion);
    request.input('monto', Money, monto);
    request.input('fecha', Date, fecha);
    request.input('id_pago', Int, id_pago);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Cargo creado exitosamente',
    });
  } catch (err) {
    console.error('Error al crear el cargo:', err);
    res.status(500).send({
      success: false,
      message: 'Error al crear el cargo',
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id_cargo } = req.body;

    const conn = await getDbConnection();

    const query = 'DELETE FROM cargo WHERE id_cargo = @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_cargo);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Cargo eliminado exitosamente',
    });
  } catch (err) {
    console.error('Error al eliminar el cargo:', err);
    res.status(500).send({
      success: false,
      message: 'Error al eliminar el cargo',
    });
  }
};

export const get = (req: Request, res: Response) => {
  const { id_cargo } = req.query;

  if (id_cargo) getById(req, res);
  else getAll(req, res);
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id_cargo } = req.query;

    const conn = await getDbConnection();

    const query = 'SELECT * FROM cargo WHERE id_cargo = @id';

    const request = new SQLRequest(conn);
    request.input('id', Int, id_cargo);

    const result = await request.query(query);

    const cargo = result.recordset[0];

    conn.close();

    if (!cargo) {
      res.status(400).send({
        success: false,
        message: 'Error, cargo no encontrado',
      });
    } else {
      res.send({
        success: true,
        cargo: cargo,
      });
    }
  } catch (err) {
    console.error('Error al consultar el cargo:', err);
    res.status(500).send({
      success: false,
      message: 'Error al consultar el cargo',
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const conn = await getDbConnection();

    const query = 'SELECT * FROM cargo';

    const request = new SQLRequest(conn);

    const result = await request.query(query);

    const cargos = result.recordset;

    conn.close();

    res.send({
      success: true,
      cargos: cargos,
    });
  } catch (err) {
    console.error('Error al consultar los cargos:', err);
    res.status(500).send({
      success: false,
      message: 'Error al consultar los cargos',
    });
  }
};

export const updateById = async (req: Request, res: Response) => {
  try {
    const { id_cargo, id_reservacion, descripcion, monto, fecha, id_pago } =
      req.body;

    const conn = await getDbConnection();

    const query = `
      UPDATE cargo
      SET id_reservacion = @id_reservacion, descripcion = @descripcion, monto = @monto, fecha = @fecha, id_pago = @id_pago
      WHERE id_cargo = @id
    `;

    const request = new SQLRequest(conn);
    request.input('id', Int, id_cargo);
    request.input('id_reservacion', Int, id_reservacion);
    request.input('descripcion', VarChar, descripcion);
    request.input('monto', Money, monto);
    request.input('fecha', Date, fecha);
    request.input('id_pago', Int, id_pago);

    await request.query(query);

    conn.close();

    res.send({
      success: true,
      message: 'Cargo actualizado exitosamente',
    });
  } catch (err) {
    console.error('Error al actualizar el cargo:', err);
    res.status(500).send({
      success: false,
      message: 'Error al actualizar el cargo',
    });
  }
};
