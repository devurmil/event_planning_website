import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation } from "@/hooks/use-local-convex";
import { localApi as api } from "@/lib/db";
import { Event } from "@/lib/types";
import BookingModal from "../components/BookingModal";
import { CheckCircle2, ArrowRight, ArrowLeft, MessageSquare, Sparkles, ChevronRight } from "lucide-react";

export default function EventDetailsPage() {
  const { id } = useParams();
  const event = useQuery<Event>(api.events.getEventById, { id: id as string });
  const createBooking = useMutation(api.bookings.create);

  const [selectedPackage, setSelectedPackage] = useState("basic");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const exampleEvent: Event = {
    _id: "example",
    title: "Elegant Garden Wedding",
    isFeatured: true,
    category: "wedding",
    description:
      "Create your dream wedding in a beautiful garden setting with our comprehensive wedding planning service. We handle every detail from venue decoration to vendor coordination, ensuring your special day is perfect in every way.",
    shortDescription: "Beautiful outdoor wedding ceremony with floral arrangements and elegant decor",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400",
    ],
    pricing: { basic: 2500, premium: 4500, luxury: 7500 },
    features: [
      "Professional event coordination",
      "Venue decoration and setup",
      "Floral arrangements",
      "Photography coordination",
      "Catering management",
      "Guest coordination",
    ],
    timeline: [
      { step: "Initial Consultation", description: "Meet with our planning team to discuss your vision" },
      { step: "Venue Selection", description: "Choose the perfect location for your event" },
      { step: "Vendor Coordination", description: "Book and coordinate all necessary vendors" },
      { step: "Final Planning", description: "Finalize all details and create timeline" },
      { step: "Event Day", description: "Full coordination and management of your event" },
    ],
  };

  const displayEvent = event || exampleEvent;

  const packageDetails = {
    basic: {
      name: "Basic",
      price: displayEvent.pricing.basic,
      features: ["Event coordination", "Basic decoration", "Vendor management"],
      color: "from-slate-500 to-slate-600",
    },
    premium: {
      name: "Premium",
      price: displayEvent.pricing.premium,
      features: ["Everything in Basic", "Enhanced decoration", "Photography", "Catering coordination"],
      color: "from-violet-500 to-purple-600",
    },
    luxury: {
      name: "Luxury",
      price: displayEvent.pricing.luxury,
      features: ["Everything in Premium", "Premium vendors", "Full-service planning", "Day-of coordination"],
      color: "from-amber-400 to-orange-500",
    },
  };

  const selectedPkg = packageDetails[selectedPackage as keyof typeof packageDetails];

  return (
    <div className="min-h-screen bg-[#0F0F1A]">
      {/* ── Cinematic Hero ── */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={displayEvent.imageUrl}
          alt={displayEvent.title}
          className="w-full h-full object-cover"
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] via-[#0F0F1A]/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F1A]/60 to-transparent" />

        {/* Ambient orb */}
        <div className="orb orb-purple w-[400px] h-[400px] bottom-[-100px] right-[-50px] opacity-20" />

        {/* Back link */}
        <div className="absolute top-24 left-6 z-10">
          <Link
            to="/events"
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium glass-card px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14 z-10">
          <div className="max-w-7xl mx-auto">
            <span className="section-badge mb-4 inline-block capitalize">{displayEvent.category}</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3 leading-tight">
              {displayEvent.title}
            </h1>
            <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
              {displayEvent.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ── Left: Main Content ── */}
          <div className="lg:col-span-2 space-y-14">

            {/* Gallery */}
            <section>
              <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 brand-gradient rounded-full inline-block" />
                Event Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {displayEvent.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer"
                    onClick={() => setLightboxImg(image)}
                  >
                    <img
                      src={image}
                      alt={`${displayEvent.title} ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#0F0F1A]/0 group-hover:bg-[#0F0F1A]/40 transition-all flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-2">
                <span className="w-1 h-6 brand-gradient rounded-full inline-block" />
                About This Event
              </h2>
              <p className="text-white/50 text-lg leading-relaxed">{displayEvent.description}</p>
            </section>

            {/* Timeline */}
            <section>
              <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 brand-gradient rounded-full inline-block" />
                Planning Timeline
              </h2>
              <div className="space-y-4">
                {displayEvent.timeline.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-5 group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all"
                  >
                    <div className="flex-shrink-0 w-10 h-10 brand-gradient rounded-xl flex items-center justify-center font-black text-white shadow-glow group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">
                        {step.step}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-violet-400 transition-colors ml-auto shrink-0 mt-3" />
                  </div>
                ))}
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 brand-gradient rounded-full inline-block" />
                What's Included
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {displayEvent.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                  >
                    <CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0" />
                    <span className="text-white/60 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── Right Sidebar ── */}
          <div className="lg:col-span-1 space-y-5">
            {/* Package selector */}
            <div className="sticky top-24 space-y-5">
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
                <h3 className="text-lg font-black text-white mb-5">Choose Your Package</h3>
                <div className="space-y-3">
                  {Object.entries(packageDetails).map(([key, pkg]) => (
                    <div
                      key={key}
                      onClick={() => setSelectedPackage(key)}
                      className={`relative rounded-xl p-4 cursor-pointer transition-all duration-200 border ${selectedPackage === key
                          ? "border-violet-500/50 bg-violet-500/10"
                          : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.14]"
                        }`}
                    >
                      {selectedPackage === key && (
                        <div className="absolute top-0 left-0 right-0 h-0.5 brand-gradient rounded-t-xl" />
                      )}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${pkg.color}`} />
                          <h4 className="font-bold text-white text-sm">{pkg.name}</h4>
                        </div>
                        <span className="text-lg font-black gradient-text">${pkg.price.toLocaleString()}</span>
                      </div>
                      <ul className="space-y-1">
                        {pkg.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-white/40">
                            <CheckCircle2 className="w-3 h-3 text-violet-400 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book CTA */}
              <div className="rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 brand-gradient opacity-10" />
                <div className="relative p-6 border border-white/[0.06] rounded-2xl">
                  <div className="text-center mb-5">
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-1">Selected</p>
                    <p className="text-white font-bold text-base">{selectedPkg.name} Package</p>
                    <p className="gradient-text font-black text-3xl mt-1">${selectedPkg.price.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 brand-gradient text-white rounded-xl font-bold shadow-glow hover:shadow-glow-pink transition-all duration-300 hover:scale-[1.02]"
                  >
                    Book This Event <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Help card */}
              <div className="rounded-2xl p-6 bg-white/[0.03] border border-white/[0.06]">
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-violet-400" />
                  Need Help?
                </h3>
                <p className="text-white/40 text-sm mb-4 leading-relaxed">
                  Have questions about this event? Our team is here to help!
                </p>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.05] text-sm font-semibold transition-all"
                >
                  Contact Us <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-4"
          onClick={() => setLightboxImg(null)}
        >
          <img
            src={lightboxImg}
            alt="Gallery"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
          />
        </div>
      )}

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        eventName={displayEvent.title}
        initialPackage={selectedPackage}
        event={displayEvent}
      />
    </div>
  );
}
