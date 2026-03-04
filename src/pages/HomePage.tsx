import { ArrowRight, Star, Calendar, Music, Clock, Users, Shield, Award, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@/hooks/use-local-convex";
import { localApi as api } from "@/lib/db";
import { Event, Testimonial } from "@/lib/types";

export default function HomePage() {
  const featuredEvents = useQuery<Event[]>(api.events.getFeaturedEvents) || [];
  const testimonials = useQuery<Testimonial[]>(api.events.getTestimonials) || [];

  const stats = [
    { value: "500+", label: "Events Planned", icon: Calendar },
    { value: "15+", label: "Years Experience", icon: Award },
    { value: "98%", label: "Client Satisfaction", icon: Star },
    { value: "50+", label: "Vendor Partners", icon: Users },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0F0F1A]">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#0F0F1A]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F0F1A]/40 to-[#0F0F1A]" />
        </div>

        {/* Ambient orbs */}
        <div className="orb orb-purple w-[500px] h-[500px] top-[-100px] left-[-100px] animate-float" />
        <div className="orb orb-pink w-[400px] h-[400px] bottom-[-80px] right-[-80px] animate-float-slow" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-violet-300 font-medium mb-8 animate-fade-in-up backdrop-blur-sm">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            Reimagining Events Since 2010
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 leading-[1.05] tracking-tight animate-fade-in-up delay-100">
            <span className="text-white">Create </span>
            <span className="gradient-text">Unforgettable</span>
            <br />
            <span className="text-white">Memories</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-white/60 animate-fade-in-up delay-200 leading-relaxed">
            From intimate gatherings to grand celebrations, we bring your vision to life with elegance and precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Link
              to="/events"
              className="group px-8 py-4 brand-gradient text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-pink transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-base"
            >
              Explore Events
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 glass-card text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 text-base border border-white/10"
            >
              Plan Your Event
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-white/30" />
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="relative z-10 -mt-1 py-12 bg-[#0F0F1A]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center justify-center py-10 px-6 bg-[#0F0F1A] hover:bg-white/5 transition-colors duration-300 group">
                <Icon className="w-6 h-6 text-violet-400 mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-black gradient-text mb-1">{value}</div>
                <div className="text-sm text-white/40 text-center font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 bg-[#0F0F1A]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-block">What We Do</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Our <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg">
              We specialize in curating exceptional experiences across a wide range of event types.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: Calendar,
                title: "Weddings",
                desc: "Transform your special day into a fairy tale with our comprehensive wedding planning services.",
                color: "from-violet-500 to-purple-600",
                glow: "rgba(124,58,237,0.3)",
              },
              {
                Icon: Music,
                title: "Corporate Events",
                desc: "Impress clients and boost team morale with professionally managed corporate gatherings.",
                color: "from-pink-500 to-rose-600",
                glow: "rgba(236,72,153,0.3)",
              },
              {
                Icon: Clock,
                title: "Private Parties",
                desc: "Celebrate life's milestones with unique and personalized party planning.",
                color: "from-blue-500 to-indigo-600",
                glow: "rgba(99,102,241,0.3)",
              },
            ].map(({ Icon, title, desc, color, glow }) => (
              <div
                key={title}
                className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] card-hover overflow-hidden"
                style={{ "--glow": glow } as React.CSSProperties}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${glow}, transparent 70%)` }}
                />
                <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
                <p className="text-white/50 leading-relaxed">{desc}</p>
                <div className="mt-6 flex items-center gap-1 text-violet-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Events ── */}
      <section className="py-24 bg-[#0A0A14]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 gap-4">
            <div>
              <span className="section-badge mb-4 inline-block">Curated For You</span>
              <h2 className="text-4xl md:text-5xl font-black text-white">
                Featured <span className="gradient-text">Packages</span>
              </h2>
            </div>
            <Link
              to="/events"
              className="flex items-center gap-2 text-violet-400 hover:text-white font-semibold transition-colors group text-sm"
            >
              View All Packages
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <Link key={event._id} to={`/events/${event._id}`} className="group">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4 bg-white/5">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-white/50 text-xs font-medium uppercase tracking-widest mb-1 block">
                      {event.category}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-violet-200 transition-colors">
                      {event.title}
                    </h3>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-full brand-gradient text-white text-xs font-semibold shadow-glow">
                      View Details <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
                <p className="text-white/40 text-sm line-clamp-2 px-1">{event.shortDescription}</p>
              </Link>
            ))}

            {featuredEvents.length === 0 && (
              <div className="col-span-full text-center py-16">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Calendar className="w-8 h-8 text-violet-400" />
                </div>
                <p className="text-white/30">Loading featured events...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24 bg-[#0F0F1A]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <span className="section-badge mb-6 inline-block">Why Us?</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Why Choose <span className="gradient-text">EventSphere?</span>
              </h2>
              <p className="text-white/50 mb-10 text-lg leading-relaxed">
                We combine creativity with logistical expertise to deliver seamless execution for every event.
              </p>

              <div className="space-y-6">
                {[
                  { Icon: Users, title: "Dedicated Team", desc: "Passionate professionals committed to your event's success.", color: "from-violet-500 to-purple-600" },
                  { Icon: Shield, title: "Reliable Vendors", desc: "Access to our network of trusted and quality-verified partners.", color: "from-pink-500 to-rose-600" },
                  { Icon: Award, title: "Award Winning", desc: "Recognized excellence in event planning and coordination.", color: "from-blue-500 to-indigo-600" },
                ].map(({ Icon, title, desc, color }) => (
                  <div key={title} className="flex gap-5 group">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                      <p className="text-white/50 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-violet-600/20 to-pink-600/20 rounded-3xl blur-xl" />
              <div className="absolute -inset-1 brand-gradient rounded-2xl opacity-20" />
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80"
                alt="Event Planning Team"
                className="relative rounded-2xl w-full shadow-2xl border border-white/10"
              />
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-5 border border-white/10 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center shadow-glow">
                    <Star className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg leading-none">4.9/5</div>
                    <div className="text-white/40 text-xs mt-0.5">Client Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-[#0A0A14]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial._id}
                className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] group card-hover"
              >
                {/* Gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 brand-gradient rounded-t-2xl opacity-50 group-hover:opacity-100 transition-opacity" />

                <div className="flex gap-0.5 mb-5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/60 mb-6 italic leading-relaxed text-sm">"{testimonial.review}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.clientImage}
                    alt={testimonial.clientName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-violet-500/50"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm">{testimonial.clientName}</h4>
                    <p className="text-xs text-white/30 capitalize">{testimonial.eventType}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden bg-[#0F0F1A]">
        <div className="orb orb-purple w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Ready to Create Something<br />
            <span className="gradient-text">Extraordinary?</span>
          </h2>
          <p className="text-white/50 text-xl mb-10 max-w-2xl mx-auto">
            Let's bring your vision to life. Our team is ready to craft an unforgettable experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="group px-10 py-4 brand-gradient text-white rounded-xl font-bold shadow-glow hover:shadow-glow-pink transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-base"
            >
              Start Planning Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/events"
              className="px-10 py-4 rounded-xl font-bold text-white border border-white/10 hover:bg-white/5 transition-all text-base"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
