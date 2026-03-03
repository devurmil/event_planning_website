import { X, Download, Calendar, Clock, Users, MapPin, Tag, Phone, Mail, User, FileText } from "lucide-react";
import jsPDF from "jspdf";

interface Booking {
    _id: string;
    eventTitle: string;
    eventType: string;
    eventDate: string;
    duration: number;
    guestCount?: number;
    venueName?: string;
    city?: string;
    locationType?: string;
    packageType: string;
    totalPrice: number;
    services?: Record<string, boolean>;
    fullName: string;
    phone: string;
    email: string;
    notes?: string;
    status: string;
    createdAt?: string;
}

interface Props {
    booking: Booking;
    onClose: () => void;
}

const STATUS_COLORS: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
};

const SERVICE_PRICES: Record<string, number> = {
    decoration: 500,
    catering: 1200,
    photography: 800,
    music: 450,
    lighting: 350,
    hosting: 600,
};

// Generate a human-readable receipt/booking reference ID
const shortId = (id: string) => `EVT-${id.slice(-8).toUpperCase()}`;

export default function BookingDetailModal({ booking, onClose }: Props) {
    const selectedServices = booking.services
        ? Object.entries(booking.services).filter(([, v]) => v)
        : [];

    const handleDownloadPDF = () => {
        const doc = new jsPDF({ unit: "pt", format: "a4" });
        const pageW = doc.internal.pageSize.getWidth();
        const margin = 48;
        let y = 0;

        // ── Header Bar ──────────────────────────────────────────────────
        doc.setFillColor(88, 28, 135); // purple-900
        doc.rect(0, 0, pageW, 90, "F");

        // Company name
        doc.setFont("helvetica", "bold");
        doc.setFontSize(26);
        doc.setTextColor(255, 255, 255);
        doc.text("EventSphere", margin, 42);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(216, 180, 254); // purple-300
        doc.text("Premium Event Planning Services", margin, 62);

        // Receipt label (right side)
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(255, 255, 255);
        doc.text("BOOKING RECEIPT", pageW - margin, 42, { align: "right" });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(216, 180, 254);
        doc.text(`Ref: ${shortId(booking._id)}`, pageW - margin, 62, { align: "right" });

        y = 110;

        // ── Status Pill ─────────────────────────────────────────────────
        const statusLabel = booking.status.toUpperCase();
        const statusColors: Record<string, [number, number, number]> = {
            pending: [254, 243, 199],
            confirmed: [220, 252, 231],
            cancelled: [254, 226, 226],
            completed: [219, 234, 254],
        };
        const statusTextColors: Record<string, [number, number, number]> = {
            pending: [146, 64, 14],
            confirmed: [22, 101, 52],
            cancelled: [153, 27, 27],
            completed: [30, 58, 138],
        };
        const bg = statusColors[booking.status] || [229, 231, 235];
        const fg = statusTextColors[booking.status] || [55, 65, 81];
        doc.setFillColor(...bg);
        doc.roundedRect(margin, y - 12, 90, 20, 4, 4, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...fg);
        doc.text(statusLabel, margin + 45, y + 1.5, { align: "center" });

        // Issued date (right)
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(107, 114, 128);
        const issuedDate = booking.createdAt
            ? new Date(booking.createdAt).toLocaleDateString(undefined, { dateStyle: "long" })
            : new Date().toLocaleDateString(undefined, { dateStyle: "long" });
        doc.text(`Issued: ${issuedDate}`, pageW - margin, y + 1.5, { align: "right" });
        y += 30;

        // ── Divider ─────────────────────────────────────────────────────
        doc.setDrawColor(229, 231, 235);
        doc.setLineWidth(1);
        doc.line(margin, y, pageW - margin, y);
        y += 20;

        // ── Two-column: Client Info & Event Info ─────────────────────────
        const colW = (pageW - margin * 2 - 20) / 2;

        // Section helper
        const sectionTitle = (text: string, x: number, yy: number) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(109, 40, 217); // purple-700
            doc.text(text.toUpperCase(), x, yy);
            return yy + 14;
        };

        const rowText = (label: string, value: string, x: number, yy: number, colWidth: number) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(8.5);
            doc.setTextColor(107, 114, 128);
            doc.text(label, x, yy);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9.5);
            doc.setTextColor(17, 24, 39);
            const wrapped = doc.splitTextToSize(value || "—", colWidth - 4);
            doc.text(wrapped, x, yy + 13);
            return yy + 13 + wrapped.length * 12;
        };

        // Left col: CLIENT INFO
        let ly = sectionTitle("Client Information", margin, y);
        ly = rowText("Full Name", booking.fullName, margin, ly, colW);
        ly = rowText("Email Address", booking.email, margin, ly + 4, colW);
        ly = rowText("Phone Number", booking.phone, margin, ly + 4, colW);

        // Right col: EVENT INFO
        const rx = margin + colW + 20;
        let ry = sectionTitle("Event Information", rx, y);
        ry = rowText("Event Title", booking.eventTitle, rx, ry, colW);
        ry = rowText("Event Type", booking.eventType, rx, ry + 4, colW);
        ry = rowText(
            "Event Date",
            new Date(booking.eventDate).toLocaleDateString(undefined, { dateStyle: "long" }),
            rx, ry + 4, colW
        );

        y = Math.max(ly, ry) + 24;

        // ── Divider ─────────────────────────────────────────────────────
        doc.setDrawColor(229, 231, 235);
        doc.line(margin, y, pageW - margin, y);
        y += 20;

        // ── Second row: Venue & Package ──────────────────────────────────
        let ly2 = sectionTitle("Venue & Logistics", margin, y);
        ly2 = rowText("Venue Name", booking.venueName || "—", margin, ly2, colW);
        ly2 = rowText("City", booking.city || "—", margin, ly2 + 4, colW);
        ly2 = rowText("Location Type", booking.locationType ? booking.locationType.charAt(0).toUpperCase() + booking.locationType.slice(1) : "—", margin, ly2 + 4, colW);
        ly2 = rowText("Duration", `${booking.duration || "—"} Hours`, margin, ly2 + 4, colW);
        ly2 = rowText("Guest Count", booking.guestCount ? `${booking.guestCount} Guests` : "—", margin, ly2 + 4, colW);

        let ry2 = sectionTitle("Package", rx, y);
        ry2 = rowText("Package Type", booking.packageType.charAt(0).toUpperCase() + booking.packageType.slice(1), rx, ry2, colW);
        if (booking.packageType === "custom" && selectedServices.length > 0) {
            const serviceNames = selectedServices.map(([k]) => k.charAt(0).toUpperCase() + k.slice(1)).join(", ");
            ry2 = rowText("Included Services", serviceNames, rx, ry2 + 4, colW);
        }
        if (booking.notes) {
            ry2 = rowText("Special Notes", booking.notes, rx, ry2 + 4, colW);
        }

        y = Math.max(ly2, ry2) + 24;

        // ── Itemised Services Table (custom only) ────────────────────────
        if (booking.packageType === "custom" && selectedServices.length > 0) {
            doc.setDrawColor(229, 231, 235);
            doc.line(margin, y, pageW - margin, y);
            y += 20;

            y = sectionTitle("Services Breakdown", margin, y);
            y += 4;

            // Table header
            doc.setFillColor(245, 243, 255); // purple-50
            doc.rect(margin, y, pageW - margin * 2, 18, "F");
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(88, 28, 135);
            doc.text("Service", margin + 8, y + 12);
            doc.text("Price", pageW - margin - 8, y + 12, { align: "right" });
            y += 18;

            selectedServices.forEach(([service], i) => {
                const price = SERVICE_PRICES[service] || 0;
                if (i % 2 === 0) {
                    doc.setFillColor(250, 250, 250);
                    doc.rect(margin, y, pageW - margin * 2, 18, "F");
                }
                doc.setFont("helvetica", "normal");
                doc.setFontSize(9.5);
                doc.setTextColor(17, 24, 39);
                doc.text(service.charAt(0).toUpperCase() + service.slice(1), margin + 8, y + 12);
                doc.text(`$${price.toLocaleString()}`, pageW - margin - 8, y + 12, { align: "right" });
                // subtle row border
                doc.setDrawColor(229, 231, 235);
                doc.setLineWidth(0.5);
                doc.line(margin, y + 18, pageW - margin, y + 18);
                y += 18;
            });
            y += 8;
        }

        // ── Total Box ────────────────────────────────────────────────────
        doc.setDrawColor(229, 231, 235);
        doc.line(margin, y, pageW - margin, y);
        y += 16;

        doc.setFillColor(245, 243, 255);
        doc.roundedRect(margin, y, pageW - margin * 2, 48, 6, 6, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(88, 28, 135);
        doc.text("Estimated Total", margin + 16, y + 20);
        doc.setFontSize(18);
        doc.text(`$${booking.totalPrice?.toLocaleString()}`, pageW - margin - 16, y + 20, { align: "right" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(107, 114, 128);
        doc.text("* Final amount may vary. A representative will confirm pricing upon review.", margin + 16, y + 38);
        y += 72;

        // ── Footer ───────────────────────────────────────────────────────
        doc.setFillColor(249, 250, 251);
        doc.rect(0, y, pageW, 80, "F");
        doc.setDrawColor(229, 231, 235);
        doc.setLineWidth(0.5);
        doc.line(0, y, pageW, y);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(88, 28, 135);
        doc.text("EventSphere", margin, y + 24);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(107, 114, 128);
        doc.text("hello@eventsphere.com  |  +1 (555) 000-0000  |  www.eventsphere.com", margin, y + 40);
        doc.text("This is an automated receipt. For queries, please contact our support team.", margin, y + 55);

        doc.setFontSize(8);
        doc.setTextColor(156, 163, 175);
        doc.text(`Ref: ${shortId(booking._id)}`, pageW - margin, y + 40, { align: "right" });
        doc.text(`Generated ${new Date().toLocaleString()}`, pageW - margin, y + 55, { align: "right" });

        doc.save(`EventSphere_Receipt_${shortId(booking._id)}.pdf`);
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 overflow-y-auto"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-4 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">

                {/* ── Header ── */}
                <div className="bg-gradient-to-r from-purple-700 to-indigo-700 px-6 py-5 flex items-start justify-between">
                    <div>
                        <p className="text-purple-200 text-xs font-semibold uppercase tracking-widest mb-1">
                            Booking Reference • {shortId(booking._id)}
                        </p>
                        <h2 className="text-white text-xl font-bold leading-tight">{booking.eventTitle}</h2>
                        <p className="text-purple-200 text-sm mt-1 capitalize">{booking.eventType} Event</p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize ${STATUS_COLORS[booking.status] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
                            {booking.status}
                        </span>
                        <button
                            onClick={onClose}
                            className="text-purple-200 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1.5"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* ── Body ── */}
                <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">

                    {/* Client Info */}
                    <section>
                        <h3 className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-widest mb-3">
                            <User className="w-3.5 h-3.5" /> Client Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Detail icon={<User className="w-4 h-4" />} label="Full Name" value={booking.fullName} />
                            <Detail icon={<Mail className="w-4 h-4" />} label="Email" value={booking.email} />
                            <Detail icon={<Phone className="w-4 h-4" />} label="Phone" value={booking.phone} />
                        </div>
                    </section>

                    <Divider />

                    {/* Event Details */}
                    <section>
                        <h3 className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-widest mb-3">
                            <Calendar className="w-3.5 h-3.5" /> Event Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Detail icon={<Calendar className="w-4 h-4" />} label="Event Date"
                                value={new Date(booking.eventDate).toLocaleDateString(undefined, { dateStyle: "long" })} />
                            <Detail icon={<Clock className="w-4 h-4" />} label="Duration" value={`${booking.duration || "—"} Hours`} />
                            <Detail icon={<Users className="w-4 h-4" />} label="Guest Count"
                                value={booking.guestCount ? `${booking.guestCount} Guests` : "—"} />
                            <Detail icon={<MapPin className="w-4 h-4" />} label="Venue"
                                value={booking.venueName ? `${booking.venueName}${booking.city ? `, ${booking.city}` : ""}` : "—"} />
                            <Detail icon={<MapPin className="w-4 h-4" />} label="Location Type"
                                value={booking.locationType ? booking.locationType.charAt(0).toUpperCase() + booking.locationType.slice(1) : "—"} />
                            <Detail icon={<Tag className="w-4 h-4" />} label="Package"
                                value={booking.packageType.charAt(0).toUpperCase() + booking.packageType.slice(1)} />
                        </div>
                    </section>

                    {/* Services (custom only) */}
                    {booking.packageType === "custom" && selectedServices.length > 0 && (
                        <>
                            <Divider />
                            <section>
                                <h3 className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-widest mb-3">
                                    <FileText className="w-3.5 h-3.5" /> Services Breakdown
                                </h3>
                                <div className="border border-gray-100 rounded-xl overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-purple-50">
                                                <th className="text-left px-4 py-2.5 text-purple-700 font-semibold text-xs uppercase tracking-wider">Service</th>
                                                <th className="text-right px-4 py-2.5 text-purple-700 font-semibold text-xs uppercase tracking-wider">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedServices.map(([service], i) => (
                                                <tr key={service} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                    <td className="px-4 py-2.5 text-gray-700 capitalize">{service}</td>
                                                    <td className="px-4 py-2.5 text-right text-gray-900 font-medium">
                                                        ${(SERVICE_PRICES[service] || 0).toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </>
                    )}

                    {/* Notes */}
                    {booking.notes && (
                        <>
                            <Divider />
                            <section>
                                <h3 className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-widest mb-2">
                                    <FileText className="w-3.5 h-3.5" /> Special Notes
                                </h3>
                                <p className="text-gray-600 text-sm bg-gray-50 rounded-lg px-4 py-3 border border-gray-100 leading-relaxed">
                                    {booking.notes}
                                </p>
                            </section>
                        </>
                    )}

                    {/* Total */}
                    <Divider />
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl px-5 py-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Estimated Total</p>
                            <p className="text-xs text-gray-500 mt-0.5">Final amount confirmed upon review</p>
                        </div>
                        <p className="text-2xl font-bold text-purple-700">${booking.totalPrice?.toLocaleString()}</p>
                    </div>

                    {booking.createdAt && (
                        <p className="text-center text-xs text-gray-400">
                            Booking submitted on {new Date(booking.createdAt).toLocaleString(undefined, { dateStyle: "long", timeStyle: "short" })}
                        </p>
                    )}
                </div>

                {/* ── Footer Actions ── */}
                <div className="border-t border-gray-100 px-6 py-4 flex justify-between items-center bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-md hover:shadow-purple-200 transition-all transform hover:scale-105"
                    >
                        <Download className="w-4 h-4" />
                        Download PDF Receipt
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Helper sub-components ──────────────────────────────────────────────────

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-start gap-2.5">
            <span className="mt-0.5 text-purple-400 shrink-0">{icon}</span>
            <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="text-sm text-gray-800 font-medium mt-0.5 break-words">{value}</p>
            </div>
        </div>
    );
}

function Divider() {
    return <hr className="border-gray-100" />;
}
