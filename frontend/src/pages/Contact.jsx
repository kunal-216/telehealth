import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl max-w-2xl mx-auto">
          We are here to help. Reach out to us with any questions or concerns.
        </p>
      </header>

      <div className="container mx-auto py-16 px-4 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Contact Information</h2>
          <div className="space-y-6">
            {[
              { 
                icon: <Mail className="w-8 h-8 text-blue-600" />, 
                title: "Email", 
                detail: "support@telehealth.com" 
              },
              { 
                icon: <Phone className="w-8 h-8 text-blue-600" />, 
                title: "Phone", 
                detail: "(555) 123-4567" 
              },
              { 
                icon: <MapPin className="w-8 h-8 text-blue-600" />, 
                title: "Address", 
                detail: "123 Healthcare Way, Digital City, Tech State 12345" 
              }
            ].map((contact, index) => (
              <div key={index} className="flex items-center space-x-4">
                {contact.icon}
                <div>
                  <h3 className="font-semibold text-blue-800">{contact.title}</h3>
                  <p className="text-gray-600">{contact.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;