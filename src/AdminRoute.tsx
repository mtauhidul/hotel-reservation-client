import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const token = sessionStorage.getItem('token');
  return token ? true : false;
};

const AdminRoute = () => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to='/auth' />;
};

export default AdminRoute;
