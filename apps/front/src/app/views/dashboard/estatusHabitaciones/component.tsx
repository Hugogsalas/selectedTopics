import { estatusHabitacion } from '@eagles/definitions';
import { useEffect, useState } from 'react';
import { getEstatusHabitaciones } from '../../../services/estatusHabitaciones';
import './styles.scss';

const EstatusHabitaciones = () => {
  const [estatus, setEstatus] = useState<estatusHabitacion[]>([]);

  useEffect(() => {
    const fetchEstatus = async () => {
      const fetchedEstatus = await getEstatusHabitaciones();

      setEstatus(fetchedEstatus);
    };

    fetchEstatus();
  }, []);

  return (
    <div className="estatus-container">
      <div className="header">
        <div className="title">Estatus</div>
        <button className="button-add">Añadir</button>
      </div>
      <div className="table">
        <div className="row">
          <div className="column">ID</div>
          <div className="column">Descripción</div>
          <div className="column">Acciones</div>
        </div>
        {estatus.map((estatus) => (
          <div key={`estatus-row-${estatus.id_status}`} className="row">
            <div className="column">{estatus.id_status}</div>
            <div className="column">{estatus.descripcion}</div>
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

export default EstatusHabitaciones;
