import { Reservacion } from '@eagles/definitions';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  deleteReservacion,
  getReservaciones,
} from '../../../services/reservacion';
import './styles.scss';

const Reservaciones = () => {
  const [reservations, setReservations] = useState<Reservacion[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const fetchedReservations = await getReservaciones();
      setReservations(fetchedReservations);
    };

    fetchReservations();
  }, []);

  const refreshReservations = async () => {
    const updatedReservations = await getReservaciones();

    setReservations(updatedReservations);
  };

  const deleteOneReservation = async (id: number) => {
    const deletedReservation = await deleteReservacion(id);

    if (!deletedReservation) return;

    await refreshReservations();
  };

  return (
    <div className="reservations-container">
      <div className="header">
        <div className="title">Reservaciones</div>
        <div>
          <Link to="/dashboard/reservaciones/form/add">
            <button className="button-add">Añadir</button>
          </Link>
        </div>
      </div>
      <div className="table">
        <div className="row">
          <div className="column">ID</div>
          <div className="column">ID Cliente</div>
          <div className="column">ID Habitacion</div>
          <div className="column">ID Trabajador</div>
          <div className="column">Fecha Inicio</div>
          <div className="column">Fecha Fin</div>
          <div className="column">Acciones</div>
        </div>
        {reservations.map((reservation) => (
          <div
            key={`reservation-row-${reservation.id_reservacion}`}
            className="row"
          >
            <div className="column">{reservation.id_reservacion}</div>
            <div className="column">{reservation.id_cliente}</div>
            <div className="column">{reservation.id_habitacion}</div>
            <div className="column">{reservation.id_trabajador}</div>
            <div className="column">{reservation.fecha_inicio}</div>
            <div className="column">{reservation.fecha_fin}</div>
            <div className="column">
              <button
                className="button-delete"
                onClick={() => deleteOneReservation(reservation.id_reservacion)}
              >
                Eliminar
              </button>
              <Link
                to={`/dashboard/reservaciones/form/${reservation.id_reservacion}`}
              >
                <button className="button-update">Actualizar</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservaciones;
