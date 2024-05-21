import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './resources/global.css';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import PublicRoute from './components/publicRoute';
import ProtectedRoute from './components/protectedRoute';
import Loader from './components/loader';
import { useSelector } from 'react-redux';
import AdminHome from './pages/admin/AdminHome';
import AdminBuses from './pages/admin/AdminBuses';
import AdminUsers from './pages/admin/adminusers';
import BookNow from './pages/booknow';
import Booking from './pages/booking';

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/book-now/:id"
            element={
              <ProtectedRoute>
                <BookNow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/buses"
            element={
              <ProtectedRoute>
                <AdminBuses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
