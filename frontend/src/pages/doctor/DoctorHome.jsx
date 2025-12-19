import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const DoctorHome = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/api/appointments/doctor");
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingAppointments = appointments.filter(apt => {
    const aptDate = new Date(`${apt.date} ${apt.time}`);
    return aptDate > new Date();
  }).slice(0, 5); // Show next 5 appointments

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Welcome Dr. {user?.name}</h2>
        <p className="text-gray-600">
          Overview of your patients and upcoming appointments.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Appointments</h3>
          <p className="text-3xl font-bold text-blue-600">{appointments.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Upcoming Today</h3>
          <p className="text-3xl font-bold text-green-600">
            {appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Specialization</h3>
          <p className="text-lg font-semibold text-purple-600">{user?.specialization}</p>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
        {loading ? (
          <p>Loading appointments...</p>
        ) : upcomingAppointments.length > 0 ? (
          <div className="space-y-3">
            {upcomingAppointments.map((apt) => (
              <div key={apt._id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-semibold">{apt.patientId?.name}</p>
                  <p className="text-sm text-gray-600">{apt.date} at {apt.time}</p>
                  {apt.summary && <p className="text-sm text-gray-500">{apt.summary}</p>}
                </div>
                <span className="text-sm text-blue-600">Confirmed</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No upcoming appointments</p>
        )}
      </div>
    </div>
  );
};

export default DoctorHome;
