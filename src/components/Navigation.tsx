import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Réserver', href: '#booking' },
  { label: 'Événements', href: '#events' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-primary/95 backdrop-blur-md border-b border-border shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <span className="text-accent font-display font-bold text-lg">C</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-text-primary font-display font-semibold text-lg tracking-wide">
                CLAVIO
              </span>
              <span className="text-accent font-display font-semibold text-lg ml-1">AKWA</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+237000000000"
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Appeler</span>
            </a>
            <a
              href="#menu"
              className="px-6 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
            >
              Commander en Ligne
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-text-primary hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-2 pt-4 border-t border-border">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-text-primary px-4 py-3 rounded-lg hover:bg-bg-card transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#menu"
              onClick={() => setIsOpen(false)}
              className="mt-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white text-sm font-semibold rounded-full text-center transition-all"
            >
              Commander en Ligne
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
