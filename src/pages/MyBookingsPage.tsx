import { useQuery } from "@/hooks/use-local-convex";
import { localApi as api } from "@/lib/db";
import { useAuth } from "@/lib/auth-context";
import { Clock, Calendar, CheckCircle, XCircle } from "lucide-react";

export default function MyBookingsPage() {
    const { user } = useAuth();
    const myBookings = useQuery<any[]>(api.bookings.getByUser, { email: user?.email }) || [];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "confirmed":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "cancelled":
                return <XCircle className="w-5 h-5 text-red-500" />;
            case "completed":
                return <CheckCircle className="w-5 h-5 text-blue-500" />;
            default:
                return <Clock className="w-5 h-5 text-yellow-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            case "completed":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-yellow-100 text-yellow-800";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-[6rem] pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
                    <p className="text-gray-600 mt-2">Track your event requests and confirmed celebrations</p>
                </div>

                {myBookings.length > 0 ? (
                    <div className="space-y-6">
                        {myBookings.map((booking) => (
                            <div key={booking._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900 mb-1">{booking.eventTitle}</h2>
                                            <div className="flex items-center text-purple-600 font-medium capitalize">
                                                <span>{booking.eventType} Event</span>
                                                <span className="mx-2 text-gray-300">•</span>
                                                <span>{booking.packageType} Package</span>
                                            </div>
                                        </div>
                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                                            {getStatusIcon(booking.status)}
                                            <span className="capitalize">{booking.status}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                        <div className="flex items-start gap-3">
                                            <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date</p>
                                                <p className="text-gray-900 font-medium">{new Date(booking.eventDate).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</p>
                                                <p className="text-gray-900 font-medium">{booking.duration} Hours</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Est.</p>
                                                <p className="text-purple-700 font-bold">${booking.totalPrice?.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {booking.packageType === "custom" && (
                                        <div className="bg-purple-50 rounded-lg p-4 mb-6">
                                            <p className="text-sm font-semibold text-purple-800 mb-2">Selected Services:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {Object.entries(booking.services as Record<string, boolean>).map(([service, selected]) => (
                                                    selected ? (
                                                        <span key={service} className="bg-white text-purple-700 text-xs px-2.5 py-1 rounded-md border border-purple-100 capitalize">
                                                            {service}
                                                        </span>
                                                    ) : null
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-end border-t border-gray-100 pt-6">
                                        <button className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
                                            View Details & Receipt
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Calendar className="w-10 h-10 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bookings Found</h2>
                        <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                            You haven't made any event bookings yet. Start planning your first celebration today!
                        </p>
                        <a href="/events" className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-purple-200">
                            Browse Events
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
