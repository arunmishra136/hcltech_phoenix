import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const DoctorsList = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("/api/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    // Navigate to booking page with selected doctor
    // For now, we'll just show an alert
    alert(`Booking appointment with Dr. ${doctor.name}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading doctors...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Available Doctors</h2>
        <p className="text-gray-600">
          Find and book appointments with our qualified healthcare professionals.
        </p>
      </div>

      {doctors.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No doctors available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {doctor.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Dr. {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {doctor.specialization || "General Medicine"}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {doctor.email}
                </p>
                {doctor.experience && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Experience:</span> {doctor.experience} years
                  </p>
                )}
                {doctor.qualifications && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Qualifications:</span> {doctor.qualifications}
                  </p>
                )}
              </div>

              {user?.role === 'patient' && (
                <button
                  onClick={() => handleBookAppointment(doctor)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book Appointment
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;