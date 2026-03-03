import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Authenticated, Unauthenticated, AuthenticatedAdmin } from "./lib/auth";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import AdminDashboard from "./pages/AdminDashboard";
import AuthPage from "./pages/AuthPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={
              <Authenticated>
                <EventsPage />
              </Authenticated>
            } />
            <Route path="/events/:id" element={
              <Authenticated>
                <EventDetailsPage />
              </Authenticated>
            } />
            <Route path="/services" element={
              <Authenticated>
                <ServicesPage />
              </Authenticated>
            } />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={
              <Authenticated>
                <ContactPage />
              </Authenticated>
            } />
            <Route path="/admin" element={
              <AuthenticatedAdmin>
                <AdminDashboard />
              </AuthenticatedAdmin>
            } />
            <Route path="/login" element={
              <Unauthenticated>
                <AuthPage />
              </Unauthenticated>
            } />
          </Routes>
        </main>
        <Authenticated>
          <Footer />
        </Authenticated>
        <Toaster />
      </div>
    </Router>
  );
}
