import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const DoctorNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">

      {/* Logo */}
      <Link to="/doctor/home" className="text-2xl font-bold text-blue-600 mb-10 block">
        HealthCare+
      </Link>

      {/* Menu */}
      <nav className="flex flex-col gap-4 text-gray-700 font-medium">
        <Link to="/doctor/home" className="hover:text-blue-600">
          Home
        </Link>

        <Link to="/doctor/profile" className="hover:text-blue-600">
          Profile
        </Link>

        <Link to="/doctor/appointments" className="hover:text-blue-600">
          Patient Appointments
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

export default DoctorNavbar;
