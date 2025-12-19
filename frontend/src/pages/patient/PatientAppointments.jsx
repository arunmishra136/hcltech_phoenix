import { useState, useEffect } from "react";
import axios from "axios";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("/api/appointments/patient");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const now = new Date();

  const upcomingAppointments = appointments.filter(apt => {
    const aptDate = new Date(`${apt.date} ${apt.time || '00:00'}`);
    return aptDate > now;
  });

  const pastAppointments = appointments.filter(apt => {
    const aptDate = new Date(`${apt.date} ${apt.time || '00:00'}`);
    return aptDate <= now;
  });

  const currentAppointments = activeTab === "upcoming" ? upcomingAppointments : pastAppointments;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">My Appointments</h2>
        <p className="text-gray-600">
          View and manage your upcoming and past appointments.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "upcoming"
              ? "bg-white text-blue-600 shadow"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Upcoming ({upcomingAppointments.length})
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "past"
              ? "bg-white text-blue-600 shadow"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Past ({pastAppointments.length})
        </button>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="p-6 text-center">
            <p>Loading appointments...</p>
          </div>
        ) : currentAppointments.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {currentAppointments.map((apt) => (
              <div key={apt._id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            Dr
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Dr. {apt.doctorId?.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {apt.doctorId?.specialization}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Date</p>
                        <p className="text-sm text-gray-900">{apt.date}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Time</p>
                        <p className="text-sm text-gray-900">{apt.time}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Confirmed
                        </span>
                      </div>
                    </div>

                    {apt.summary && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-500">Appointment Summary</p>
                        <p className="text-sm text-gray-900">{apt.summary}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">
              No {activeTab} appointments found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAppointments;
