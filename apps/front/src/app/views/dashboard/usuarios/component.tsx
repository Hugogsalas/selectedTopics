import { Usuario } from "@eagles/definitions";
import { useEffect, useState } from "react";
import { deleteUsuario, getUsuarios } from "../../../services/usuarios";

const Usuarios = () => {
  const [users, setUsers] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedRoles = await getUsuarios();

      setUsers(fetchedRoles);
    };

    fetchUsers();
  }, []);

  const refreshUsers = async () => {
    const updatedUsers = await getUsuarios();

    setUsers(updatedUsers);
  };

  const addNewUser = async () => {
    // if (!description) return;

    // const addedRole = await addRole({ descripcion: description });

    // if (!addedRole) return;

    // await refreshUsers();
  };

  const deleteOneUser = async (id: number) => {
    const deletedUser = await deleteUsuario(id);

    if (!deletedUser) return;

    await refreshUsers();
  };

  const updateOneUser = async (id: number) => {
    // if (!description) return;

    // const updatedRole = await updateRol({
    //   id_rol: id,
    //   descripcion: description,
    // });

    // if (!updatedRole) return;

    // await refreshUsers();
  };

  return (
    <div className="roles-container">
      <div className="header">
        <div className="title">Usuarios</div>
      </div>
      <div className="table">
        <div className="row">
          <div className="column">ID</div>
          <div className="column">Nombre de usuario</div>
          <div className="column">Nombre</div>
          <div className="column">Apellido Paterno</div>
          <div className="column">Apellido Materno</div>
          <div className="column">Correo</div>
          <div className="column">Telefono</div>
          <div className="column">Direccion</div>
          <div className="column">RFC</div>
          <div className="column">Rol</div>
          <div className="column">Acciones</div>
        </div>
        {users.map((user) => (
          <div key={`rol-row-${user.id_usuario}`} className="row">
            <div className="column">{user.id_usuario}</div>
            <div className="column">{user.nombre_usuario}</div>
            <div className="column">{user.nombre}</div>
            <div className="column">{user.apellido_paterno}</div>
            <div className="column">{user.apellido_materno}</div>
            <div className="column">{user.email}</div>
            <div className="column">{user.telefono}</div>
            <div className="column">{user.direccion}</div>
            <div className="column">{user.rfc}</div>
            <div className="column">{user.id_rol}</div>
            <div className="column">
              <button
                className="button-delete"
                onClick={() => deleteOneUser(user.id_usuario)}
              >
                Eliminar
              </button>
              <button
                className="button-update"
                onClick={() => updateOneUser(user.id_usuario)}
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

export default Usuarios;
