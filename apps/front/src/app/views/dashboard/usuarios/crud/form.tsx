import { rol } from '@eagles/definitions';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addUsuario,
  getUsuario,
  updateUsuario,
} from '../../../../services/usuarios';
import { getRoles } from '../../../../services/roles';
import './styles.scss';

const Form = () => {
  const [nombre_usuario, setNombreUsuario] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [clave, setClave] = useState<string>('');
  const [apellido_paterno, setApellidoPaterno] = useState<string>('');
  const [apellido_materno, setApellidoMaterno] = useState<string>('');
  const [nombre, setNombre] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [direccion, setDireccion] = useState<string>('');
  const [rfc, setRfc] = useState<string>('');
  const [id_rol, setIdRol] = useState<number>(0);
  const [roles, setRoles] = useState<rol[]>([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      const roles = await getRoles();
      setRoles(roles);
    };
    fetchRoles();
    if (!userId || userId === 'add') {
      return;
    } else {
      const fetchById = async () => {
        const userToModified = await getUsuario(userId);

        if (!userToModified) {
          navigate(-1);
          return;
        }

        setNombreUsuario(userToModified.nombre_usuario);
        setEmail(userToModified.email);
        setClave(userToModified.clave);
        setApellidoPaterno(userToModified.apellido_paterno);
        setApellidoMaterno(userToModified.apellido_materno);
        setNombre(userToModified.nombre);
        setTelefono(userToModified.telefono);
        setDireccion(userToModified.direccion);
        setRfc(userToModified.rfc);
        setIdRol(userToModified.id_rol);
      };
      fetchById();
    }
  }, [navigate, userId]);

  const addNewUser = async () => {
    if (!nombre_usuario || !email || !clave) return;

    const addedUser = await addUsuario({
      nombre_usuario,
      email,
      clave,
      apellido_paterno,
      apellido_materno,
      nombre,
      telefono,
      direccion,
      rfc,
      id_rol,
    });

    if (!addedUser) return;

    navigate(-1);
  };

  const updateOneUser = async () => {
    if (!userId) return;

    const updatedUser = await updateUsuario({
      id_usuario: parseInt(userId),
      nombre_usuario,
      email,
      clave,
      apellido_paterno,
      apellido_materno,
      nombre,
      telefono,
      direccion,
      rfc,
      id_rol,
    });

    if (!updatedUser) return;

    navigate(-1);
  };

  return (
    <div className="form-container">
      <div className="top-action">
        <label className="action-title">
          {userId === 'add' ? 'Nuevo usuario' : `Actualiza el usuario`}
        </label>
        <button
          onClick={userId === 'add' ? addNewUser : updateOneUser}
          className={userId === 'add' ? 'button-add' : 'button-update'}
        >
          {userId === 'add' ? 'Añadir' : 'Actualizar'}
        </button>
      </div>
      <div className="form-inputs">
        <label>Nombre de Usuario: </label>
        <input
          className="description-input"
          type="text"
          id="user-name"
          value={nombre_usuario}
          onChange={(event) => setNombreUsuario(event.target.value)}
        />
        <label>Correo Electrónico: </label>
        <input
          className="description-input"
          type="email"
          id="user-email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label>Clave: </label>
        <input
          className="description-input"
          type="text"
          id="user-password"
          value={clave}
          onChange={(event) => setClave(event.target.value)}
        />
        <label>Apellido Paterno: </label>
        <input
          className="description-input"
          type="text"
          id="user-paternal-surname"
          value={apellido_paterno}
          onChange={(event) => setApellidoPaterno(event.target.value)}
        />
        <label>Apellido Materno: </label>
        <input
          className="description-input"
          type="text"
          id="user-maternal-surname"
          value={apellido_materno}
          onChange={(event) => setApellidoMaterno(event.target.value)}
        />
        <label>Telefono: </label>
        <input
          className="description-input"
          type="text"
          id="user-telephone"
          value={telefono}
          onChange={(event) => setTelefono(event.target.value)}
        />
        <label>Dirección: </label>
        <input
          className="description-input"
          type="text"
          id="user-address"
          value={direccion}
          onChange={(event) => setDireccion(event.target.value)}
        />
        <label>RFC: </label>
        <input
          className="description-input"
          type="text"
          id="user-rfc"
          value={rfc}
          onChange={(event) => setRfc(event.target.value)}
        />
        <label>Rol: </label>
        <select
          className="role-select"
          value={id_rol}
          onChange={(event) => setIdRol(parseInt(event.target.value))}
        >
          {roles.map((role) => (
            <option key={role.id_rol} value={role.id_rol}>
              {role.descripcion}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Form;
