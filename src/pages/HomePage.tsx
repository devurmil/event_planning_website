import { ArrowRight, Star, Calendar, Music, Clock, Users, Shield, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@/hooks/use-local-convex";
import { localApi as api } from "@/lib/db";
import { Event, Testimonial } from "@/lib/types";

export default function HomePage() {
  const featuredEvents = useQuery<Event[]>(api.events.getFeaturedEvents) || [];
  const testimonials = useQuery<Testimonial[]>(api.events.getTestimonials) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            Create Unforgettable Memories
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200 animate-fade-in-up delay-100">
            From intimate gatherings to grand celebrations, we bring your vision to life with elegance and precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
            <Link 
              to="/events" 
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Explore Events <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full font-semibold transition-all"
            >
              Plan Your Event
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Expertise</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We specialize in curating exceptional experiences across a wide range of event types.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gray-50 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Weddings</h3>
              <p className="text-gray-600">
                Transform your special day into a fairy tale with our comprehensive wedding planning services.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Music className="w-7 h-7 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Corporate Events</h3>
              <p className="text-gray-600">
                Impress clients and boost team morale with professionally managed corporate gatherings.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Private Parties</h3>
              <p className="text-gray-600">
                Celebrate life's milestones with unique and personalized party planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Packages</h2>
              <p className="text-gray-400">Discover our most popular event experiences</p>
            </div>
            <Link to="/events" className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Link key={event._id} to={`/events/${event._id}`} className="group">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-semibold">View Details</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{event.title}</h3>
                <p className="text-gray-400 line-clamp-2">{event.shortDescription}</p>
              </Link>
            ))}
            
            {/* Fallback if no featured events */}
            {featuredEvents.length === 0 && (
              <div className="col-span-full text-center py-10 text-gray-500">
                Loading featured events...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose EventSphere?
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                We combine creativity with logistical expertise to deliver seamless execution for every event.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Dedicated Team</h3>
                    <p className="text-gray-600">Passionate professionals committed to your event's success.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Reliable Vendors</h3>
                    <p className="text-gray-600">Access to our network of trusted and quality-verified partners.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Award Winning</h3>
                    <p className="text-gray-600">Recognized excellence in event planning and coordination.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-purple-100 rounded-3xl transform rotate-3" />
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80" 
                alt="Event Planning Team" 
                className="relative rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.review}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.clientImage} 
                    alt={testimonial.clientName} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.clientName}</h4>
                    <p className="text-sm text-gray-500">{testimonial.eventType}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
