import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@/hooks/use-local-convex";
import { localApi as api } from "@/lib/db";
import { Event } from "@/lib/types";
import BookingModal from "../components/BookingModal";

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined);

  const handleBookNow = (event: Event) => {
    setSelectedEvent(event);
    setIsBookingModalOpen(true);
  };

  const allEvents = useQuery<Event[]>(api.events.getAllEvents) || [];

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
    : allEvents.filter((event: Event) => event.category === selectedCategory);

  const displayEvents = filteredEvents;

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
          {displayEvents.map((event: Event) => (
            <div key={event._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <img
                src={event.imageUrl}
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
                  {event.shortDescription || event.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Included:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {event.features.slice(0, 3).map((feature: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 mt-auto">
                  <Link
                    to={`/events/${event._id}`}
                    className="flex-1 bg-purple-600 text-white text-center py-2 px-4 rounded hover:bg-purple-700 transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleBookNow(event)}
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
        eventName={selectedEvent?.title}
        event={selectedEvent}
      />
    </div>
  );
}
