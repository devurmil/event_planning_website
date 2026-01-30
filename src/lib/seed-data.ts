export const INITIAL_DATA = {
  events: [
    {
      _id: "1",
      title: "Luxury Wedding Package",
      category: "Wedding",
      description: "A complete luxury wedding experience including venue, catering, and decoration.",
      shortDescription: "Complete luxury wedding experience",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
        "https://images.unsplash.com/photo-1520854221250-bc63c54b5171?w=800"
      ],
      pricing: {
        basic: 5000,
        premium: 8000,
        luxury: 12000
      },
      features: [
        "Venue Selection & Booking",
        "Full Decoration",
        "Catering for up to 200 guests",
        "Photography & Videography",
        "Live Music Band"
      ],
      timeline: [
        { step: "Month 1", description: "Initial consultation and venue booking" },
        { step: "Month 3", description: "Vendor selection and menu tasting" },
        { step: "Month 6", description: "Final details and rehearsal" }
      ],
      isFeatured: true
    },
    {
      _id: "2",
      title: "Corporate Summit",
      category: "Corporate",
      description: "Professional planning for large-scale corporate conferences and summits.",
      shortDescription: "Professional corporate event planning",
      imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
        "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800"
      ],
      pricing: {
        basic: 3000,
        premium: 6000,
        luxury: 10000
      },
      features: [
        "Venue Arrangement",
        "AV Setup & Tech Support",
        "Catering",
        "Guest Registration System"
      ],
      timeline: [
        { step: "Week 1", description: "Concept and budget approval" },
        { step: "Week 4", description: "Speaker coordination" }
      ],
      isFeatured: true
    },
    {
      _id: "3",
      title: "Birthday Bash",
      category: "Party",
      description: "Fun and exciting birthday parties for all ages.",
      shortDescription: "Unforgettable birthday celebrations",
      imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800"
      ],
      pricing: {
        basic: 1000,
        premium: 2500,
        luxury: 4000
      },
      features: [
        "Theme Decoration",
        "Entertainment / DJ",
        "Custom Cake",
        "Photography"
      ],
      timeline: [],
      isFeatured: true
    }
  ],
  testimonials: [
    {
      _id: "1",
      clientName: "Sarah Johnson",
      clientImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
      rating: 5,
      review: "EventSphere made our wedding absolutely perfect! Every detail was handled with care.",
      eventType: "Wedding"
    },
    {
      _id: "2",
      clientName: "Michael Chen",
      clientImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      rating: 5,
      review: "Outstanding service for our corporate gala. Highly professional team.",
      eventType: "Corporate"
    }
  ],
  services: [
    {
      _id: "1",
      title: "Weddings",
      description: "Dream weddings tailored to perfection",
      icon: "💒",
      features: ["Full Planning", "Day-of Coordination", "Destination Weddings"]
    },
    {
      _id: "2",
      title: "Corporate Events",
      description: "Professional events that impress",
      icon: "🏢",
      features: ["Conferences", "Product Launches", "Team Building"]
    },
    {
      _id: "3",
      title: "Social Gatherings",
      description: "Parties and celebrations",
      icon: "🎉",
      features: ["Birthdays", "Anniversaries", "Reunions"]
    }
  ],
  bookings: [
    // Empty initially
  ],
  team: [
     {
      _id: "1",
      name: "Emily Davis",
      position: "Lead Planner",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      bio: "10+ years of experience in luxury weddings."
    }
  ]
};
