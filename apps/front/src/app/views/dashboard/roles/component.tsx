import { rol } from '@eagles/definitions';
import { useEffect, useState } from 'react';
import {
  addRole,
  deleteRole,
  getRoles,
  updateRol,
} from '../../../services/roles';
import './styles.scss';

const Roles = () => {
  const [description, setDescription] = useState<string>('');
  const [roles, setRoles] = useState<rol[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const fetchedRoles = await getRoles();

      setRoles(fetchedRoles);
    };

    fetchRoles();
  }, []);

  const refreshRoles = async () => {
    const updatedRoles = await getRoles();

    setRoles(updatedRoles);
  };

  const addNewRole = async () => {
    if (!description) return;

    const addedRole = await addRole({ descripcion: description });

    if (!addedRole) return;

    await refreshRoles();
  };

  const deleteOneRole = async (id: number) => {
    const deletedRole = await deleteRole(id);

    if (!deletedRole) return;

    await refreshRoles();
  };

  const updateOneRole = async (id: number) => {
    if (!description) return;

    const updatedRole = await updateRol({
      id_rol: id,
      descripcion: description,
    });

    if (!updatedRole) return;

    await refreshRoles();
  };

  return (
    <div className="roles-container">
      <div className="header">
        <div className="title">Roles</div>
        <div>
          <input
            className="description-input"
            type="text"
            id="Email"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button className="button-add" onClick={addNewRole}>
            Añadir
          </button>
        </div>
      </div>
      <div className="table">
        <div className="row">
          <div className="column">ID</div>
          <div className="column">Descripción</div>
          <div className="column">Acciones</div>
        </div>
        {roles.map((rol) => (
          <div key={`rol-row-${rol.id_rol}`} className="row">
            <div className="column">{rol.id_rol}</div>
            <div className="column">{rol.descripcion}</div>
            <div className="column">
              <button
                className="button-delete"
                onClick={() => deleteOneRole(rol.id_rol)}
              >
                Eliminar
              </button>
              <button
                className="button-update"
                onClick={() => updateOneRole(rol.id_rol)}
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

export default Roles;
