import { Link } from "react-router-dom";
import { Sparkles, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const contactInfo = [
    { Icon: Phone, text: "+1 (555) 123-4567" },
    { Icon: Mail, text: "hello@eventsphere.com" },
    { Icon: MapPin, text: "123 Event Street, City, State 12345" },
  ];

  return (
    <footer className="bg-[#0A0A14] border-t border-white/5">
      {/* Top gradient line */}
      <div className="h-px w-full brand-gradient opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand column */}
          <div className="md:col-span-5 space-y-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center shadow-glow">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Event<span className="gradient-text">Sphere</span>
              </span>
            </Link>

            <p className="text-white/40 leading-relaxed max-w-sm">
              We specialize in creating unforgettable events that exceed your expectations.
              From intimate gatherings to grand celebrations, we handle every detail with precision and care.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200 group"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map(({ name, path }) => (
                <li key={name}>
                  <Link
                    to={path}
                    className="group flex items-center gap-1.5 text-white/40 hover:text-white transition-colors text-sm"
                  >
                    <span className="w-0 group-hover:w-3 h-px brand-gradient transition-all duration-200 overflow-hidden" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-4">
              {contactInfo.map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-white/40 text-sm">
                  <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center shrink-0 mt-0.5 opacity-80">
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="leading-relaxed pt-1">{text}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white brand-gradient shadow-glow hover:shadow-glow-pink transition-all duration-300 hover:scale-105"
            >
              Book an Event
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-14 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-sm">
            © {new Date().getFullYear()} EventSphere. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/20">
            <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/50 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
