import urmil_img from "@/assets/Urmil.png";
import aryan_img from "@/assets/Aryan.png";
import vraj_img from "@/assets/Vraj.png";
import { ArrowRight, CheckCircle2, Zap, Heart, Target } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const displayTeam = [
    {
      id: 1,
      name: "Urmil Ramani",
      position: "Founder & Lead Planner",
      image: urmil_img,
      bio: "With over 15 years of experience in event planning, Urmil founded EventSphere with a vision to create unforgettable experiences. She specializes in luxury weddings and corporate events.",
    },
    {
      id: 2,
      name: "Aryan Dhandhukiya",
      position: "Creative Director",
      image: aryan_img,
      bio: "Aryan brings artistic vision to every event with his background in interior design and visual arts. He leads our decoration and design team with creativity and precision.",
    },
    {
      id: 3,
      name: "Vraj Patel",
      position: "Technical Coordinator",
      image: vraj_img,
      bio: "Vraj handles all technical aspects including sound, lighting, and AV equipment. His expertise ensures flawless technical execution for every event.",
    },
  ];

  const stats = [
    { value: "500+", label: "Events Planned" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Vendor Partners" },
  ];

  const values = [
    {
      Icon: CheckCircle2,
      title: "Excellence",
      desc: "We strive for perfection in every detail, ensuring that each event meets the highest standards of quality and execution.",
      color: "from-violet-500 to-purple-600",
    },
    {
      Icon: Heart,
      title: "Creativity",
      desc: "We bring fresh ideas and innovative solutions to every event, creating unique experiences that reflect your personal style.",
      color: "from-pink-500 to-rose-600",
    },
    {
      Icon: Target,
      title: "Integrity",
      desc: "We build trust through honest communication, transparent pricing, and reliable service that you can count on.",
      color: "from-blue-500 to-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F1A]">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="orb orb-purple w-[600px] h-[600px] top-[-200px] right-[-150px] opacity-20 animate-float-slow" />
        <div className="orb orb-pink w-[350px] h-[350px] top-[100px] left-[-100px] opacity-15" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="section-badge mb-6 inline-block">Our Story</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            About <span className="gradient-text">EventSphere</span>
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Creating extraordinary events and unforgettable memories since 2010.
            We are passionate about bringing your vision to life with precision and creativity.
          </p>
        </div>
      </section>

      {/* ── Company Story ── */}
      <section className="py-24 bg-[#0A0A14]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-badge mb-6 inline-block">Since 2010</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                Our <span className="gradient-text">Story</span>
              </h2>
              <div className="space-y-5 text-white/50 text-lg leading-relaxed">
                <p>
                  EventSphere was founded in 2010 with a simple yet powerful vision: to create
                  extraordinary events that exceed expectations and create lasting memories.
                  What started as a small team of passionate event enthusiasts has grown into
                  a full-service event planning company.
                </p>
                <p>
                  Over the years, we've had the privilege of planning and executing hundreds
                  of events, from intimate gatherings to grand celebrations. Each event has
                  taught us something new and helped us refine our approach to creating
                  truly memorable experiences.
                </p>
                <p>
                  Today, we're proud to be one of the most trusted event planning companies
                  in the region, known for our attention to detail, creative solutions, and
                  unwavering commitment to client satisfaction.
                </p>
              </div>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 brand-gradient text-white rounded-xl font-bold shadow-glow hover:shadow-glow-pink transition-all duration-300 hover:scale-105"
              >
                Work With Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-violet-600/20 to-pink-600/20 rounded-3xl blur-xl" />
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=600"
                alt="EventSphere team at work"
                className="relative w-full h-96 object-cover rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-24 bg-[#0F0F1A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-block">What Drives Us</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Mission & <span className="gradient-text">Vision</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                Icon: Zap,
                title: "Our Mission",
                color: "from-violet-500 to-purple-600",
                body: "To transform your special moments into extraordinary experiences through meticulous planning, creative design, and flawless execution. We believe every event should be as unique as the people celebrating it.",
              },
              {
                Icon: Target,
                title: "Our Vision",
                color: "from-pink-500 to-rose-600",
                body: "To be the leading event planning company known for innovation, excellence, and creating magical moments that bring people together. We envision a world where every celebration is perfectly crafted and deeply meaningful.",
              },
            ].map(({ Icon, title, color, body }) => (
              <div key={title} className="group p-10 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] card-hover relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 via-transparent to-pink-600/0 group-hover:from-violet-600/5 group-hover:to-pink-600/5 transition-all duration-500 pointer-events-none rounded-2xl" />
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-violet-300 transition-colors">{title}</h3>
                <p className="text-white/50 leading-relaxed text-lg">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 bg-[#0A0A14]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-block">Core Principles</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto text-lg">
              These core values guide everything we do and shape how we serve our clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ Icon, title, desc, color }) => (
              <div key={title} className="group text-center p-10 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] card-hover">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24 bg-[#0F0F1A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-block">The People</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto text-lg">
              Our passionate team of professionals brings years of experience and creativity to every event
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayTeam.map((member) => (
              <div key={member.id} className="group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] card-hover">
                {/* Active top bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 brand-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                {/* Image container — dark bg fills gap areas from object-contain */}
                <div className="relative overflow-hidden bg-[#0A0A14] flex items-center justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[420px] object-contain object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Very subtle bottom vignette just to blend into card */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0A0A14] to-transparent pointer-events-none" />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">
                    {member.name}
                  </h3>
                  <p className="gradient-text text-sm font-semibold mb-3">{member.position}</p>
                  <p className="text-white/40 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-24 bg-[#0A0A14] relative overflow-hidden">
        <div className="orb orb-purple w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center py-14 px-6 bg-[#0A0A14] hover:bg-white/[0.03] transition-colors duration-300 group">
                <div className="text-5xl font-black gradient-text mb-2">{value}</div>
                <div className="text-sm text-white/30 font-medium text-center">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-[#0F0F1A] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-pink-900/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Ready to <span className="gradient-text">Work With Us?</span>
          </h2>
          <p className="text-white/40 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's discuss your event and see how we can bring your vision to life
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 brand-gradient text-white rounded-xl font-bold shadow-glow hover:shadow-glow-pink transition-all duration-300 hover:scale-105"
          >
            Get In Touch <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
