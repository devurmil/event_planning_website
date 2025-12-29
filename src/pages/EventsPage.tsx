import { useState } from "react";
import { useQuery } from "convex/react";
import { Link } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import BookingModal from "../components/BookingModal";

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState("");

  const handleBookNow = (eventName: string) => {
    setSelectedEventName(eventName);
    setIsBookingModalOpen(true);
  };

  const allEvents = useQuery(api.events.getAllEvents) || [];

  const categories = [
    { id: "all", name: "All Events" },
    { id: "wedding", name: "Weddings" },
    { id: "corporate", name: "Corporate" },
    { id: "birthday", name: "Birthdays" },
    { id: "concert", name: "Concerts" },
    { id: "anniversary", name: "Anniversaries" },
  ];

  const filteredEvents = selectedCategory === "all"
    ? allEvents
    : allEvents.filter(event => event.category === selectedCategory);

  // Example events data for display
  const exampleEvents = [
    {
      id: 1,
      title: "Elegant Garden Wedding",
      category: "wedding",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
      description: "Beautiful outdoor wedding ceremony with floral arrangements and elegant decor",
      features: ["Venue decoration", "Floral arrangements", "Photography", "Catering coordination"]
    },
    {
      id: 2,
      title: "Corporate Annual Gala",
      category: "corporate",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
      description: "Professional corporate event with networking opportunities and presentations",
      features: ["AV equipment", "Stage setup", "Networking area", "Professional lighting"]
    },
    {
      id: 3,
      title: "Kids/Adults Birthday Party",
      category: "birthday",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
      description: "Fun-filled birthday celebration with games, entertainment, and themed decorations",
      features: ["Themed decorations", "Entertainment", "Party games", "Birthday cake"]
    },
    {
      id: 4,
      title: "Live Music Concert",
      category: "concert",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      description: "Intimate concert venue setup with professional sound and lighting systems",
      features: ["Sound system", "Stage lighting", "Security", "Ticket management"]
    },
    {
      id: 5,
      title: "Golden Anniversary",
      category: "anniversary",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
      description: "Elegant anniversary celebration with personalized touches and memorable moments",
      features: ["Elegant decor", "Memory displays", "Special dining", "Photography"]
    },
    {
      id: 6,
      title: "Product Launch Event",
      category: "corporate",
      image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400",
      description: "Modern product launch with interactive displays and media coverage",
      features: ["Product displays", "Media setup", "Presentation area", "Refreshments"]
    }
  ];

  const displayEvents = filteredEvents.length > 0 ? filteredEvents :
    (selectedCategory === "all" ? exampleEvents :
      exampleEvents.filter(event => event.category === selectedCategory));

  return (
    <div className="min-h-screen bg-gray-50 pt-[5rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Events</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of event planning services tailored to make your special moments unforgettable
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${selectedCategory === category.id
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 hover:bg-purple-50 border border-gray-200"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayEvents.map((event) => (
            <div key={'id' in event ? event.id : event._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={'image' in event ? event.image : event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full capitalize">
                    {event.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {'shortDescription' in event ? event.shortDescription : event.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Included:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {event.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={'_id' in event ? `/events/${event._id}` : "/contact"}
                    className="flex-1 bg-purple-600 text-white text-center py-2 px-4 rounded hover:bg-purple-700 transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleBookNow('title' in event ? event.title : 'Event')}
                    className="flex-1 border border-purple-600 text-purple-600 text-center py-2 px-4 rounded hover:bg-purple-50 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found in this category.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Don't See What You're Looking For?
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            We create custom events tailored to your specific needs and vision
          </p>
          <Link
            to="/contact"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-block"
          >
            Contact Us for Custom Planning
          </Link>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        eventName={selectedEventName}
      />
    </div>
  );
}
