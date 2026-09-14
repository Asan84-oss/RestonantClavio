import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import MenuSection from './components/MenuSection';
import BookingSection from './components/BookingSection';
import EventsSection from './components/EventsSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';

function MainLayout() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Navigation Header */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Features Strip */}
        <FeaturesSection />

        {/* Digital Menu */}
        <MenuSection />

        {/* Booking / Reservation */}
        <BookingSection />

        {/* Events & Nightlife */}
        <EventsSection />

        {/* Social Proof / Testimonials */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp CTA */}
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
