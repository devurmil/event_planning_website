import { useState } from "react";
import { useQuery, useMutation } from "@/hooks/use-local-convex";
import { localApi as api } from "@/lib/db";
import AddEventModal from "../components/AddEventModal";
import BookingDetailModal from "../components/BookingDetailModal";
import { Event } from "@/lib/types";
import {
  Calendar, Clock, Users, MapPin, Tag, Mail, Phone,
  DollarSign, Eye, Trash2, ChevronDown
} from "lucide-react";

// ── Status helpers ──────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  pending:   "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100  text-green-800  border-green-200",
  cancelled: "bg-red-100    text-red-800    border-red-200",
  completed: "bg-blue-100   text-blue-800   border-blue-200",
};

const STATUS_DOT: Record<string, string> = {
  pending:   "bg-yellow-400",
  confirmed: "bg-green-500",
  cancelled: "bg-red-500",
  completed: "bg-blue-500",
};

// ── Booking Card ─────────────────────────────────────────────────────────────

function BookingCard({
  booking,
  onView,
  onStatusChange,
  onDelete,
}: {
  booking: any;
  onView: () => void;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  const statusStyle = STATUS_STYLES[booking.status] ?? "bg-gray-100 text-gray-700 border-gray-200";
  const dotStyle    = STATUS_DOT[booking.status]    ?? "bg-gray-400";

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">

      {/* Top colour strip based on status */}
      <div className={`h-1 w-full ${dotStyle}`} />

      <div className="p-5">
        {/* ── Row 1: name + status badge + status changer ── */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900 leading-tight">{booking.fullName}</h3>
            <p className="text-sm text-purple-600 font-medium mt-0.5 capitalize">{booking.eventTitle || booking.eventType}</p>
          </div>

          {/* Status select disguised as a pill */}
          <div className="relative">
            <select
              value={booking.status}
              onChange={(e) => onStatusChange(booking._id, e.target.value)}
              className={`appearance-none text-xs font-semibold pl-2.5 pr-7 py-1.5 rounded-full border cursor-pointer outline-none transition-colors ${statusStyle}`}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 opacity-60" />
          </div>
        </div>

        {/* ── Row 2: key detail grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          <InfoChip icon={<Calendar className="w-3.5 h-3.5" />} label="Event Date"
            value={new Date(booking.eventDate).toLocaleDateString(undefined, { dateStyle: "medium" })} />
          <InfoChip icon={<Clock className="w-3.5 h-3.5" />} label="Duration"
            value={booking.duration ? `${booking.duration} hrs` : "—"} />
          <InfoChip icon={<Users className="w-3.5 h-3.5" />} label="Guests"
            value={booking.guestCount ? `${booking.guestCount} guests` : "—"} />
          <InfoChip icon={<Tag className="w-3.5 h-3.5" />} label="Package"
            value={booking.packageType ? booking.packageType.charAt(0).toUpperCase() + booking.packageType.slice(1) : "—"} />
          <InfoChip icon={<MapPin className="w-3.5 h-3.5" />} label="Location"
            value={booking.city ? `${booking.venueName ? booking.venueName + ", " : ""}${booking.city}` : "—"} />
          <InfoChip icon={<DollarSign className="w-3.5 h-3.5" />} label="Total"
            value={`$${booking.totalPrice?.toLocaleString() ?? "—"}`}
            highlight />
        </div>

        {/* ── Row 3: contact strip ── */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-gray-400" /> {booking.email}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-gray-400" /> {booking.phone}
          </span>
        </div>

        {/* ── Custom services tags ── */}
        {booking.packageType === "custom" && booking.services && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {Object.entries(booking.services as Record<string, boolean>)
              .filter(([, v]) => v)
              .map(([service]) => (
                <span key={service} className="text-[10px] font-medium px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full border border-purple-100 capitalize">
                  {service}
                </span>
              ))}
          </div>
        )}

        {/* ── Notes preview ── */}
        {booking.notes && (
          <p className="text-xs text-gray-400 italic mb-4 line-clamp-2">
            📝 {booking.notes}
          </p>
        )}

        {/* ── Actions ── */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-[10px] text-gray-400">
            {booking.createdAt
              ? `Submitted ${new Date(booking.createdAt).toLocaleDateString()}`
              : ""}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onView}
              className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 hover:text-white bg-purple-50 hover:bg-purple-600 border border-purple-200 hover:border-purple-600 px-3 py-1.5 rounded-lg transition-all duration-200"
            >
              <Eye className="w-3.5 h-3.5" />
              View Details
            </button>
            <button
              onClick={() => onDelete(booking._id)}
              className="flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-200 hover:border-red-600 px-3 py-1.5 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoChip({
  icon, label, value, highlight = false,
}: {
  icon: React.ReactNode; label: string; value: string; highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-2 min-w-0">
      <span className="mt-0.5 text-gray-400 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider leading-none">{label}</p>
        <p className={`text-xs font-semibold mt-0.5 truncate ${highlight ? "text-purple-700" : "text-gray-800"}`}>
          {value}
        </p>
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
      try { await deleteEvent({ id }); }
      catch (e) { console.error(e); }
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
    try { await updateBookingStatus({ id, status }); }
    catch (e) { console.error(e); }
  };

  const handleDeleteBooking = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try { await deleteBooking({ id }); }
      catch (e) { console.error(e); }
    }
  };

  const tabs = [
    { id: "overview", name: "Overview",  icon: "📊" },
    { id: "bookings", name: "Bookings",  icon: "📅" },
    { id: "events",   name: "Events",    icon: "🎉" },
  ];

  const filteredBookings = bookingFilter === "all"
    ? allBookings
    : allBookings.filter((b) => b.status === bookingFilter);

  const stats = [
    { label: "Total Bookings",    value: String(allBookings.length), badge: "Live", color: "text-purple-600", bg: "bg-purple-50", icon: "📋" },
    { label: "Pending Requests",  value: String(allBookings.filter(b => b.status === "pending").length),   badge: "Action needed", color: "text-yellow-700", bg: "bg-yellow-50", icon: "⏳" },
    { label: "Confirmed",         value: String(allBookings.filter(b => b.status === "confirmed").length), badge: "Live", color: "text-green-700",  bg: "bg-green-50",  icon: "✅" },
    { label: "Active Events",     value: String(allEvents.length), badge: "Live", color: "text-blue-700",   bg: "bg-blue-50",   icon: "🎉" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-[6rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage your events and bookings</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span>{tab.name}
                {tab.id === "bookings" && allBookings.filter(b => b.status === "pending").length > 0 && (
                  <span className="ml-2 text-[10px] font-bold bg-yellow-400 text-white px-1.5 py-0.5 rounded-full">
                    {allBookings.filter(b => b.status === "pending").length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* ── Overview ── */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className={`${stat.bg} rounded-xl p-5 border border-white shadow-sm`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/70 ${stat.color}`}>
                      {stat.badge}
                    </span>
                  </div>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent bookings list */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Recent Bookings</h3>
                  <button onClick={() => setActiveTab("bookings")} className="text-xs text-purple-600 hover:underline">View all →</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {allBookings.slice(0, 5).map((booking) => (
                    <div key={booking._id} className="px-6 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{booking.fullName}</p>
                        <p className="text-xs text-gray-500">{booking.eventType} · {new Date(booking.eventDate).toLocaleDateString()}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border capitalize ${STATUS_STYLES[booking.status] ?? "bg-gray-100 text-gray-700"}`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                  {allBookings.length === 0 && (
                    <p className="px-6 py-8 text-center text-gray-400 text-sm">No bookings yet</p>
                  )}
                </div>
              </div>

              {/* Quick actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                </div>
                <div className="p-6 space-y-3">
                  <button onClick={() => { setEventToEdit(null); setIsAddEventModalOpen(true); }}
                    className="w-full text-left px-4 py-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors font-medium text-sm">
                    🎉 Add New Event Package
                  </button>
                  <button onClick={() => setActiveTab("bookings")}
                    className="w-full text-left px-4 py-3 bg-yellow-50 text-yellow-700 rounded-xl hover:bg-yellow-100 transition-colors font-medium text-sm">
                    ⏳ Review Pending Bookings ({allBookings.filter(b => b.status === "pending").length})
                  </button>
                  <button onClick={() => setActiveTab("events")}
                    className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors font-medium text-sm">
                    📋 Manage Events
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Bookings Tab (Card Grid) ── */}
        {activeTab === "bookings" && (
          <div>
            {/* Filter bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">All Bookings</h2>
                <p className="text-sm text-gray-400">{filteredBookings.length} of {allBookings.length} shown</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["all", "pending", "confirmed", "completed", "cancelled"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setBookingFilter(f)}
                    className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border capitalize transition-all ${
                      bookingFilter === f
                        ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                        : "bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-600"
                    }`}
                  >
                    {f}
                    {f !== "all" && (
                      <span className="ml-1 opacity-70">
                        ({allBookings.filter(b => b.status === f).length})
                      </span>
                    )}
                  </button>
                ))}
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
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-16 text-center">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-gray-500 font-medium">No {bookingFilter !== "all" ? bookingFilter : ""} bookings found.</p>
              </div>
            )}
          </div>
        )}

        {/* ── Events Tab ── */}
        {activeTab === "events" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Event Packages</h3>
                <p className="text-sm text-gray-400 mt-0.5">{allEvents.length} packages</p>
              </div>
              <button
                onClick={() => { setEventToEdit(null); setIsAddEventModalOpen(true); }}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
              >
                + Add New Event
              </button>
            </div>
            <div className="overflow-x-auto">
              {allEvents.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pricing</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {allEvents.map((event) => (
                      <tr key={event._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img className="h-10 w-10 rounded-lg object-cover shrink-0" src={event.imageUrl} alt=""
                              onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/40"; }} />
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{event.title}</div>
                              <div className="text-xs text-gray-400 truncate max-w-[220px]">{event.shortDescription}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 capitalize">
                            {event.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs text-gray-500 space-y-0.5">
                            <div>Basic: <span className="font-semibold text-gray-800">${event.pricing?.basic?.toLocaleString() ?? "—"}</span></div>
                            <div>Premium: <span className="font-semibold text-gray-800">${event.pricing?.premium?.toLocaleString() ?? "—"}</span></div>
                            <div>Luxury: <span className="font-semibold text-gray-800">${event.pricing?.luxury?.toLocaleString() ?? "—"}</span></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button onClick={() => handleEditEvent(event)}
                            className="text-purple-600 hover:text-purple-900 transition-colors mr-4">Edit</button>
                          <button onClick={() => handleDeleteEvent(event._id)}
                            className="text-red-600 hover:text-red-900 transition-colors">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">No event packages found.</p>
                  <p className="text-sm text-gray-300 mt-1">Add your first event package to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
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
