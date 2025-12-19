const Home = () => {
  return (
    <div className="space-y-8">

      {/* Page Heading */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Your Health, Our Priority
        </h2>
        <p className="text-gray-600 mt-1">
          Trusted healthcare information and wellness guidance
        </p>
      </div>

      {/* Info + Image Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* Text */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Why HealthCare+?
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            HealthCare+ helps patients track wellness goals, manage
            appointments, and stay informed with reliable health guidance.
            Doctors can monitor patient compliance and set personalized goals.
          </p>

          <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
            <li>Secure patient–doctor interaction</li>
            <li>Wellness goal tracking</li>
            <li>Appointment management</li>
            <li>Privacy-focused healthcare platform</li>
          </ul>
        </div>

        {/* Image
        <div className="flex justify-center">
          <img
            src="https://www.shutterstock.com/search/healthcare"
            alt="Healthcare"
            className="rounded-lg shadow-md w-full max-w-md"
          />
        </div> */}
      </div>

      {/* Latest Health Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-3">
          Latest Health Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">
              Nutrition
            </h4>
            <p>
              Eat a balanced diet rich in fruits, vegetables, and whole grains
              to boost immunity and energy levels.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-1">
              Physical Activity
            </h4>
            <p>
              At least 30 minutes of daily physical activity helps reduce stress
              and improves heart health.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-1">
              Mental Wellness
            </h4>
            <p>
              Adequate sleep and mindfulness practices improve focus and mental
              well-being.
            </p>
          </div>
        </div>
      </div>

      {/* Preventive Care */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-3">
          Preventive Care Recommendations
        </h3>
        <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
          <li>Regular health checkups</li>
          <li>Maintain a fixed sleep schedule</li>
          <li>Stay hydrated throughout the day</li>
          <li>Manage stress through exercise and relaxation</li>
        </ul>
      </div>

    </div>
  );
};

export default Home;
