import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me{import.meta.env.VITE_RESTAURANT_WHATSAPP}?text=${encodeURIComponent("Bonjour Clavio Akwa ! Je souhaite réserver une table.")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contacter sur WhatsApp"
    >
      <div className="relative">
        {/* Pulse Ring */}
        <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />
        
        {/* Button */}
        <div className="relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300 group-hover:scale-110">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-bg-card border border-border rounded-xl px-4 py-2.5 shadow-xl whitespace-nowrap">
          <p className="text-text-primary text-xs font-medium">Réserver via WhatsApp</p>
          <p className="text-text-muted text-xs">Réponse en moins de 5 min</p>
        </div>
      </div>
    </a>
  );
}
