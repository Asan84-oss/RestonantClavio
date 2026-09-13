import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marie-Claire N.',
    role: 'Cadre bancaire, Douala',
    text: 'Le meilleur rooftop de Douala sans hésitation. Les grillades sont incroyables et la vue est à couper le souffle. Mon spot préféré pour les dîners d\'affaires.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Patrick E.',
    role: 'Entrepreneur',
    text: 'Ambiance incroyable le samedi soir ! Le karaoké est toujours bien animé et les cocktails signature sont uniques. Service au top du début à la fin.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Diaspora Camer',
    role: 'Paris, France',
    text: 'À chaque retour au pays, c\'est notre QG. L\'ambiance rooftop, la qualité des plats et le service sont dignes des meilleurs établissements internationaux.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-20 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            Témoignages
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4">
            Ce Que Disent Nos Clients
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 text-accent fill-accent" />
            ))}
          </div>
          <p className="text-text-secondary text-sm">4.8/5 basé sur 200+ avis</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="gradient-card border border-border rounded-2xl p-6 hover:border-accent/20 transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-accent/30 mb-4" />

              {/* Rating */}
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-accent fill-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <span className="text-accent text-xs font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-text-primary text-sm font-medium">{testimonial.name}</p>
                  <p className="text-text-muted text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
