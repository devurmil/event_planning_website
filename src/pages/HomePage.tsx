import { useQuery } from "convex/react";
import { Link } from "react-router-dom";
import { api } from "../../convex/_generated/api";

export default function HomePage() {
  const featuredEvents = useQuery(api.events.getFeaturedEvents) || [];
  const testimonials = useQuery(api.events.getTestimonials) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            We Plan. You Celebrate.
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Creating unforgettable moments with precision, creativity, and passion. 
            From intimate gatherings to grand celebrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Book Event
            </Link>
            <Link
              to="/events"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in creating memorable experiences for every occasion
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Weddings", icon: "💒", description: "Dream weddings tailored to perfection" },
              { title: "Corporate Events", icon: "🏢", description: "Professional events that impress" },
              { title: "Birthday Parties", icon: "🎂", description: "Celebrations as unique as you are" },
              { title: "Concerts", icon: "🎵", description: "Unforgettable musical experiences" },
            ].map((service, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose EventPro?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">10+ Years Experience</h3>
              <p className="text-gray-600">Proven track record of successful events and satisfied clients</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Planning</h3>
              <p className="text-gray-600">Every event is uniquely designed to match your vision and style</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Budget Friendly</h3>
              <p className="text-gray-600">Flexible packages to fit any budget without compromising quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Events</h2>
            <p className="text-xl text-gray-600">Discover our most popular event packages</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.length > 0 ? (
              featuredEvents.map((event) => (
                <div key={event._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.shortDescription}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-600 font-semibold">
                        From ${event.pricing.basic}
                      </span>
                      <Link
                        to={`/events/${event._id}`}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Example data when no events are loaded
              [
                {
                  id: 1,
                  title: "Elegant Wedding",
                  image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
                  description: "Beautiful outdoor wedding ceremonies",
                  price: 2500
                },
                {
                  id: 2,
                  title: "Corporate Gala",
                  image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
                  description: "Professional corporate events",
                  price: 1800
                },
                {
                  id: 3,
                  title: "Birthday Celebration",
                  image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
                  description: "Memorable birthday parties",
                  price: 800
                }
              ].map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-600 font-semibold">
                        From ${event.price}
                      </span>
                      <Link
                        to="/events"
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.slice(0, 3).map((testimonial) => (
                <div key={testimonial._id} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.clientImage}
                      alt={testimonial.clientName}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.clientName}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.review}"</p>
                </div>
              ))
            ) : (
              // Example testimonials
              [
                {
                  id: 1,
                  name: "Sarah Johnson",
                  image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
                  rating: 5,
                  review: "EventPro made our wedding absolutely perfect! Every detail was handled with care and professionalism."
                },
                {
                  id: 2,
                  name: "Michael Chen",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
                  rating: 5,
                  review: "Outstanding service for our corporate event. The team exceeded all our expectations!"
                },
                {
                  id: 3,
                  name: "Emily Davis",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
                  rating: 5,
                  review: "My daughter's birthday party was magical thanks to EventPro. Highly recommended!"
                }
              ].map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.review}"</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Plan Your Event?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us bring your vision to life with our expert planning and attention to detail
          </p>
          <Link
            to="/contact"
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
          >
            Plan Your Event Today
          </Link>
        </div>
      </section>
    </div>
  );
}
