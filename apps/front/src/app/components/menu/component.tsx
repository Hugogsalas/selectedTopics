import { Link } from 'react-router-dom';
import './styles.scss';

const SideMenu = () => {
  return (
    <nav className="menu-container">
      <ul className="links-container">
        <li>
          <Link to="/dashboard/roles">Roles</Link>
        </li>
        <li>
          <Link to="/dashboard/usuarios">Usuarios</Link>
        </li>
        <li>
          <Link to="/dashboard/trabajadores">Trabajadores</Link>
        </li>
        <li>
          <Link to="/dashboard/tipos-de-habitaciones">
            Tipos de habitaciones
          </Link>
        </li>
        <li>
          <Link to="/dashboard/estatus-de-habitaciones">
            Estatus de habitaciones
          </Link>
        </li>
        <li>
          <Link to="/dashboard/habitaciones">Habitaciones</Link>
        </li>
        <li>
          <Link to="/dashboard/reservaciones">Reservaciones</Link>
        </li>
        <li>
          <Link to="/dashboard/tipos-de-pagos">Tipos de pagos</Link>
        </li>
        <li>
          <Link to="/dashboard/pagos">Pagos</Link>
        </li>
        <li>
          <Link to="/dashboard/cargos">Cargos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideMenu;
