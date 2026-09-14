import { MapPin, Phone, Mail, Instagram, Facebook, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
                <span className="text-accent font-display font-bold text-lg">C</span>
              </div>
              <div>
                <span className="text-text-primary font-display font-semibold text-lg">CLAVIO</span>
                <span className="text-accent font-display font-semibold text-lg ml-1">AKWA</span>
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Le rooftop lounge premium de Douala. Une expérience gastronomique et
              nocturne d'exception au cœur d'Akwa.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/clavioakwa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-bg-card border border-border hover:border-accent/30 flex items-center justify-center text-text-secondary hover:text-accent transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/ClavioAkwaOfficiel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-bg-card border border-border hover:border-accent/30 flex items-center justify-center text-text-secondary hover:text-accent transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/237000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-bg-card border border-border hover:border-accent/30 flex items-center justify-center text-text-secondary hover:text-accent transition-all"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Accueil', href: '#home' },
                { label: 'Menu Digital', href: '#menu' },
                { label: 'Réserver une Table', href: '#booking' },
                { label: 'Nos Événements', href: '#events' },
                { label: 'Commander en Ligne', href: '#menu' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-text-secondary text-sm">
                  Rue Mermoz, Akwa Nord<br />Douala, Cameroun
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="tel:+237000000000" className="text-text-secondary text-sm hover:text-accent transition-colors">
                  +237 6XX XXX XXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="mailto:contact@clavioakwa.com" className="text-text-secondary text-sm hover:text-accent transition-colors">
                  contact@clavioakwa.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Horaires
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-text-secondary text-sm">
                  <p>Lun - Jeu : 17h - 00h</p>
                  <p>Ven - Sam : 17h - 03h</p>
                  <p>Dimanche : 16h - 23h</p>
                </div>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-accent/5 border border-accent/15 rounded-xl">
              <p className="text-accent text-xs font-medium">Happy Hour</p>
              <p className="text-text-secondary text-xs mt-1">
                Lun-Jeu : 17h-20h<br />
                Cocktails à -30%
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            © 2025 Clavio Akwa. Tous droits réservés.
          </p>
          <p className="text-text-muted text-xs">
            Rooftop Lounge • Restaurant • Nightclub — Douala, Cameroun
          </p>
        </div>
      </div>
    </footer>
  );
}
