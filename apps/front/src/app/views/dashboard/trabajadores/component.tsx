import { Trabajador } from '@eagles/definitions';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  deleteTrabajador,
  getTrabajadores,
} from '../../../services/trabajador';

const Trabajadores = () => {
  const [workers, setWorkers] = useState<Trabajador[]>([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      const fetchedWorkers = await getTrabajadores();
      setWorkers(fetchedWorkers);
    };

    fetchWorkers();
  }, []);

  const refreshWorkers = async () => {
    const updatedWorkers = await getTrabajadores();

    setWorkers(updatedWorkers);
  };

  const deleteOneWorker = async (id: number) => {
    const deletedWorker = await deleteTrabajador(id);

    if (!deletedWorker) return;

    await refreshWorkers();
  };

  return (
    <div className="roles-container">
      <div className="header">
        <div className="title">Trabajadores</div>
        <div>
          <Link to="/dashboard/trabajadores/form/add">
            <button className="button-add">Añadir</button>
          </Link>
        </div>
      </div>
      <div className="table">
        <div className="row">
          <div className="column">ID</div>
          <div className="column">ID Usuario</div>
          <div className="column">Salario</div>
          <div className="column">Acciones</div>
        </div>
        {workers.map((worker) => (
          <div key={`rol-row-${worker.id_trabajador}`} className="row">
            <div className="column">{worker.id_trabajador}</div>
            <div className="column">{worker.id_usuario}</div>
            <div className="column">{worker.salario}</div>
            <div className="column">
              <button
                className="button-delete"
                onClick={() => deleteOneWorker(worker.id_trabajador)}
              >
                Eliminar
              </button>
              <Link to={`/dashboard/trabajadores/form/${worker.id_trabajador}`}>
                <button className="button-update">Actualizar</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trabajadores;
