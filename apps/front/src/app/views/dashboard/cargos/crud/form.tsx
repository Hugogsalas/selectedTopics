import { Reservacion } from '@eagles/definitions';
import { getReservaciones } from '../../../../services/reservacion';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { addCargo, getCargo, updateCargo } from '../../../../services/cargo';

export default function Form() {
  const {cargoId} = useParams();
  const navigate = useNavigate();

  const [reservations, setReservations] = useState<Reservacion[]>([])
  const [reservationId, setReservationId] = useState<number>(0)
  const [description, setDescription] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)

  useEffect(() => {
    const fetchReservations = async () => {
      const fetchedReservations = await getReservaciones();
      setReservations(fetchedReservations);
    };

    fetchReservations();
    if (!cargoId || cargoId === 'add') {
      return;
    } else {
      const fetchById = async () => {
        const chargeToModify = await getCargo(cargoId);
        if (!chargeToModify) {
          navigate(-1);
          return;
        }

        setAmount(chargeToModify.monto)
        setDate(''+chargeToModify.fecha)
        setDescription(chargeToModify.descripcion)
        setReservationId(chargeToModify.id_reservacion)
      }
      fetchById()
    }
  }, [cargoId, navigate])

  const addNewCharge = async () => {
    if (!reservationId || !description || !date || !amount) return;

    const addedCharge = await addCargo({
      id_reservacion: reservationId,
      descripcion: description,
      fecha: new Date(date),
      monto: amount,
    });

    if (!addedCharge) return;

    navigate(-1);
  }

  const updateOneCharge = async () => {
    if (!cargoId) return;

    const updatedCharge = await updateCargo({
      id_cargo: Number(cargoId),
      descripcion: description,
      fecha: new Date(date),
      monto: amount,
      id_reservacion: reservationId
    });

    if (!updatedCharge) return;

    navigate(-1);
  }

  return (
    <div className="form-container">
      <div className="top-action">
        <label className="action-title">
          {cargoId === 'add' ? 'Nuevo cargo' : `Actualiza el cargo`}
        </label>
        <button
          onClick={cargoId === 'add' ? addNewCharge : updateOneCharge}
          className={cargoId === 'add' ? 'button-add' : 'button-update'}
        >
          {cargoId === 'add' ? 'Añadir' : 'Actualizar'}
        </button>
      </div>
      <div className="form-inputs">
        <label>Descripcion: </label>
        <input
          className="description-input"
          type="text"
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <label>Reservacion: </label>
        <select
          className="role-select"
          value={reservationId}
          onChange={(event) => setReservationId(parseInt(event.target.value))}
        >
          {reservations.map((reservation) => (
            <option key={reservation.id_reservacion} value={reservation.id_reservacion}>
              {`Reservacion - ${reservation.id_habitacion}`}
            </option>
          ))}
        </select>
        <label>Monto: </label>
        <input
          className="amount-input"
          type="number"
          id="amount"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <label>Fecha: </label>
        <input
          className="date-input"
          type='date'
          id="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
    </div>

  )
}
