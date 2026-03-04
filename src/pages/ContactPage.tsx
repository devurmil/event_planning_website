import { useState } from "react";
import { Phone, Mail, MapPin, Clock, AlertCircle, CheckCircle2, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitStatus("success");
      setSubmitMessage("Thank you for your inquiry! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", eventType: "", eventDate: "", guestCount: "", budget: "", message: "" });
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("Sorry, there was an error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/25 focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.06] transition-all duration-200 text-sm";
  const labelClass = "block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2";

  const contactInfo = [
    { Icon: Phone, title: "Phone", value: "+1 (555) 123-4567", sub: "Mon–Fri 9AM–6PM" },
    { Icon: Mail, title: "Email", value: "hello@eventsphere.com", sub: "Reply within 24 hours" },
    { Icon: MapPin, title: "Office", value: "123 Event Street, City, State 12345", sub: "By appointment only" },
  ];

  const officeHours = [
    { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
    { day: "Saturday", time: "10:00 AM – 4:00 PM" },
    { day: "Sunday", time: "By Appointment" },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F1A]">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="orb orb-purple w-[500px] h-[500px] top-[-150px] right-[-100px] opacity-20 animate-float-slow" />
        <div className="orb orb-pink w-[350px] h-[350px] top-[100px] left-[-80px] opacity-15" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="section-badge mb-6 inline-block">Let's Connect</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Ready to start planning your perfect event? Get in touch with our team today.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── Contact Form ── */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 sm:p-10">
              <h2 className="text-2xl font-black text-white mb-2">Get Started Today</h2>
              <p className="text-white/40 text-sm mb-8 leading-relaxed">
                Fill out the form below and we'll get back to you within 24 hours to discuss your event needs.
              </p>

              {/* Status message */}
              {submitMessage && (
                <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-sm ${submitStatus === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                    : "bg-red-500/10 border border-red-500/20 text-red-300"
                  }`}>
                  {submitStatus === "success"
                    ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  }
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className={inputClass} placeholder="Your full name" />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className={inputClass} placeholder="your@email.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass} placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <label className={labelClass}>Event Type *</label>
                    <select name="eventType" value={formData.eventType} onChange={handleInputChange} required className={inputClass} style={{ colorScheme: "dark" }}>
                      <option value="" className="bg-[#1A1A2E]">Select event type</option>
                      <option value="wedding" className="bg-[#1A1A2E]">Wedding</option>
                      <option value="corporate" className="bg-[#1A1A2E]">Corporate Event</option>
                      <option value="birthday" className="bg-[#1A1A2E]">Birthday Party</option>
                      <option value="anniversary" className="bg-[#1A1A2E]">Anniversary</option>
                      <option value="concert" className="bg-[#1A1A2E]">Concert / Music Event</option>
                      <option value="other" className="bg-[#1A1A2E]">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Event Date</label>
                    <input type="date" name="eventDate" value={formData.eventDate} onChange={handleInputChange} className={inputClass} style={{ colorScheme: "dark" }} />
                  </div>
                  <div>
                    <label className={labelClass}>Guest Count</label>
                    <input type="number" name="guestCount" value={formData.guestCount} onChange={handleInputChange} min="1" className={inputClass} placeholder="Number of guests" />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Budget Range</label>
                  <select name="budget" value={formData.budget} onChange={handleInputChange} className={inputClass} style={{ colorScheme: "dark" }}>
                    <option value="" className="bg-[#1A1A2E]">Select budget range</option>
                    <option value="under-1000" className="bg-[#1A1A2E]">Under $1,000</option>
                    <option value="1000-2500" className="bg-[#1A1A2E]">$1,000 – $2,500</option>
                    <option value="2500-5000" className="bg-[#1A1A2E]">$2,500 – $5,000</option>
                    <option value="5000-10000" className="bg-[#1A1A2E]">$5,000 – $10,000</option>
                    <option value="10000-plus" className="bg-[#1A1A2E]">$10,000+</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Tell us about your event</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5} className={inputClass} placeholder="Describe your vision, special requirements, or any questions you have..." />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 brand-gradient text-white rounded-xl font-bold text-base shadow-glow hover:shadow-glow-pink transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Contact info */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-7">
              <h3 className="text-lg font-black text-white mb-6">Get In Touch</h3>
              <div className="space-y-5">
                {contactInfo.map(({ Icon, title, value, sub }) => (
                  <div key={title} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center shrink-0 shadow-glow">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/30 font-semibold uppercase tracking-widest mb-0.5">{title}</p>
                      <p className="text-white text-sm font-medium leading-snug">{value}</p>
                      <p className="text-white/30 text-xs mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office hours */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-7">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-4 h-4 text-violet-400" />
                <h3 className="text-lg font-black text-white">Office Hours</h3>
              </div>
              <div className="space-y-3">
                {officeHours.map(({ day, time }) => (
                  <div key={day} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <span className="text-white/40 text-sm">{day}</span>
                    <span className="text-white text-sm font-medium">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency */}
            <div className="relative overflow-hidden rounded-2xl p-7 border border-white/[0.06]">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-pink-600/10" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
                  <h3 className="text-white font-black text-sm">Emergency Hotline</h3>
                </div>
                <p className="text-white/40 text-xs mb-4 leading-relaxed">
                  For urgent matters on event day, our emergency line is available 24/7.
                </p>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-violet-400" />
                  <span className="gradient-text font-bold">+1 (555) 999-0000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
