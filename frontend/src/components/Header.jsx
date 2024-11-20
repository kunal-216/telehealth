import { Heart, Clock, Shield, VideoIcon, MessageCircle } from 'lucide-react';

const Header = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="relative bg-blue-500 h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-30"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Your Health. Our Priority.
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Access professional healthcare services anytime, anywhere.
          </p>
        </div>
      </header>

      <section className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-800 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Comprehensive Healthcare at Your Fingertips</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <VideoIcon className="w-16 h-16 text-blue-600" />, 
              title: "Video Consultations", 
              description: "Connect with top doctors through secure video calls from the comfort of your home."
            },
            { 
              icon: <MessageCircle className="w-16 h-16 text-blue-600" />, 
              title: "Chat Consultations", 
              description: "Get quick medical advice through our secure messaging platform."
            },
            { 
              icon: <Clock className="w-16 h-16 text-blue-600" />, 
              title: "24/7 Support", 
              description: "Round-the-clock medical support whenever you need it most."
            }
          ].map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-blue-800 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Why Trust TeleHealth?</h2>
            <p className="text-xl text-gray-600">Committed to Your Well-being</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Shield className="w-16 h-16 text-blue-600" />, 
                title: "Secure & Confidential", 
                description: "Your medical information is protected with state-of-the-art encryption."
              },
              { 
                icon: <Heart className="w-16 h-16 text-blue-600" />, 
                title: "Compassionate Care", 
                description: "Empathetic healthcare professionals dedicated to your health journey."
              },
              { 
                icon: <Clock className="w-16 h-16 text-blue-600" />, 
                title: "Convenient Access", 
                description: "Quick, easy appointments without long waiting times."
              }
            ].map((trust, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">{trust.icon}</div>
                <h3 className="text-2xl font-semibold text-blue-800 mb-3">{trust.title}</h3>
                <p className="text-gray-600">{trust.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
        <p className="text-xl mb-6">Book your first consultation today and experience healthcare reimagined.</p>
        <a 
          href="/appointments" 
          className="px-8 py-4 bg-white text-blue-600 rounded-lg text-xl font-semibold hover:bg-gray-100 transition"
        >
          Book Appointment
        </a>
      </section>
    </div>
  );
};

export default Header;