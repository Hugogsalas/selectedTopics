import './app.module.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './views/login/component';
import Dashboard from './views/dashboard/component';
import Roles from './views/dashboard/roles/component';
import Usuarios from './views/dashboard/usuarios/component';
import Trabajadores from './views/dashboard/trabajadores/component';
import Habitaciones from './views/dashboard/habitaciones/component';
import Reservaciones from './views/dashboard/reservaciones/component';
import Pagos from './views/dashboard/pagos/component';
import Cargos from './views/dashboard/cargos/component';
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
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="trabajadores" element={<Trabajadores />} />
          <Route path="habitaciones" element={<Habitaciones />} />
          <Route path="reservaciones" element={<Reservaciones />} />
          <Route path="pagos" element={<Pagos />} />
          <Route path="cargos" element={<Cargos />} />
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
