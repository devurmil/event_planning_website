import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@/hooks/use-local-convex";
import { localApi as api } from "@/lib/db";
import { Event } from "@/lib/types";
import BookingModal from "../components/BookingModal";
import { ArrowRight, CheckCircle2, ArrowUpRight, MessageSquare } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-[#0F0F1A]">
      {/* ── Page Header ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="orb orb-purple w-[500px] h-[500px] top-[-200px] right-[-100px] opacity-20 animate-float-slow" />
        <div className="orb orb-pink w-[300px] h-[300px] top-[50px] left-[-80px] opacity-15" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="section-badge mb-6 inline-block">Browse & Book</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Our <span className="gradient-text">Events</span>
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Discover our comprehensive range of event planning services tailored to make your special moments unforgettable.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* ── Category Filter ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${selectedCategory === category.id
                  ? "brand-gradient text-white shadow-glow"
                  : "bg-white/[0.04] text-white/50 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* ── Events Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event: Event) => (
            <div
              key={event._id}
              className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] overflow-hidden card-hover flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] via-[#0F0F1A]/30 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm bg-white/10 border border-white/10 text-white capitalize">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {event.title}
                </h3>
                <p className="text-white/40 text-sm mb-5 line-clamp-2 leading-relaxed flex-1">
                  {event.shortDescription || event.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Included</p>
                  <ul className="space-y-1.5">
                    {event.features.slice(0, 3).map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-white/50">
                        <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                  <Link
                    to={`/events/${event._id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 brand-gradient text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-glow hover:shadow-glow-pink transition-all duration-200 hover:scale-[1.02]"
                  >
                    View Details <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => handleBookNow(event)}
                    className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl">🎉</span>
            </div>
            <p className="text-white/30 text-lg">No events in this category yet.</p>
          </div>
        )}

        {/* ── CTA card ── */}
        <div className="mt-20 relative overflow-hidden rounded-2xl p-10 text-center border border-white/[0.06]">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-pink-600/10" />
          <div className="orb orb-purple w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Don't See What You're Looking For?
            </h2>
            <p className="text-white/40 text-lg mb-8 max-w-lg mx-auto">
              We create fully custom events tailored to your specific needs and vision.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 brand-gradient text-white rounded-xl font-bold shadow-glow hover:shadow-glow-pink transition-all duration-300 hover:scale-105"
            >
              <MessageSquare className="w-5 h-5" />
              Contact Us for Custom Planning
            </Link>
          </div>
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
