import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/menu/component';
import './styles.scss';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <SideMenu />
      <Outlet />
    </div>
  );
};

export default Dashboard;
