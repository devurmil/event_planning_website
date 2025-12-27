import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const event = useQuery(api.events.getEventById, id ? { id: id as Id<"events"> } : "skip");
  const createBooking = useMutation(api.events.createBooking);
  
  const [selectedPackage, setSelectedPackage] = useState("basic");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    eventDate: "",
    guestCount: "",
    message: "",
  });

  // Example event data for when no event is loaded
  const exampleEvent = {
    title: "Elegant Garden Wedding",
    category: "wedding",
    description: "Create your dream wedding in a beautiful garden setting with our comprehensive wedding planning service. We handle every detail from venue decoration to vendor coordination, ensuring your special day is perfect in every way.",
    shortDescription: "Beautiful outdoor wedding ceremony with floral arrangements and elegant decor",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400",
    ],
    pricing: {
      basic: 2500,
      premium: 4500,
      luxury: 7500,
    },
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    try {
      await createBooking({
        eventId: event._id,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        eventDate: formData.eventDate,
        guestCount: parseInt(formData.guestCount),
        package: selectedPackage,
        budget: displayEvent.pricing[selectedPackage as keyof typeof displayEvent.pricing],
        message: formData.message,
      });
      
      setShowBookingForm(false);
      setFormData({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        eventDate: "",
        guestCount: "",
        message: "",
      });
      alert("Booking request submitted successfully!");
    } catch (error) {
      alert("Error submitting booking. Please try again.");
    }
  };

  const packageDetails = {
    basic: {
      name: "Basic Package",
      price: displayEvent.pricing.basic,
      features: ["Event coordination", "Basic decoration", "Vendor management"],
    },
    premium: {
      name: "Premium Package", 
      price: displayEvent.pricing.premium,
      features: ["Everything in Basic", "Enhanced decoration", "Photography", "Catering coordination"],
    },
    luxury: {
      name: "Luxury Package",
      price: displayEvent.pricing.luxury,
      features: ["Everything in Premium", "Premium vendors", "Full-service planning", "Day-of coordination"],
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-96 bg-gray-900">
        <img
          src={displayEvent.imageUrl}
          alt={displayEvent.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{displayEvent.title}</h1>
            <p className="text-xl">{displayEvent.shortDescription}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Event Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {displayEvent.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${displayEvent.title} ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </div>
            </section>

            {/* Description */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">About This Event</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{displayEvent.description}</p>
            </section>

            {/* Timeline */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Planning Timeline</h2>
              <div className="space-y-6">
                {displayEvent.timeline.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{step.step}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-3xl font-bold mb-6">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayEvent.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Pricing Packages */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-2xl font-bold mb-6">Choose Your Package</h3>
              <div className="space-y-4">
                {Object.entries(packageDetails).map(([key, pkg]) => (
                  <div
                    key={key}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPackage === key
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                    onClick={() => setSelectedPackage(key)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{pkg.name}</h4>
                      <span className="text-xl font-bold text-purple-600">${pkg.price}</span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-3 h-3 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              {!showBookingForm ? (
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">Ready to Book?</h3>
                  <p className="text-gray-600 mb-6">
                    Selected: {packageDetails[selectedPackage as keyof typeof packageDetails].name}
                  </p>
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Book This Event - ${packageDetails[selectedPackage as keyof typeof packageDetails].price}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-xl font-bold mb-4">Book Your Event</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="clientEmail"
                        value={formData.clientEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="clientPhone"
                        value={formData.clientPhone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Guest Count</label>
                      <input
                        type="number"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        required
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Any special requirements or requests..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                      >
                        Submit Booking
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowBookingForm(false)}
                        className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="bg-purple-50 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Have questions about this event? Our team is here to help!
              </p>
              <Link
                to="/contact"
                className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
