import { tipoHabitacion } from '@eagles/definitions';
import { useEffect, useState } from 'react';
import { getTiposHabitaciones } from '../../../services/tiposHabitaciones';
import './styles.scss';

const TiposHabitaciones = () => {
  const [tipos, setTipos] = useState<tipoHabitacion[]>([]);
  useEffect(() => {
    const fetchTiposHabitaciones = async () => {
      const fetchedTiposHabitaciones = await getTiposHabitaciones();

      setTipos(fetchedTiposHabitaciones);
    };

    fetchTiposHabitaciones();
  }, []);

  return (
    <div className="tipos-container">
      <div className="header">
        <div className="title">Tipos de Habitaciones</div>
        <button className="button-add">Añadir</button>
      </div>
      <div className="table">
        <div className="row">
          <div className="column">ID</div>
          <div className="column">Descripción</div>
          <div className="column">Precio</div>
          <div className="column">Capacidad</div>
          <div className="column">Acciones</div>
        </div>
        {tipos.map((tipoHabitacion) => (
          <div
            key={`tipoHabitacion-row-${tipoHabitacion.id_tipo_habitacion}`}
            className="row"
          >
            <div className="column">{tipoHabitacion.id_tipo_habitacion}</div>
            <div className="column">{tipoHabitacion.descripcion}</div>
            <div className="column">{tipoHabitacion.precio}</div>
            <div className="column">{tipoHabitacion.capacidad}</div>
            <div className="column">
              <button className="button-delete">Eliminar</button>
              <button className="button-update">Actualizar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TiposHabitaciones;
