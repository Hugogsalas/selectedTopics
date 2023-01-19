import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addRole, getRole, updateRol } from '../../../../services/roles';
import './styles.scss';

const Form = () => {
  const [description, setDescription] = useState<string>('');
  const { roleId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roleId || roleId === 'add') {
      return;
    } else {
      const fetchById = async () => {
        const rolToModified = await getRole(roleId);

        if (!rolToModified) {
          navigate(-1);
          return;
        }

        setDescription(rolToModified.descripcion);
      };
      fetchById();
    }
  }, [navigate, roleId]);

  const addNewRole = async () => {
    if (!description) return;

    const addedRole = await addRole({ descripcion: description });

    if (!addedRole) return;

    navigate(-1);
  };

  const updateOneRole = async () => {
    if (!description || !roleId) return;

    const updatedRole = await updateRol({
      id_rol: parseInt(roleId),
      descripcion: description,
    });

    if (!updatedRole) return;

    navigate(-1);
  };

  return (
    <div className="form-container">
      <div className="top-action">
        <label className="action-title">
          {roleId === 'add' ? 'Nuevo rol' : `Actualiza el rol`}
        </label>
        <button
          onClick={roleId === 'add' ? addNewRole : updateOneRole}
          className={roleId === 'add' ? 'button-add' : 'button-update'}
        >
          {roleId === 'add' ? 'Añadir' : 'Actualizar'}
        </button>
      </div>
      <div className="form-inputs">
        <label>Descripcion: </label>
        <input
          className="description-input"
          type="text"
          id="role-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
    </div>
  );
};

export default Form;
