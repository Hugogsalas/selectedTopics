import { tipoHabitacion } from '@eagles/definitions';
import { useEffect, useState } from 'react';
import { getTiposHabitaciones } from '../../../services/tiposHabitaciones';
import './styles.scss';

const TiposHabitaciones = () => {
  const [tipos, setTipos] = useState<tipoHabitacion[]>([]);
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [capacity, setCapacity] = useState<number>(0);

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
      <div className="form-tipo">
        <div className="input-descripcion">
          <label className="tipo-habitacion-label" htmlFor="password">
            Descripcion:
          </label>
          <br />
          <input
            className="tipo-habitaciones-input"
            type="text"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="input-precio">
          <label className="tipo-habitacion-label" htmlFor="password">
            Precio:
          </label>
          <br />
          <input
            className="tipo-habitaciones-input"
            type="number"
            id="price"
            value={price}
            onChange={(event) => setPrice(parseInt(event.target.value))}
          />
        </div>
        <div className="input-capacidad">
          <label className="tipo-habitacion-label" htmlFor="password">
            Capacidad:
          </label>
          <br />
          <input
            className="tipo-habitaciones-input"
            type="number"
            id="capacity"
            value={capacity}
            onChange={(event) => setCapacity(parseInt(event.target.value))}
          />
        </div>
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
