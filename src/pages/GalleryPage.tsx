import { useState } from "react";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    { id: "all", name: "All Events" },
    { id: "weddings", name: "Weddings" },
    { id: "corporate", name: "Corporate" },
    { id: "birthdays", name: "Birthdays" },
    { id: "concerts", name: "Concerts" },
    { id: "anniversaries", name: "Anniversaries" },
  ];

  // Example gallery images
  const galleryImages = [
    {
      id: 1,
      category: "weddings",
      title: "Elegant Garden Wedding",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
      description: "Beautiful outdoor ceremony with floral arrangements"
    },
    {
      id: 2,
      category: "weddings",
      title: "Beach Wedding Ceremony",
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=600",
      description: "Romantic beachside wedding at sunset"
    },
    {
      id: 3,
      category: "corporate",
      title: "Annual Corporate Gala",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600",
      description: "Professional corporate event with networking"
    },
    {
      id: 4,
      category: "corporate",
      title: "Product Launch Event",
      image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600",
      description: "Modern product launch with interactive displays"
    },
    {
      id: 5,
      category: "birthdays",
      title: "Kids Birthday Party",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600",
      description: "Fun-filled birthday celebration with themed decorations"
    },
    {
      id: 6,
      category: "birthdays",
      title: "Sweet 16 Celebration",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
      description: "Elegant sweet sixteen party with personalized touches"
    },
    {
      id: 7,
      category: "concerts",
      title: "Live Music Concert",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600",
      description: "Intimate concert venue with professional lighting"
    },
    {
      id: 8,
      category: "concerts",
      title: "Outdoor Music Festival",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600",
      description: "Large outdoor music festival with multiple stages"
    },
    {
      id: 9,
      category: "anniversaries",
      title: "Golden Anniversary",
      image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600",
      description: "50th anniversary celebration with elegant decor"
    },
    {
      id: 10,
      category: "weddings",
      title: "Indoor Wedding Reception",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
      description: "Luxurious indoor reception with crystal chandeliers"
    },
    {
      id: 11,
      category: "corporate",
      title: "Conference Setup",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600",
      description: "Professional conference with modern AV setup"
    },
    {
      id: 12,
      category: "birthdays",
      title: "Adult Birthday Party",
      image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600",
      description: "Sophisticated adult birthday celebration"
    }
  ];

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Event Gallery</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore our portfolio of successful events and get inspired for your own celebration
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 hover:bg-purple-50 border border-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedImage(image.image)}
            >
              <div className="relative group">
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                <p className="text-gray-600 text-sm">{image.description}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full capitalize">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No images found in this category.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Create Your Own Memorable Event?
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Let us help you plan an event that will be featured in our next gallery showcase
          </p>
          <a
            href="/contact"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-block"
          >
            Start Planning Today
          </a>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
