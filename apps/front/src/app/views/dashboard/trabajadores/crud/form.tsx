import { Usuario } from '@eagles/definitions';
import { getUsuarios } from 'apps/front/src/app/services/usuarios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addTrabajador,
  getTrabajador,
  updateTrabajador,
} from '../../../../services/trabajador';
import './styles.scss';

const Form = () => {
  const [salario, setSalario] = useState<number>(0);
  const [id_usuario, setIdUsuario] = useState<number>(0);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const { trabajadorId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsuarios();
      setUsuarios(fetchedUsers);
    };
    fetchUsers();

    if (!trabajadorId || trabajadorId === 'add') {
      return;
    } else {
      const fetchById = async () => {
        const workerToModified = await getTrabajador(trabajadorId);

        if (!workerToModified) {
          navigate(-1);
          return;
        }

        setSalario(workerToModified.salario);
        setIdUsuario(workerToModified.id_usuario);
      };
      fetchById();
    }
  }, [navigate, trabajadorId]);

  const addNewTrabajador = async () => {
    if (!salario || !id_usuario) return;
    const addedTrabajador = await addTrabajador({ salario, id_usuario });
    if (!addedTrabajador) return;
    navigate(-1);
  };

  const updateOneTrabajador = async () => {
    if (!salario || !id_usuario || !trabajadorId) return;
    const updatedTrabajador = await updateTrabajador({
      id_trabajador: parseInt(trabajadorId),
      salario,
      id_usuario,
    });
    if (!updatedTrabajador) return;
    navigate(-1);
  };

  return (
    <div className="form-container">
      <div className="top-action">
        <label className="action-title">
          {trabajadorId === 'add'
            ? 'Nuevo trabajador'
            : `Actualiza el trabajador`}
        </label>
        <button
          onClick={
            trabajadorId === 'add' ? addNewTrabajador : updateOneTrabajador
          }
          className={trabajadorId === 'add' ? 'button-add' : 'button-update'}
        >
          {trabajadorId === 'add' ? 'Añadir' : 'Actualizar'}
        </button>
      </div>
      <div className="form-inputs">
        <label>Salario: </label>
        <input
          className="salary-input"
          type="number"
          id="worker-salary"
          value={salario}
          onChange={(event) => setSalario(parseFloat(event.target.value))}
        />
        <label>Usuario: </label>
        <select
          className="worker-select"
          value={id_usuario}
          onChange={(event) => setIdUsuario(parseInt(event.target.value))}
        >
          {usuarios.map((usuario) => (
            <option key={usuario.id_usuario} value={usuario.id_usuario}>
              {usuario.nombre_usuario}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Form;
