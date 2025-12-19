import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">

      {/* Main Heading (Clickable Home) */}
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600 block mb-10"
      >
        HealthCare+
      </Link>

      {/* Menu */}
      <nav className="flex flex-col gap-4 text-gray-700 font-medium">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>

        {user ? (
          <>
            {user.role === 'doctor' ? (
              <>
                <Link to="/doctor/home" className="hover:text-blue-600">
                  Doctor Dashboard
                </Link>
                <Link to="/doctor/appointments" className="hover:text-blue-600">
                  Appointments
                </Link>
                <Link to="/doctor/profile" className="hover:text-blue-600">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/patient/home" className="hover:text-blue-600">
                  Patient Dashboard
                </Link>
                <Link to="/patient/appointments" className="hover:text-blue-600">
                  Appointments
                </Link>
                <Link to="/patient/profile" className="hover:text-blue-600">
                  Profile
                </Link>
              </>
            )}
            <button
              onClick={handleLogout}
              className="text-left hover:text-blue-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-600">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-600">
              Register
            </Link>
          </>
        )}

        <Link to="/contact" className="hover:text-blue-600">
          Contact
        </Link>
      </nav>
    </aside>
  );
};

export default Navbar;