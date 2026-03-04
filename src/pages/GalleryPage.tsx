import { useState } from "react";
import { ZoomIn, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<{ image: string; title: string; description: string } | null>(null);

  const categories = [
    { id: "all", name: "All Events" },
    { id: "weddings", name: "Weddings" },
    { id: "corporate", name: "Corporate" },
    { id: "birthdays", name: "Birthdays" },
    { id: "concerts", name: "Concerts" },
    { id: "anniversaries", name: "Anniversaries" },
  ];

  const galleryImages = [
    { id: 1, category: "weddings", title: "Elegant Garden Wedding", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600", description: "Beautiful outdoor ceremony with floral arrangements" },
    { id: 2, category: "weddings", title: "Beach Wedding Ceremony", image: "https://images.unsplash.com/photo-1576694667642-6f289dd54187?q=80&w=687", description: "Romantic beachside wedding at sunset" },
    { id: 3, category: "corporate", title: "Annual Corporate Gala", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600", description: "Professional corporate event with networking" },
    { id: 4, category: "corporate", title: "Product Launch Event", image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600", description: "Modern product launch with interactive displays" },
    { id: 5, category: "birthdays", title: "Kids Birthday Party", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600", description: "Fun-filled birthday celebration with themed decorations" },
    { id: 6, category: "birthdays", title: "Sweet 16 Celebration", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600", description: "Elegant sweet sixteen party with personalized touches" },
    { id: 7, category: "concerts", title: "Live Music Concert", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600", description: "Intimate concert venue with professional lighting" },
    { id: 8, category: "concerts", title: "Outdoor Music Festival", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600", description: "Large outdoor music festival with multiple stages" },
    { id: 9, category: "anniversaries", title: "Golden Anniversary", image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600", description: "50th anniversary celebration with elegant decor" },
    { id: 10, category: "weddings", title: "Indoor Wedding Reception", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600", description: "Luxurious indoor reception with crystal chandeliers" },
    { id: 11, category: "corporate", title: "Conference Setup", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600", description: "Professional conference with modern AV setup" },
    { id: 12, category: "birthdays", title: "Adult Birthday Party", image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600", description: "Sophisticated adult birthday celebration" },
  ];

  const filteredImages = selectedCategory === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0F0F1A]">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="orb orb-purple w-[500px] h-[500px] top-[-150px] right-[-100px] opacity-20 animate-float-slow" />
        <div className="orb orb-pink w-[350px] h-[350px] top-[100px] left-[-80px] opacity-15" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="section-badge mb-6 inline-block">Our Portfolio</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Event <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Explore our portfolio of successful events and get inspired for your own celebration.
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

        {/* ── Gallery Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] cursor-pointer card-hover"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-[#0F0F1A]/0 group-hover:bg-[#0F0F1A]/40 transition-all duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-glow">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Category pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-sm border border-white/10 text-white capitalize">
                    {image.category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-white text-sm mb-1 group-hover:text-violet-300 transition-colors">{image.title}</h3>
                <p className="text-white/35 text-xs leading-relaxed">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl">🖼️</span>
            </div>
            <p className="text-white/30 text-lg">No images found in this category.</p>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="mt-20 relative overflow-hidden rounded-2xl p-10 text-center border border-white/[0.06]">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-pink-600/10" />
          <div className="orb orb-purple w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Ready to Create Your Own Memorable Event?
            </h2>
            <p className="text-white/40 text-lg mb-8 max-w-lg mx-auto">
              Let us help you plan an event that will be featured in our next gallery showcase.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 brand-gradient text-white rounded-xl font-bold shadow-glow hover:shadow-glow-pink transition-all duration-300 hover:scale-105"
            >
              Start Planning Today <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl mx-auto shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center">
              <h3 className="text-white font-bold text-xl">{selectedImage.title}</h3>
              <p className="text-white/40 text-sm mt-1">{selectedImage.description}</p>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
