import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Logo from './components/UI/atoms/Logo/Logo';
import LoginPage from './components/UI/organisms/LoginPage/LoginPage';
import ClientsPage from './components/UI/organisms/ClientsPage/ClientsPage';
import RegisterPage from './components/UI/organisms/RegisterPage/RegisterPage';
import AdminRegisterPage from './components/UI/organisms/AdminRegisterPage/AdminRegisterPage';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <div>
      <Logo />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/clients" /> : <LoginPage />}
        />
        <Route
          path="/admin-register"
          element={
            isAuthenticated ? <Navigate to="/" /> : <AdminRegisterPage />
          }
        />
        <Route
          path="/clients"
          element={isAuthenticated ? <ClientsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <RegisterPage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
