import { rol } from '@eagles/definitions';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteRole, getRoles } from '../../../services/roles';
import './styles.scss';

const Roles = () => {
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

  const deleteOneRole = async (id: number) => {
    const deletedRole = await deleteRole(id);

    if (!deletedRole) return;

    await refreshRoles();
  };

  return (
    <div className="roles-container">
      <div className="header">
        <div className="title">Roles</div>
        <div>
          <Link to="/dashboard/roles/form/add">
            <button className="button-add">Añadir</button>
          </Link>
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
              <Link to={`/dashboard/roles/form/${rol.id_rol}`}>
                <button className="button-update">Actualizar</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roles;
