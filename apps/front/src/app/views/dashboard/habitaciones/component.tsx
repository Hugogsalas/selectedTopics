import { Habitacion } from "@eagles/definitions";
import { useEffect, useState } from "react";
import { deleteHabitacion, getHabitaciones } from "../../../services/habitacion";

const Habitaciones = () => {
  const [rooms, setRooms] = useState<Habitacion[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const fetchedRooms = await getHabitaciones();

      setRooms(fetchedRooms);
    };

    fetchRooms();
  }, []);

  const refreshRooms = async () => {
    const updatedRooms = await getHabitaciones();

    setRooms(updatedRooms);
  };

  const addNewRoom = async () => {
    // if (!description) return;

    // const addedRole = await addRole({ descripcion: description });

    // if (!addedRole) return;

    // await refreshRooms();
  };

  const deleteOneRoom = async (id: number) => {
    const deletedRoom = await deleteHabitacion(id);

    if (!deletedRoom) return;

    await refreshRooms();
  };

  const updateOneRoom = async (id: number) => {
    // if (!description) return;

    // const updatedRole = await updateRol({
    //   id_rol: id,
    //   descripcion: description,
    // });

    // if (!updatedRole) return;

    // await refreshRooms();
  };
  return (
    <div className="roles-container">
      <div className="header">
        <div className="title">Habitaciones</div>
      </div>
      <div className="table">
        <div className="row">
          <div className="column">ID</div>
          <div className="column">Numero</div>
          <div className="column">Tipo de Habitacion</div>
          <div className="column">Status</div>
          <div className="column">Acciones</div>
        </div>
        {rooms.map((room) => (
          <div key={`rol-row-${room.id_habitacion}`} className="row">
            <div className="column">{room.id_habitacion}</div>
            <div className="column">{room.numero}</div>
            <div className="column">{room.id_tipo_habitacion}</div>
            <div className="column">{room.id_status}</div>
            <div className="column">
              <button
                className="button-delete"
                onClick={() => deleteOneRoom(room.id_habitacion)}
              >
                Eliminar
              </button>
              <button
                className="button-update"
                onClick={() => updateOneRoom(room.id_habitacion)}
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

export default Habitaciones;
