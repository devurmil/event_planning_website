import { useQuery } from "@/hooks/use-local-convex";
import { localApi as api } from "@/lib/db";
import { Service } from "@/lib/types";
import { CheckCircle2, ArrowRight, Zap, Clock, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function ServicesPage() {
  const services = useQuery<Service[]>(api.events.getServices) || [];

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

  const processSteps = [
    { step: "01", title: "Consultation", description: "We start with a detailed consultation to understand your vision, requirements, and budget." },
    { step: "02", title: "Planning", description: "Our team creates a comprehensive plan with timelines, vendor coordination, and logistics." },
    { step: "03", title: "Coordination", description: "We manage all vendors, handle logistics, and ensure everything is perfectly coordinated." },
    { step: "04", title: "Execution", description: "On event day, we oversee every detail to ensure flawless execution of your celebration." },
  ];

  const reasons = [
    { Icon: Zap, title: "Expert Team", desc: "Our experienced professionals bring creativity and expertise to every project.", color: "from-violet-500 to-purple-600" },
    { Icon: Clock, title: "Timely Execution", desc: "We pride ourselves on delivering events on time and within budget.", color: "from-pink-500 to-rose-600" },
    { Icon: Heart, title: "Personalized Service", desc: "Every event is customized to reflect your unique style and preferences.", color: "from-blue-500 to-indigo-600" },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F1A]">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="orb orb-purple w-[500px] h-[500px] top-[-150px] right-[-100px] opacity-20 animate-float-slow" />
        <div className="orb orb-pink w-[350px] h-[350px] top-[100px] left-[-80px] opacity-15" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="section-badge mb-6 inline-block">Full-Service Planning</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            From initial planning to final execution, we provide comprehensive event services
            to make your celebration perfect in every detail.
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service) => (
              <div
                key={'id' in service ? service.id : service._id}
                className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] p-8 card-hover overflow-hidden"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-pink-600/0 group-hover:from-violet-600/5 group-hover:to-pink-600/5 transition-all duration-500 pointer-events-none rounded-2xl" />

                {/* Top line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 brand-gradient rounded-t-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

                <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="border-t border-white/5 pt-6">
                  <p className="text-xs font-semibold text-white/25 uppercase tracking-widest mb-4">What's Included</p>
                  <ul className="space-y-2.5">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                        <span className="text-white/50 text-sm leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24 bg-[#0A0A14]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-block">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto text-lg">
              We follow a proven process to ensure every event is executed flawlessly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-violet-600/30 via-pink-500/30 to-violet-600/30" />

            {processSteps.map((process, index) => (
              <div key={index} className="relative text-center group">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl brand-gradient shadow-glow mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                  <span className="text-white font-black text-2xl">{process.step}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                  {process.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24 bg-[#0F0F1A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-block">Why Us</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Why Choose Our <span className="gradient-text">Services?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasons.map(({ Icon, title, desc, color }) => (
              <div key={title} className="group text-center p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] card-hover">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">{title}</h3>
                <p className="text-white/40 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-[#0F0F1A] to-pink-900/20" />
        <div className="orb orb-purple w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Ready to <span className="gradient-text">Start Planning?</span>
          </h2>
          <p className="text-white/40 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Let our expert team help you create an unforgettable event that exceeds your expectations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 brand-gradient text-white rounded-xl font-bold shadow-glow hover:shadow-glow-pink transition-all duration-300 hover:scale-105"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white border border-white/10 hover:bg-white/5 transition-all"
            >
              View Our Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
