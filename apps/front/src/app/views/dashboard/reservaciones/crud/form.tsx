import { Habitacion, Trabajador, Usuario } from '@eagles/definitions';
import { getUsuarios } from '../../../../services/usuarios';
import { getHabitaciones } from '../../../../services/habitacion';
import { getTrabajadores } from '../../../../services/trabajador';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addReservacion,
  getReservacion,
  updateReservacion,
} from '../../../../services/reservacion';
import './styles.scss';

const Form = () => {
  const [fecha_inicio, setFechaInicio] = useState<string>('');
  const [fecha_fin, setFechaFin] = useState<string>('');
  const [id_cliente, setIdCliente] = useState<number>(0);
  const [id_habitacion, setIdHabitacion] = useState<number>(0);
  const [id_trabajador, setIdTrabajador] = useState<number>(0);
  const [clientes, setClientes] = useState<Usuario[]>([]);
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
  const { reservacionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      const fetchedClients = await getUsuarios();
      setClientes(fetchedClients);
    };
    fetchClients();

    const fetchRooms = async () => {
      const fetchedRooms = await getHabitaciones();
      setHabitaciones(fetchedRooms);
    };
    fetchRooms();

    const fetchWorkers = async () => {
      const fetchedWorkers = await getTrabajadores();
      setTrabajadores(fetchedWorkers);
    };
    fetchWorkers();

    if (!reservacionId || reservacionId === 'add') {
      return;
    } else {
      const fetchById = async () => {
        const reservationToModified = await getReservacion(reservacionId);

        if (!reservationToModified) {
          navigate(-1);
          return;
        }

        setFechaInicio(reservationToModified.fecha_inicio);
        setFechaFin(reservationToModified.fecha_fin);
        setIdCliente(reservationToModified.id_cliente);
        setIdHabitacion(reservationToModified.id_habitacion);
        setIdTrabajador(reservationToModified.id_trabajador);
      };
      fetchById();
    }
  }, [navigate, reservacionId]);
  console.log(fecha_inicio);

  const addNewReservacion = async () => {
    if (
      !fecha_inicio ||
      !fecha_fin ||
      !id_cliente ||
      !id_habitacion ||
      !id_trabajador
    )
      return;
    const addedReservacion = await addReservacion({
      fecha_inicio,
      fecha_fin,
      id_cliente,
      id_habitacion,
      id_trabajador,
    });
    if (!addedReservacion) return;
    navigate(-1);
  };

  const updateOneReservacion = async () => {
    if (
      !fecha_inicio ||
      !fecha_fin ||
      !id_cliente ||
      !id_habitacion ||
      !id_trabajador ||
      !reservacionId
    )
      return;
    const updatedReservacion = await updateReservacion({
      id_reservacion: parseInt(reservacionId),
      fecha_inicio,
      fecha_fin,
      id_cliente,
      id_habitacion,
      id_trabajador,
    });
    if (!updatedReservacion) return;
    navigate(-1);
  };

  return (
    <div className="form-container">
      <div className="top-action">
        <label className="action-title">
          {reservacionId === 'add'
            ? 'Nueva Reservacion'
            : 'Actualiza la Reservacion'}
        </label>
        <button
          onClick={
            reservacionId === 'add' ? addNewReservacion : updateOneReservacion
          }
          className={reservacionId === 'add' ? 'button-add' : 'button-update'}
        >
          {reservacionId === 'add' ? 'Añadir' : 'Actualizar'}
        </button>
      </div>
      <div className="form-inputs">
        <label>Fecha Inicio: </label>
        <input
          className="date-input"
          type="date"
          id="reservation-start-date"
          value={fecha_inicio}
          onChange={(event) => setFechaInicio(event.target.value)}
        />
        <label>Fecha Fin: </label>
        <input
          className="date-input"
          type="date"
          id="reservation-end-date"
          value={fecha_fin}
          onChange={(event) => setFechaFin(event.target.value)}
        />
        <label>Cliente: </label>
        <select
          className="client-select"
          value={id_cliente}
          onChange={(event) => setIdCliente(parseInt(event.target.value))}
        >
          {clientes.map((cliente) => (
            <option key={cliente.id_usuario} value={cliente.id_usuario}>
              {cliente.nombre_usuario}
            </option>
          ))}
        </select>
        <label>Habitacion: </label>
        <select
          className="room-select"
          value={id_habitacion}
          onChange={(event) => setIdHabitacion(parseInt(event.target.value))}
        >
          {habitaciones.map((habitacion) => (
            <option
              key={habitacion.id_habitacion}
              value={habitacion.id_habitacion}
            >
              {habitacion.numero}
            </option>
          ))}
        </select>
        <label>Trabajador: </label>
        <select
          className="worker-select"
          value={id_trabajador}
          onChange={(event) => setIdTrabajador(parseInt(event.target.value))}
        >
          {trabajadores.map((trabajador) => (
            <option
              key={trabajador.id_trabajador}
              value={trabajador.id_trabajador}
            >
              {(trabajador as Trabajador & Usuario).nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Form;
