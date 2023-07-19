import { Outlet, Route, Routes } from 'react-router-dom';
import App from './App';
import { useAuth } from './hooks/useAuth';
import { ErrorPage } from './pages/error';

const PrivateRoute = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <div>Loading....</div>;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<App />} />
      </Route>
      <Route element={<ErrorPage />} />
    </Routes>
  );
};
