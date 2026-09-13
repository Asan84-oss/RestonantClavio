import { ChevronDown, MapPin, Clock, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-bg-secondary">
        <img
          src="https://image.qwenlm.ai/generated-images/c7aadb8c-5deb-4cec-b5d5-befa853a3334/_result.png"
          alt="Clavio Akwa Rooftop Lounge - Premium nightlife venue in Douala"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-bg-secondary/70 via-bg-primary/50 to-bg-secondary/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,107,0,0.08)_0%,_transparent_60%)]" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
          <Star className="w-3.5 h-3.5 text-accent fill-accent" />
          <span className="text-accent text-xs font-medium tracking-wide uppercase">
            Rooftop Premium • Douala
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          <span className="text-text-primary">L'Expérience</span>
          <br />
          <span className="text-accent glow-text">Rooftop Ultime</span>
          <br />
          <span className="text-text-primary">à Douala</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-10">
          Lounge d'exception, grillades signature et cocktails raffinés au sommet d'Akwa.
          Réservez votre table et vivez des soirées inoubliables sous les étoiles de Douala.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#booking"
            className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:scale-105 text-sm sm:text-base"
          >
            Réserver une Table
          </a>
          <a
            href="#menu"
            className="w-full sm:w-auto px-8 py-4 bg-bg-card/80 hover:bg-bg-elevated border border-border hover:border-accent/30 text-text-primary font-semibold rounded-full transition-all duration-300 text-sm sm:text-base"
          >
            Voir le Menu
          </a>
        </div>

        {/* Info Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-text-secondary text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span>Rue Mermoz, Akwa Nord</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" />
            <span>17h - 2h du matin</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span>4.8/5 (200+ avis)</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-text-muted" />
      </div>
    </section>
  );
}
