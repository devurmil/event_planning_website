import { useState } from "react";
import { useMutation } from "@/hooks/use-local-convex";
import { localApi as api } from "@/lib/db";

interface AddEventModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddEventModal({ isOpen, onClose }: AddEventModalProps) {
    const createEvent = useMutation(api.events.create);
    const [formData, setFormData] = useState({
        title: "",
        category: "wedding",
        imageUrl: "",
        description: "",
        shortDescription: "",
        features: "",
        basicPrice: "",
        premiumPrice: "",
        luxuryPrice: "",
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const featuresArray = formData.features.split(",").map(f => f.trim()).filter(f => f !== "");
            await createEvent({
                title: formData.title,
                category: formData.category,
                imageUrl: formData.imageUrl,
                description: formData.description,
                shortDescription: formData.shortDescription,
                features: featuresArray,
                pricing: {
                    basic: Number(formData.basicPrice) || 0,
                    premium: Number(formData.premiumPrice) || 0,
                    luxury: Number(formData.luxuryPrice) || 0,
                },
                gallery: [formData.imageUrl],
                timeline: [
                    { step: "Initial Consultation", description: "Meet with our planning team to discuss your vision" },
                    { step: "Event Day", description: "Full coordination and management of your event" },
                ],
            });
            onClose();
            setFormData({
                title: "",
                category: "wedding",
                imageUrl: "",
                description: "",
                shortDescription: "",
                features: "",
                basicPrice: "",
                premiumPrice: "",
                luxuryPrice: "",
            });
        } catch (error) {
            console.error("Failed to create event:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Add New Event Package</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Elegant Garden Wedding"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="wedding">Wedding</option>
                                <option value="corporate">Corporate</option>
                                <option value="birthday">Birthday</option>
                                <option value="concert">Concert</option>
                                <option value="anniversary">Anniversary</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input
                                type="url"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                placeholder="https://images.unsplash.com/..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            value={formData.shortDescription}
                            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                            placeholder="Brief summary for cards"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Long Description</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Detailed description of the event package"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            value={formData.features}
                            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                            placeholder="Venue decoration, Catering, Photography, ..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Basic Price ($)</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                value={formData.basicPrice}
                                onChange={(e) => setFormData({ ...formData, basicPrice: e.target.value })}
                                placeholder="2500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Premium Price ($)</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                value={formData.premiumPrice}
                                onChange={(e) => setFormData({ ...formData, premiumPrice: e.target.value })}
                                placeholder="4500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Luxury Price ($)</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                value={formData.luxuryPrice}
                                onChange={(e) => setFormData({ ...formData, luxuryPrice: e.target.value })}
                                placeholder="7500"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Add Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
