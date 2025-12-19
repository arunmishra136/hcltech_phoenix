import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";

import DoctorLayout from "./layouts/DoctorLayout";
import DoctorHome from "./pages/doctor/DoctorHome";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import PatientLayout from "./layouts/PatientLayout";
import PatientHome from "./pages/patient/PatientHome";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientAppointments from "./pages/patient/PatientAppointments";
import PatientProfile from "./pages/patient/PatientProfile";
import BookAppointment from "./pages/patient/BookAppointment";
import DoctorsList from "./pages/patient/DoctorsList";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <div className="flex min-h-screen">
            <Navbar />
            <main className="flex-1 bg-slate-50 p-6">
              <Home />
            </main>
          </div>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <div className="flex min-h-screen">
              <Navbar />
              <main className="flex-1 bg-slate-50 p-6">
                <Login />
              </main>
            </div>
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <div className="flex min-h-screen">
              <Navbar />
              <main className="flex-1 bg-slate-50 p-6">
                <Register />
              </main>
            </div>
          </PublicRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <div className="flex min-h-screen">
            <Navbar />
            <main className="flex-1 bg-slate-50 p-6">
              <Contact />
            </main>
          </div>
        }
      />

      {/* Doctor routes */}
      <Route path="/doctor" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <DoctorLayout />
        </ProtectedRoute>
      }>
        <Route path="home" element={<DoctorHome />} />
        <Route path="profile" element={<DoctorProfile />} />
        <Route path="appointments" element={<DoctorAppointments />} />
      </Route>

      {/* Patient routes */}
      <Route path="/patient" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <PatientLayout />
        </ProtectedRoute>
      }>
        <Route path="home" element={<PatientHome />} />
        <Route path="dashboard" element={<PatientDashboard />} />
        <Route path="doctors" element={<DoctorsList />} />
        <Route path="book-appointment" element={<BookAppointment />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="profile" element={<PatientProfile />} />
      </Route>

    </Routes>
  );
}

export default App;