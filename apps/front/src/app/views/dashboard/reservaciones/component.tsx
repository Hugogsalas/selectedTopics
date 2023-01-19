import { useEffect, useState } from "react";
import { getDate } from "../../../utils/dateUtils";

const Reservaciones = () => {
  const [reversals, setreReversals] = useState<Reservacion[]>([]);

  useEffect(() => {
    const fetchReversals = async () => {
      const fetchedReversals = await getReservacion();

      setreReversals(fetchedReversals);
    };

    fetchReversals();
  }, []);

  const refreshReversal = async () => {
    const updatedReversals = await getReservacion();

    setreReversals(updatedReversals);
  };

  const addNewReversal = async () => {
    // if (!description) return;

    // const addedRole = await addRole({ descripcion: description });

    // if (!addedRole) return;

    // await refreshReversal();
  };

  const deleteOneReversal = async (id: number) => {
    const deletedReversal = await deleteReservacion(id);

    if (!deletedReversal) return;

    await refreshReversal();
  };

  const updateOneReversal = async (id: number) => {
    // if (!description) return;

    // const updatedRole = await updateRol({
    //   id_rol: id,
    //   descripcion: description,
    // });

    // if (!updatedRole) return;

    // await refreshReversal();
  };

  return (
    <div className="roles-container">
      <div className="header">
        <div className="title">Reservaciones</div>
      </div>
      <div className="table">
        <div className="row">
          <div className="column">ID</div>
          <div className="column">Cliente</div>
          <div className="column">Habitacion</div>
          <div className="column">Fecha Inicio</div>
          <div className="column">Fecha Fin</div>
        </div>
        {reversals.map((room) => (
          <div key={`rol-row-${room.id_reservacion}`} className="row">
            <div className="column">{room.id_reservacion}</div>
            <div className="column">{room.id_cliente}</div>
            <div className="column">{room.id_habitacion}</div>
            <div className="column">{getDate(room.fecha_inicio)}</div>
            <div className="column">{getDate(room.fecha_fin)}</div>
            <div className="column">
              <button
                className="button-delete"
                onClick={() => deleteOneReversal(room.id_reservacion)}
              >
                Eliminar
              </button>
              <button
                className="button-update"
                onClick={() => updateOneReversal(room.id_reservacion)}
              >
                Actualizar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservaciones;
