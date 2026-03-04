import { useState } from "react";
import { useQuery, useMutation } from "@/hooks/use-local-convex";
import { localApi as api } from "@/lib/db";
import AddEventModal from "../components/AddEventModal";
import BookingDetailModal from "../components/BookingDetailModal";
import { Event } from "@/lib/types";
import {
  Calendar, Clock, Users, MapPin, Tag, Mail, Phone,
  DollarSign, Eye, Trash2, ChevronDown, LayoutDashboard,
  CalendarCheck, Layers, Plus, TrendingUp, CheckCircle2,
  AlertCircle, XCircle, Pencil
} from "lucide-react";

// ── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { pill: string; bar: string; dot: string }> = {
  pending: { pill: "bg-amber-500/15 text-amber-300 border-amber-500/25", bar: "from-amber-400 to-orange-500", dot: "bg-amber-400" },
  confirmed: { pill: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25", bar: "from-emerald-500 to-teal-500", dot: "bg-emerald-400" },
  cancelled: { pill: "bg-red-500/15 text-red-300 border-red-500/25", bar: "from-red-500 to-rose-600", dot: "bg-red-400" },
  completed: { pill: "bg-blue-500/15 text-blue-300 border-blue-500/25", bar: "from-blue-500 to-indigo-500", dot: "bg-blue-400" },
};

const getStatus = (s: string) => STATUS_CONFIG[s] ?? STATUS_CONFIG.pending;

// ── InfoChip ─────────────────────────────────────────────────────────────────

function InfoChip({ icon, label, value, highlight = false }: {
  icon: React.ReactNode; label: string; value: string; highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-2 min-w-0">
      <span className="mt-0.5 text-white/25 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[9px] font-bold text-white/25 uppercase tracking-wider leading-none">{label}</p>
        <p className={`text-xs font-semibold mt-0.5 truncate ${highlight ? "gradient-text" : "text-white/70"}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

// ── BookingCard ───────────────────────────────────────────────────────────────

function BookingCard({ booking, onView, onStatusChange, onDelete }: {
  booking: any;
  onView: () => void;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  const cfg = getStatus(booking.status);

  return (
    <div className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] overflow-hidden transition-all duration-200">
      {/* Status bar */}
      <div className={`h-0.5 w-full bg-gradient-to-r ${cfg.bar}`} />

      <div className="p-5">
        {/* Row 1: Name + status select */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white leading-tight group-hover:text-violet-300 transition-colors">
              {booking.fullName}
            </h3>
            <p className="text-xs text-violet-400 font-medium mt-0.5 capitalize">
              {booking.eventTitle || booking.eventType}
            </p>
          </div>

          <div className="relative">
            <select
              value={booking.status}
              onChange={(e) => onStatusChange(booking._id, e.target.value)}
              className={`appearance-none text-xs font-semibold pl-3 pr-7 py-1.5 rounded-full border cursor-pointer outline-none transition-colors ${cfg.pill}`}
              style={{ colorScheme: "dark" }}
            >
              <option value="pending" className="bg-[#0F0F1A]">Pending</option>
              <option value="confirmed" className="bg-[#0F0F1A]">Confirmed</option>
              <option value="completed" className="bg-[#0F0F1A]">Completed</option>
              <option value="cancelled" className="bg-[#0F0F1A]">Cancelled</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 opacity-50" />
          </div>
        </div>

        {/* Row 2: Key details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          <InfoChip icon={<Calendar className="w-3.5 h-3.5" />} label="Event Date"
            value={new Date(booking.eventDate).toLocaleDateString(undefined, { dateStyle: "medium" })} />
          <InfoChip icon={<Clock className="w-3.5 h-3.5" />} label="Duration"
            value={booking.duration ? `${booking.duration} hrs` : "—"} />
          <InfoChip icon={<Users className="w-3.5 h-3.5" />} label="Guests"
            value={booking.guestCount ? `${booking.guestCount}` : "—"} />
          <InfoChip icon={<Tag className="w-3.5 h-3.5" />} label="Package"
            value={booking.packageType ? booking.packageType.charAt(0).toUpperCase() + booking.packageType.slice(1) : "—"} />
          <InfoChip icon={<MapPin className="w-3.5 h-3.5" />} label="Location"
            value={booking.city ? `${booking.venueName ? booking.venueName + ", " : ""}${booking.city}` : "—"} />
          <InfoChip icon={<DollarSign className="w-3.5 h-3.5" />} label="Total"
            value={`$${booking.totalPrice?.toLocaleString() ?? "—"}`} highlight />
        </div>

        {/* Contact */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-[10px] text-white/30">
          <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {booking.email}</span>
          <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {booking.phone}</span>
        </div>

        {/* Custom services */}
        {booking.packageType === "custom" && booking.services && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {Object.entries(booking.services as Record<string, boolean>)
              .filter(([, v]) => v)
              .map(([service]) => (
                <span key={service} className="text-[10px] font-medium px-2 py-0.5 bg-violet-500/10 text-violet-300 rounded-full border border-violet-500/20 capitalize">
                  {service}
                </span>
              ))}
          </div>
        )}

        {/* Notes */}
        {booking.notes && (
          <p className="text-[11px] text-white/25 italic mb-4 line-clamp-2">📝 {booking.notes}</p>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <span className="text-[10px] text-white/20">
            {booking.createdAt ? `Submitted ${new Date(booking.createdAt).toLocaleDateString()}` : ""}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onView}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.14] transition-all"
            >
              <Eye className="w-3.5 h-3.5" /> View
            </button>
            <button
              onClick={() => onDelete(booking._id)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400/70 hover:text-red-300 hover:bg-red-500/10 hover:border-red-500/30 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [bookingFilter, setBookingFilter] = useState("all");

  const allEvents = useQuery<Event[]>(api.events.getAllEvents) || [];
  const deleteEvent = useMutation(api.events.remove);

  const allBookings = useQuery<any[]>(api.bookings.getAll) || [];
  const updateBookingStatus = useMutation(api.bookings.updateStatus);
  const deleteBooking = useMutation(api.bookings.remove);

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try { await deleteEvent({ id }); } catch (e) { console.error(e); }
    }
  };

  const handleEditEvent = (event: Event) => {
    setEventToEdit(event);
    setIsAddEventModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddEventModalOpen(false);
    setEventToEdit(null);
  };

  const handleStatusChange = async (id: string, status: string) => {
    try { await updateBookingStatus({ id, status }); } catch (e) { console.error(e); }
  };

  const handleDeleteBooking = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try { await deleteBooking({ id }); } catch (e) { console.error(e); }
    }
  };

  const pendingCount = allBookings.filter((b) => b.status === "pending").length;
  const confirmedCount = allBookings.filter((b) => b.status === "confirmed").length;
  const totalRevenue = allBookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "bookings", label: "Bookings", icon: CalendarCheck, badge: pendingCount },
    { id: "events", label: "Events", icon: Layers },
  ];

  const filteredBookings = bookingFilter === "all"
    ? allBookings
    : allBookings.filter((b) => b.status === bookingFilter);

  const statCards = [
    {
      label: "Total Bookings",
      value: allBookings.length,
      icon: CalendarCheck,
      color: "from-violet-500 to-purple-600",
      sub: "All time",
    },
    {
      label: "Pending",
      value: pendingCount,
      icon: AlertCircle,
      color: "from-amber-400 to-orange-500",
      sub: "Needs review",
    },
    {
      label: "Confirmed",
      value: confirmedCount,
      icon: CheckCircle2,
      color: "from-emerald-400 to-teal-500",
      sub: "Active",
    },
    {
      label: "Est. Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: "from-pink-500 to-rose-600",
      sub: "Excl. cancelled",
    },
  ];

  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden bg-[#0F0F1A] pt-20 scrollbar-hide">
      {/* Ambient orbs */}
      <div className="orb orb-purple w-[600px] h-[600px] top-[-200px] right-[-200px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">

        {/* ── Header ── */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="section-badge mb-3 inline-block">Management Console</span>
            <h1 className="text-4xl font-black text-white">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-white/40 mt-1">Manage events, bookings, and view analytics.</p>
          </div>
          <button
            onClick={() => { setEventToEdit(null); setIsAddEventModalOpen(true); }}
            className="flex items-center gap-2 px-5 py-2.5 brand-gradient text-white rounded-xl font-bold shadow-glow hover:shadow-glow-pink transition-all duration-300 hover:scale-105 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Add Event
          </button>
        </div>

        {/* ── Tab bar ── */}
        <div className="flex gap-1 p-1 mb-10 bg-white/[0.03] border border-white/[0.06] rounded-2xl w-fit">
          {tabs.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === id
                ? "brand-gradient text-white shadow-glow"
                : "text-white/40 hover:text-white hover:bg-white/[0.05]"
                }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {badge !== undefined && badge > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-[#0F0F1A] text-[10px] font-black flex items-center justify-center">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ═══════════════ OVERVIEW ═══════════════ */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {statCards.map(({ label, value, icon: Icon, color, sub }) => (
                <div key={label} className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] p-6 card-hover overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${color} blur-2xl opacity-25`} />
                  </div>
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-3xl font-black text-white mb-0.5">{value}</p>
                  <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-0.5">{label}</p>
                  <p className="text-[10px] text-white/20">{sub}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent bookings */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                  <h3 className="font-black text-white text-sm">Recent Bookings</h3>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="text-xs text-violet-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    View all →
                  </button>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {allBookings.slice(0, 5).map((booking) => {
                    const cfg = getStatus(booking.status);
                    return (
                      <div key={booking._id} className="px-6 py-3.5 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                        <div>
                          <p className="text-sm font-bold text-white">{booking.fullName}</p>
                          <p className="text-xs text-white/30 mt-0.5">
                            {booking.eventType} · {new Date(booking.eventDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border capitalize ${cfg.pill}`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {allBookings.length === 0 && (
                    <p className="px-6 py-10 text-center text-white/20 text-sm">No bookings yet</p>
                  )}
                </div>
              </div>

              {/* Quick actions */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5">
                  <h3 className="font-black text-white text-sm">Quick Actions</h3>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    {
                      label: "Add New Event Package",
                      icon: Plus,
                      color: "from-violet-500 to-purple-600",
                      action: () => { setEventToEdit(null); setIsAddEventModalOpen(true); },
                    },
                    {
                      label: `Review Pending Bookings (${pendingCount})`,
                      icon: AlertCircle,
                      color: "from-amber-400 to-orange-500",
                      action: () => setActiveTab("bookings"),
                    },
                    {
                      label: "Manage Events",
                      icon: Layers,
                      color: "from-blue-500 to-indigo-600",
                      action: () => setActiveTab("events"),
                    },
                  ].map(({ label, icon: Icon, color, action }) => (
                    <button
                      key={label}
                      onClick={action}
                      className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] text-white/60 hover:text-white transition-all text-sm font-semibold text-left group"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ BOOKINGS ═══════════════ */}
        {activeTab === "bookings" && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
              <div>
                <h2 className="text-2xl font-black text-white">All Bookings</h2>
                <p className="text-white/30 text-sm mt-0.5">
                  {filteredBookings.length} of {allBookings.length} shown
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["all", "pending", "confirmed", "completed", "cancelled"].map((f) => {
                  const count = f === "all" ? allBookings.length : allBookings.filter((b) => b.status === f).length;
                  return (
                    <button
                      key={f}
                      onClick={() => setBookingFilter(f)}
                      className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl border capitalize transition-all ${bookingFilter === f
                        ? "brand-gradient text-white border-transparent shadow-glow"
                        : "bg-white/[0.03] text-white/40 border-white/[0.06] hover:text-white hover:border-white/[0.14]"
                        }`}
                    >
                      {f !== "all" && (
                        <span className={`w-1.5 h-1.5 rounded-full ${getStatus(f).dot}`} />
                      )}
                      {f}
                      <span className="opacity-50">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {filteredBookings.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {filteredBookings.map((booking) => (
                  <BookingCard
                    key={booking._id}
                    booking={booking}
                    onView={() => setSelectedBooking(booking)}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteBooking}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
                  <CalendarCheck className="w-9 h-9 text-violet-400" />
                </div>
                <p className="text-white/30 font-medium">
                  No {bookingFilter !== "all" ? bookingFilter : ""} bookings found.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════ EVENTS ═══════════════ */}
        {activeTab === "events" && (
          <div>
            <div className="flex items-center justify-between mb-7">
              <div>
                <h2 className="text-2xl font-black text-white">Event Packages</h2>
                <p className="text-white/30 text-sm mt-0.5">{allEvents.length} packages listed</p>
              </div>
              <button
                onClick={() => { setEventToEdit(null); setIsAddEventModalOpen(true); }}
                className="flex items-center gap-2 px-4 py-2.5 brand-gradient text-white rounded-xl font-bold text-sm shadow-glow hover:shadow-glow-pink transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4" /> Add New Event
              </button>
            </div>

            {allEvents.length > 0 ? (
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-12 px-6 py-3 border-b border-white/[0.05] text-[10px] font-bold text-white/25 uppercase tracking-widest">
                  <div className="col-span-5">Event</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-3">Pricing</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>

                <div className="divide-y divide-white/[0.04]">
                  {allEvents.map((event) => (
                    <div
                      key={event._id}
                      className="grid grid-cols-12 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Event info */}
                      <div className="col-span-5 flex items-center gap-3 min-w-0">
                        <img
                          className="h-11 w-11 rounded-xl object-cover shrink-0 border border-white/[0.08]"
                          src={event.imageUrl}
                          alt=""
                          onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/44"; }}
                        />
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors truncate">
                            {event.title}
                          </div>
                          <div className="text-xs text-white/25 truncate max-w-[180px]">
                            {event.shortDescription}
                          </div>
                        </div>
                      </div>

                      {/* Category */}
                      <div className="col-span-2">
                        <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 capitalize">
                          {event.category}
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="col-span-3 text-xs text-white/30 space-y-0.5">
                        <div>Basic: <span className="font-bold text-white/60">${event.pricing?.basic?.toLocaleString() ?? "—"}</span></div>
                        <div>Premium: <span className="font-bold text-white/60">${event.pricing?.premium?.toLocaleString() ?? "—"}</span></div>
                        <div>Luxury: <span className="font-bold text-white/60">${event.pricing?.luxury?.toLocaleString() ?? "—"}</span></div>
                      </div>

                      {/* Actions */}
                      <div className="col-span-2 flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/[0.08] text-white/40 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.14] transition-all"
                        >
                          <Pencil className="w-3 h-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event._id)}
                          className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400/60 hover:text-red-300 hover:bg-red-500/10 hover:border-red-500/30 transition-all"
                        >
                          <Trash2 className="w-3 h-3" /> Del
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-24 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-9 h-9 text-violet-400" />
                </div>
                <p className="text-white/30 font-medium mb-2">No event packages found.</p>
                <p className="text-white/15 text-sm">Add your first event package to get started.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={handleModalClose}
        eventToEdit={eventToEdit}
      />

      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}
