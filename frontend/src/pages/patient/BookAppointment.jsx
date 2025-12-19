import { useState, useEffect } from "react";
import axios from "axios";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    summary: ""
  });
  const [bookingLoading, setBookingLoading] = useState(false);

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
    setShowBookingForm(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);

    try {
      const appointmentData = {
        doctorId: selectedDoctor._id,
        date: bookingData.date,
        time: bookingData.time,
        summary: bookingData.summary
      };

      const response = await axios.post("/api/appointments", appointmentData, {
        withCredentials: true
      });

      alert("Appointment booked successfully!");
      setShowBookingForm(false);
      setBookingData({ date: "", time: "", summary: "" });
      setSelectedDoctor(null);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert(error.response?.data?.message || "Failed to book appointment");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleCancelBooking = () => {
    setShowBookingForm(false);
    setSelectedDoctor(null);
    setBookingData({ date: "", time: "", summary: "" });
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
        <h2 className="text-2xl font-bold mb-2">Book an Appointment</h2>
        <p className="text-gray-600">
          Choose a doctor and schedule your appointment.
        </p>
      </div>

      {!showBookingForm ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {doctor.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Dr. {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-600">{doctor.specialization}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Experience:</span>
                  <span className="font-medium">{doctor.experience} years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Rating:</span>
                  <span className="font-medium">
                    {doctor.rating ? `${doctor.rating} ⭐` : "Not rated"}
                  </span>
                </div>
                {doctor.availability && (
                  <div className="text-sm">
                    <span className="text-gray-500">Available:</span>
                    <p className="font-medium">{doctor.availability}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleBookAppointment(doctor)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">
            Book Appointment with Dr. {selectedDoctor.name}
          </h3>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={bookingData.date}
                onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                required
                value={bookingData.time}
                onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Summary (Optional)
              </label>
              <textarea
                rows="3"
                placeholder="Brief description of your appointment reason..."
                value={bookingData.summary}
                onChange={(e) => setBookingData({...bookingData, summary: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={bookingLoading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {bookingLoading ? "Booking..." : "Confirm Booking"}
              </button>
              <button
                type="button"
                onClick={handleCancelBooking}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;