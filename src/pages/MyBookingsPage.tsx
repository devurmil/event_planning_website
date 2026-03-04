import { useState } from "react";
import { useQuery } from "@/hooks/use-local-convex";
import { localApi as api } from "@/lib/db";
import { useAuth } from "@/lib/auth-context";
import { Clock, Calendar, CheckCircle, XCircle, Loader2, FileText, ArrowRight, Sparkles } from "lucide-react";
import BookingDetailModal from "@/components/BookingDetailModal";
import { Link } from "react-router-dom";

const STATUS_CONFIG: Record<string, { label: string; icon: React.ReactNode; pill: string; bar: string }> = {
    confirmed: {
        label: "Confirmed",
        icon: <CheckCircle className="w-4 h-4" />,
        pill: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
        bar: "from-emerald-500 to-teal-500",
    },
    cancelled: {
        label: "Cancelled",
        icon: <XCircle className="w-4 h-4" />,
        pill: "bg-red-500/15 text-red-300 border-red-500/20",
        bar: "from-red-500 to-rose-600",
    },
    completed: {
        label: "Completed",
        icon: <CheckCircle className="w-4 h-4" />,
        pill: "bg-blue-500/15 text-blue-300 border-blue-500/20",
        bar: "from-blue-500 to-indigo-500",
    },
    pending: {
        label: "Pending",
        icon: <Clock className="w-4 h-4" />,
        pill: "bg-amber-500/15 text-amber-300 border-amber-500/20",
        bar: "from-amber-400 to-orange-500",
    },
};

const getStatus = (status: string) =>
    STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

export default function MyBookingsPage() {
    const { user, isLoading } = useAuth();
    const myBookings = useQuery<any[]>(api.bookings.getByUser, { email: user?.email || null }) || [];
    const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

    /* ── Loading ── */
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0F0F1A] pt-28 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl brand-gradient flex items-center justify-center shadow-glow animate-pulse">
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                    <p className="text-white/40 font-medium">Loading your bookings…</p>
                </div>
            </div>
        );
    }

    /* ── Not signed in ── */
    if (!user) {
        return (
            <div className="min-h-screen bg-[#0F0F1A] pt-28 flex items-center justify-center px-4">
                <div className="text-center max-w-sm">
                    <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
                        <Calendar className="w-10 h-10 text-violet-400" />
                    </div>
                    <h2 className="text-2xl font-black text-white mb-2">Sign In Required</h2>
                    <p className="text-white/40 mb-8">Please log in to view your bookings.</p>
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 px-8 py-3 brand-gradient text-white rounded-xl font-bold shadow-glow hover:shadow-glow-pink transition-all duration-300 hover:scale-105"
                    >
                        Log In <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F0F1A] pt-28 pb-20 overflow-x-hidden">
            {/* ── Ambient orbs ── */}
            <div className="orb orb-purple w-[500px] h-[500px] top-[-100px] right-[-150px] opacity-10" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="mb-10">
                    <span className="section-badge mb-4 inline-block">Your Events</span>
                    <h1 className="text-4xl md:text-5xl font-black text-white">My <span className="gradient-text">Bookings</span></h1>
                    <p className="text-white/40 mt-2 text-lg">Track your event requests and confirmed celebrations.</p>
                </div>

                {myBookings.length > 0 ? (
                    <div className="space-y-5">
                        {myBookings.map((booking) => {
                            const cfg = getStatus(booking.status);
                            return (
                                <div
                                    key={booking._id}
                                    className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] overflow-hidden card-hover"
                                >
                                    {/* Gradient top bar */}
                                    <div className={`h-0.5 bg-gradient-to-r ${cfg.bar}`} />

                                    <div className="p-6 sm:p-8">
                                        {/* Row 1: Title + status */}
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                            <div>
                                                <h2 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors mb-1">
                                                    {booking.eventTitle}
                                                </h2>
                                                <div className="flex items-center gap-2 text-sm text-white/40 font-medium capitalize">
                                                    <span>{booking.eventType} Event</span>
                                                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                                                    <span>{booking.packageType} Package</span>
                                                </div>
                                            </div>

                                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold border ${cfg.pill}`}>
                                                {cfg.icon}
                                                <span className="capitalize">{booking.status}</span>
                                            </div>
                                        </div>

                                        {/* Row 2: Key details grid */}
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-6">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                                                    <Calendar className="w-4 h-4 text-violet-400" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest">Date</p>
                                                    <p className="text-white text-sm font-semibold mt-0.5">
                                                        {new Date(booking.eventDate).toLocaleDateString(undefined, { dateStyle: "medium" })}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                                                    <Clock className="w-4 h-4 text-violet-400" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest">Duration</p>
                                                    <p className="text-white text-sm font-semibold mt-0.5">{booking.duration} Hours</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center shrink-0 shadow-glow">
                                                    <span className="text-white text-xs font-bold">$</span>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest">Total Est.</p>
                                                    <p className="gradient-text text-sm font-black mt-0.5">
                                                        ${booking.totalPrice?.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Custom services */}
                                        {booking.packageType === "custom" && (
                                            <div className="mb-6 p-4 rounded-xl bg-violet-500/5 border border-violet-500/10">
                                                <p className="text-xs font-bold text-violet-300 mb-3 uppercase tracking-widest">Selected Services</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {Object.entries(booking.services as Record<string, boolean>).map(([service, selected]) =>
                                                        selected ? (
                                                            <span
                                                                key={service}
                                                                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/[0.05] border border-white/[0.08] text-white/60 capitalize"
                                                            >
                                                                {service}
                                                            </span>
                                                        ) : null
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="flex justify-end border-t border-white/5 pt-5">
                                            <button
                                                onClick={() => setSelectedBooking(booking)}
                                                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-200"
                                            >
                                                <FileText className="w-4 h-4" />
                                                View Details & Receipt
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* ── Empty state ── */
                    <div className="text-center py-24">
                        <div className="w-24 h-24 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
                            <Sparkles className="w-10 h-10 text-violet-400" />
                        </div>
                        <h2 className="text-2xl font-black text-white mb-2">No Bookings Yet</h2>
                        <p className="text-white/40 mb-8 max-w-sm mx-auto leading-relaxed">
                            You haven't made any event bookings yet. Start planning your first celebration today!
                        </p>
                        <Link
                            to="/events"
                            className="inline-flex items-center gap-2 px-8 py-3 brand-gradient text-white rounded-xl font-bold shadow-glow hover:shadow-glow-pink transition-all duration-300 hover:scale-105"
                        >
                            Browse Events <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}
            </div>

            {selectedBooking && (
                <BookingDetailModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
            )}
        </div>
    );
}
