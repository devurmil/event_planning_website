import { useState, FormEvent } from 'react';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventName?: string;
}

export default function BookingModal({ isOpen, onClose, eventName }: BookingModalProps) {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        // 1. Event Basics
        eventType: 'Wedding',
        eventTitle: eventName || '',
        eventDate: '',
        eventTime: '',
        duration: '',

        // 2. Guest & Venue
        guestCount: '',
        venueName: '',
        city: '',
        locationType: 'indoor', // indoor/outdoor

        // 3. Budget & Package
        budgetRange: '',
        packageType: 'basic',

        // 4. Services
        services: {
            decoration: false,
            catering: false,
            photography: false,
            music: false,
            lighting: false,
            hosting: false,
        },

        // 5. Contact
        fullName: '',
        phone: '',
        email: '',

        // 6. Custom Notes
        notes: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            services: {
                ...prev.services,
                [name]: checked
            }
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Booking Request:', formData);
        // Here you would typically send data to backend
        alert('Booking request received! We will contact you shortly.');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-bold text-gray-900">Book Your Event</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">

                    {/* 1. Event Basics */}
                    <section>
                        <h3 className="text-lg font-semibold text-purple-700 mb-4 border-b pb-2">1. Event Basics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                                <select
                                    name="eventType"
                                    value={formData.eventType}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                                >
                                    <option value="Wedding">Wedding</option>
                                    <option value="Birthday">Birthday</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Concert">Concert</option>
                                    <option value="Anniversary">Anniversary</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title / Occasion Name</label>
                                <input
                                    type="text"
                                    name="eventTitle"
                                    value={formData.eventTitle}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
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
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                    <input
                                        type="time"
                                        name="eventTime"
                                        value={formData.eventTime}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Hours)</label>
                                    <input
                                        type="number"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        min="1"
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. Guest & Venue Details */}
                    <section>
                        <h3 className="text-lg font-semibold text-purple-700 mb-4 border-b pb-2">2. Guest & Venue Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                                <input
                                    type="number"
                                    name="guestCount"
                                    value={formData.guestCount}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Venue Name</label>
                                <input
                                    type="text"
                                    name="venueName"
                                    value={formData.venueName}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <div className="flex items-center space-x-6 mt-6">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="locationType"
                                        value="indoor"
                                        checked={formData.locationType === 'indoor'}
                                        onChange={handleInputChange}
                                        className="mr-2 text-purple-600 focus:ring-purple-500"
                                    />
                                    Indoor
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="locationType"
                                        value="outdoor"
                                        checked={formData.locationType === 'outdoor'}
                                        onChange={handleInputChange}
                                        className="mr-2 text-purple-600 focus:ring-purple-500"
                                    />
                                    Outdoor
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* 3. Budget & Package */}
                    <section>
                        <h3 className="text-lg font-semibold text-purple-700 mb-4 border-b pb-2">3. Budget & Package</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                                <select
                                    name="budgetRange"
                                    value={formData.budgetRange}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                                >
                                    <option value="">Select Range</option>
                                    <option value="<1000">Less than $1,000</option>
                                    <option value="1000-5000">$1,000 - $5,000</option>
                                    <option value="5000-10000">$5,000 - $10,000</option>
                                    <option value="10000+">$10,000+</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Package</label>
                                <select
                                    name="packageType"
                                    value={formData.packageType}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                                >
                                    <option value="basic">Basic</option>
                                    <option value="premium">Premium</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* 4. Services Needed */}
                    <section>
                        <h3 className="text-lg font-semibold text-purple-700 mb-4 border-b pb-2">4. Services Needed</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {Object.keys(formData.services).map((service) => (
                                <label key={service} className="flex items-center capitalize">
                                    <input
                                        type="checkbox"
                                        name={service}
                                        checked={formData.services[service as keyof typeof formData.services]}
                                        onChange={handleCheckboxChange}
                                        className="mr-2 text-purple-600 rounded focus:ring-purple-500"
                                    />
                                    {service}
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* 5. Contact Details */}
                    <section>
                        <h3 className="text-lg font-semibold text-purple-700 mb-4 border-b pb-2">5. Contact Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                        </div>
                    </section>

                    {/* 6. Custom Notes */}
                    <section>
                        <h3 className="text-lg font-semibold text-purple-700 mb-4 border-b pb-2">6. Custom Notes</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Special requests, themes, or cultural requirements</label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                            ></textarea>
                        </div>
                    </section>

                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded hover:from-purple-700 hover:to-indigo-700 shadow-md transition-all transform hover:scale-105"
                        >
                            Submit Booking Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
