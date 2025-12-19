import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PatientNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">

      {/* Logo */}
      <Link to="/patient/home" className="text-2xl font-bold text-blue-600 mb-10 block">
        HealthCare+
      </Link>

      {/* Menu */}
      <nav className="flex flex-col gap-4 text-gray-700 font-medium">
        <Link to="/patient/home" className="hover:text-blue-600">
          Home
        </Link>

        <Link to="/patient/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>

        <Link to="/patient/book-appointment" className="hover:text-blue-600">
          Book Appointment
        </Link>

        <Link to="/patient/doctors" className="hover:text-blue-600">
          Find Doctors
        </Link>

        <Link to="/patient/appointments" className="hover:text-blue-600">
          My Appointments
        </Link>

        <Link to="/patient/profile" className="hover:text-blue-600">
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600 mt-6 text-left"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default PatientNavbar;
