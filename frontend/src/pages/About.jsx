import { Heart, Users, Globe, Shield } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">About TeleHealth</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Revolutionizing healthcare delivery through innovative digital solutions
        </p>
      </header>

      <section className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-blue-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              At TeleHealth, we are committed to making quality healthcare accessible, convenient, and patient-centered. Our mission is to bridge the gap between patients and healthcare providers through cutting-edge telehealth technology.
            </p>
            <p className="text-lg text-gray-700">
              We believe that everyone deserves timely, compassionate medical care, regardless of their location or circumstances.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: <Heart className="w-16 h-16 text-blue-600" />, title: "Compassionate Care" },
              { icon: <Users className="w-16 h-16 text-blue-600" />, title: "Patient-First Approach" },
              { icon: <Globe className="w-16 h-16 text-blue-600" />, title: "Global Accessibility" },
              { icon: <Shield className="w-16 h-16 text-blue-600" />, title: "Secure Consultations" }
            ].map((item, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg text-center hover:shadow-md transition">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-semibold text-blue-800">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-blue-800 mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Sarah Thompson", role: "Chief Medical Officer", img: "/api/placeholder/300/300" },
              { name: "Michael Chen", role: "Technology Director", img: "/api/placeholder/300/300" },
              { name: "Emily Rodriguez", role: "Patient Experience Lead", img: "/api/placeholder/300/300" }
            ].map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-blue-800">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;