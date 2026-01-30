import { useQuery } from "@/hooks/use-local-convex";
import { localApi as api } from "@/lib/db";
import { Service } from "@/lib/types";

export default function ServicesPage() {
  const services = useQuery<Service[]>(api.events.getServices) || [];

  // Example services data
  const exampleServices = [
    {
      id: 1,
      title: "Event Planning",
      icon: "📋",
      description: "Comprehensive event planning from concept to execution. We handle every detail to ensure your event runs smoothly and exceeds expectations.",
      features: [
        "Initial consultation and concept development",
        "Timeline creation and management",
        "Vendor coordination and management",
        "Budget planning and tracking",
        "Day-of coordination",
        "Post-event follow-up"
      ]
    },
    {
      id: 2,
      title: "Venue Management",
      icon: "🏛️",
      description: "Expert venue selection and management services to find the perfect location for your event and handle all logistics.",
      features: [
        "Venue sourcing and selection",
        "Site visits and evaluations",
        "Contract negotiation",
        "Layout and floor plan design",
        "Setup and breakdown coordination",
        "Vendor access management"
      ]
    },
    {
      id: 3,
      title: "Decoration & Design",
      icon: "🎨",
      description: "Creative decoration and design services to transform your venue into a stunning space that reflects your vision and style.",
      features: [
        "Theme development and design",
        "Color scheme consultation",
        "Floral arrangements",
        "Lighting design",
        "Furniture and decor rental",
        "Custom signage and displays"
      ]
    },
    {
      id: 4,
      title: "Catering Coordination",
      icon: "🍽️",
      description: "Professional catering coordination to ensure your guests enjoy exceptional food and beverage service throughout your event.",
      features: [
        "Menu planning and selection",
        "Dietary restriction accommodation",
        "Vendor sourcing and management",
        "Service style coordination",
        "Bar service management",
        "Kitchen and service logistics"
      ]
    },
    {
      id: 5,
      title: "Photography & Videography",
      icon: "📸",
      description: "Capture every precious moment with our professional photography and videography coordination services.",
      features: [
        "Photographer/videographer sourcing",
        "Shot list development",
        "Timeline coordination",
        "Equipment and setup management",
        "Post-production coordination",
        "Delivery and sharing services"
      ]
    },
    {
      id: 6,
      title: "Entertainment",
      icon: "🎵",
      description: "Comprehensive entertainment coordination to keep your guests engaged and create memorable experiences.",
      features: [
        "DJ and band coordination",
        "Sound system management",
        "Lighting and AV setup",
        "Special performances",
        "Interactive entertainment",
        "Timeline and cue management"
      ]
    }
  ];

  const displayServices = services.length > 0 ? services : exampleServices;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 pt-[7rem] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            From initial planning to final execution, we provide comprehensive event services 
            to make your celebration perfect in every detail.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service) => (
              <div key={'id' in service ? service.id : service._id} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven process to ensure every event is executed flawlessly
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Consultation",
                description: "We start with a detailed consultation to understand your vision, requirements, and budget."
              },
              {
                step: "2", 
                title: "Planning",
                description: "Our team creates a comprehensive plan with timelines, vendor coordination, and logistics."
              },
              {
                step: "3",
                title: "Coordination",
                description: "We manage all vendors, handle logistics, and ensure everything is perfectly coordinated."
              },
              {
                step: "4",
                title: "Execution",
                description: "On event day, we oversee every detail to ensure flawless execution of your celebration."
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Services?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">Our experienced professionals bring creativity and expertise to every project</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Timely Execution</h3>
              <p className="text-gray-600">We pride ourselves on delivering events on time and within budget</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Service</h3>
              <p className="text-gray-600">Every event is customized to reflect your unique style and preferences</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Planning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let our expert team help you create an unforgettable event that exceeds your expectations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </a>
            <a
              href="/events"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors"
            >
              View Our Events
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
