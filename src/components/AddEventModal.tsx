import { useState, useEffect } from "react";
import { useMutation } from "@/hooks/use-local-convex";
import { localApi as api } from "@/lib/db";
import { Event } from "@/lib/types";

interface AddEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    /** When provided, the modal operates in "edit" mode */
    eventToEdit?: Event | null;
}

const EMPTY_FORM = {
    title: "",
    category: "wedding",
    imageUrl: "",
    description: "",
    shortDescription: "",
    features: "",
    basicPrice: "",
    premiumPrice: "",
    luxuryPrice: "",
};

export default function AddEventModal({ isOpen, onClose, eventToEdit }: AddEventModalProps) {
    const createEvent = useMutation(api.events.create);
    const updateEvent = useMutation(api.events.update);

    const isEditMode = Boolean(eventToEdit);

    const [formData, setFormData] = useState(EMPTY_FORM);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pre-fill form when editing an event
    useEffect(() => {
        if (eventToEdit) {
            setFormData({
                title: eventToEdit.title || "",
                category: eventToEdit.category || "wedding",
                imageUrl: eventToEdit.imageUrl || "",
                description: eventToEdit.description || "",
                shortDescription: eventToEdit.shortDescription || "",
                features: (eventToEdit.features || []).join(", "),
                basicPrice: String(eventToEdit.pricing?.basic ?? ""),
                premiumPrice: String(eventToEdit.pricing?.premium ?? ""),
                luxuryPrice: String(eventToEdit.pricing?.luxury ?? ""),
            });
        } else {
            setFormData(EMPTY_FORM);
        }
    }, [eventToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const featuresArray = formData.features
                .split(",")
                .map((f) => f.trim())
                .filter((f) => f !== "");

            const payload = {
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
            };

            if (isEditMode && eventToEdit) {
                await updateEvent({ id: eventToEdit._id, ...payload });
            } else {
                await createEvent({
                    ...payload,
                    timeline: [
                        { step: "Initial Consultation", description: "Meet with our planning team to discuss your vision" },
                        { step: "Event Day", description: "Full coordination and management of your event" },
                    ],
                });
            }

            onClose();
            setFormData(EMPTY_FORM);
        } catch (error) {
            console.error("Failed to save event:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const field = (
        label: string,
        key: keyof typeof formData,
        opts: { type?: string; required?: boolean; placeholder?: string; rows?: number } = {}
    ) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            {opts.rows ? (
                <textarea
                    required={opts.required}
                    rows={opts.rows}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    placeholder={opts.placeholder}
                />
            ) : (
                <input
                    type={opts.type || "text"}
                    required={opts.required}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    placeholder={opts.placeholder}
                />
            )}
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {isEditMode ? "Edit Event Package" : "Add New Event Package"}
                        </h2>
                        {isEditMode && (
                            <p className="text-sm text-gray-400 mt-0.5">Editing: {eventToEdit?.title}</p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none transition-colors"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {field("Title", "title", { required: true, placeholder: "e.g. Elegant Garden Wedding" })}

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
                        {field("Image URL", "imageUrl", { type: "url", required: true, placeholder: "https://images.unsplash.com/..." })}
                    </div>

                    {field("Short Description", "shortDescription", { required: true, placeholder: "Brief summary for cards" })}
                    {field("Long Description", "description", { required: true, placeholder: "Detailed description of the event package", rows: 4 })}
                    {field("Features (comma-separated)", "features", { placeholder: "Venue decoration, Catering, Photography, ..." })}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
                        {field("Basic Price ($)", "basicPrice", { type: "number", placeholder: "2500" })}
                        {field("Premium Price ($)", "premiumPrice", { type: "number", placeholder: "4500" })}
                        {field("Luxury Price ($)", "luxuryPrice", { type: "number", placeholder: "7500" })}
                    </div>

                    <div className="pt-4 flex gap-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed font-semibold"
                        >
                            {isSubmitting
                                ? (isEditMode ? "Saving…" : "Adding…")
                                : (isEditMode ? "Save Changes" : "Add Event")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
