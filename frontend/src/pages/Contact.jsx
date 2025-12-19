const Contact = () => {
  return (
    <div className="space-y-10">

      {/* Heading */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Contact Us
        </h2>
        <p className="text-gray-600 mt-1">
          We’re here to help you with your healthcare needs
        </p>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Get in Touch
          </h3>

          <p className="text-sm text-gray-600">
            If you have any questions regarding appointments, wellness tracking,
            or platform usage, feel free to reach out to us.
          </p>

          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>Email:</strong> support@healthcareplus.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> Healthcare+ HQ, India</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Send Us a Message
          </h3>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};

export default Contact;
