import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoutes';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import Notification from './pages/Notification';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import Profile from './pages/doctor/Profile';
import Booking from './pages/Booking';
import Appointments from './pages/Appointments';
import DoctorAppointments from "./pages/doctor/DoctorAppointments";

function App() {
  const { loading } = useSelector((state) => state.alerts)
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />) : (
          <Routes>
            <Route path='/' element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path='/apply-doctor' element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            } />
            <Route path='/register' element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            <Route path='/login' element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path='/admin/users' element={
              <ProtectedRoute>
                < Users />
              </ProtectedRoute>
            } />
            <Route path='/admin/doctors' element={
              <ProtectedRoute>
                < Doctors />
              </ProtectedRoute>
            } />
            <Route path='/doctor/profile/:id' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path='/doctor/book-appointment/:doctorId' element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            } />
            <Route path='/appointments' element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            } />
            <Route path='/doctor-appointments' element={
              <ProtectedRoute>
                <DoctorAppointments />
              </ProtectedRoute>
            } />
            <Route path='/notification' element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            } />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
