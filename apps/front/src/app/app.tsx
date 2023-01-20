import './app.module.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './views/login/component';
import Dashboard from './views/dashboard/component';
import Roles from './views/dashboard/roles/component';
import RolesForm from './views/dashboard/roles/crud/form';
import Usuarios from './views/dashboard/usuarios/component';
import UsuariosForm from './views/dashboard/usuarios/crud/form';
import Trabajadores from './views/dashboard/trabajadores/component';
import TrabajadoresForm from './views/dashboard/trabajadores/crud/form';
import Habitaciones from './views/dashboard/habitaciones/component';
import Reservaciones from './views/dashboard/reservaciones/component';
import ReservacionesForm from './views/dashboard/reservaciones/crud/form';
import Pagos from './views/dashboard/pagos/component';
import Cargos from './views/dashboard/cargos/component';
import CargosForm from './views/dashboard/cargos/crud/form'
import TiposHabitaciones from './views/dashboard/tiposHabitaciones/component';
import EstatusHabitaciones from './views/dashboard/estatusHabitaciones/component';
import TiposPagos from './views/dashboard/tiposPagos/component';
import PrivateRoute from './components/privateRoute/component';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="roles" element={<Roles />} />
          <Route path="roles/form/:roleId" element={<RolesForm />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="usuarios/form/:userId" element={<UsuariosForm />} />
          <Route path="trabajadores" element={<Trabajadores />} />
          <Route
            path="trabajadores/form/:trabajadorId"
            element={<TrabajadoresForm />}
          />
          <Route path="habitaciones" element={<Habitaciones />} />
          <Route path="reservaciones" element={<Reservaciones />} />
          <Route
            path="reservaciones/form/:reservacionId"
            element={<ReservacionesForm />}
          />
          <Route path="pagos" element={<Pagos />} />
          <Route path="cargos" element={<Cargos />} />
          <Route path="cargos/form/:cargoId" element={<CargosForm />} />
          <Route path="tipos-de-habitaciones" element={<TiposHabitaciones />} />
          <Route
            path="estatus-de-habitaciones"
            element={<EstatusHabitaciones />}
          />
          <Route path="tipos-de-pagos" element={<TiposPagos />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;
