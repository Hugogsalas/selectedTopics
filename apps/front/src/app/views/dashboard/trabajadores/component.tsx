import { Trabajador } from "@eagles/definitions";
import { useEffect, useState } from "react";
import { deleteTrabajador, getTrabajadores } from "../../../services/trabajador";

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

  const addNewUser = async () => {
    // if (!description) return;

    // const addedRole = await addRole({ descripcion: description });

    // if (!addedRole) return;

    // await refreshWorkers();
  };

  const deleteOneWorker = async (id: number) => {
    const deletedWorker = await deleteTrabajador(id);

    if (!deletedWorker) return;

    await refreshWorkers();
  };

  const updateOneWorker = async (id: number) => {
    // if (!description) return;

    // const updatedRole = await updateRol({
    //   id_rol: id,
    //   descripcion: description,
    // });

    // if (!updatedRole) return;

    // await refreshWorkers();
  };
  return (
    <div className="roles-container">
      <div className="header">
        <div className="title">Trabajadores</div>
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
              <button
                className="button-update"
                onClick={() => updateOneWorker(worker.id_trabajador)}
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

export default Trabajadores;
