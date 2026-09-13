import { Music, Mic2, PartyPopper, Calendar } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  day: string;
  time: string;
  description: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Soirée Karaoké',
    day: 'Chaque Vendredi',
    time: '21h - 01h',
    description: 'Libérez votre voix ! Scène ouverte, sono professionnelle et ambiance festive garantie.',
    icon: <Mic2 className="w-5 h-5" />,
    highlight: true,
  },
  {
    id: 2,
    title: 'Kizomba & Afrobeat Night',
    day: 'Chaque Samedi',
    time: '22h - 03h',
    description: 'DJ résident, danseurs professionnels et les meilleurs sons afro pour danser jusqu\'au bout de la nuit.',
    icon: <Music className="w-5 h-5" />,
    highlight: true,
  },
  {
    id: 3,
    title: 'Jazz & Orchestre Live',
    day: 'Chaque Dimanche',
    time: '18h - 22h',
    description: 'Musique live d\'orchestre, cocktails sunset et ambiance lounge raffinée pour bien finir le week-end.',
    icon: <PartyPopper className="w-5 h-5" />,
  },
  {
    id: 4,
    title: 'Happy Hour Business',
    day: 'Lundi - Jeudi',
    time: '17h - 20h',
    description: 'Cocktails à -30%, planches apéro offertes et networking entre professionnels de Douala.',
    icon: <Calendar className="w-5 h-5" />,
  },
];

export default function EventsSection() {
  return (
    <section id="events" className="py-20 lg:py-28 bg-bg-primary relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,107,0,0.04)_0%,_transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            Agenda
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mt-3 mb-4">
            Nos Soirées
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-base sm:text-lg">
            Chaque soir est une expérience unique. Karaoké endiablé, kizomba sensuelle,
            jazz live ou networking business — il y a toujours quelque chose au Clavio.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className={`group relative rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:scale-[1.02] ${
                event.highlight
                  ? 'gradient-card border border-accent/20 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10'
                  : 'gradient-card border border-border hover:border-accent/20'
              }`}
            >
              {/* Highlight Badge */}
              {event.highlight && (
                <div className="absolute top-4 right-4 px-2.5 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20">
                  À ne pas manquer
                </div>
              )}

              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  event.highlight
                    ? 'bg-accent/15 text-accent border border-accent/20'
                    : 'bg-bg-elevated text-text-secondary border border-border'
                }`}>
                  {event.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-text-primary font-semibold text-lg mb-1 group-hover:text-accent transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-accent text-sm font-medium">{event.day}</span>
                    <span className="text-text-muted text-sm">•</span>
                    <span className="text-text-secondary text-sm">{event.time}</span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-bg-card border border-border">
            <div className="text-center sm:text-left">
              <p className="text-text-primary font-medium">Événements privés & privatisation</p>
              <p className="text-text-secondary text-sm">Anniversaires, team buildings, lancements de produits...</p>
            </div>
            <a
              href="https://wa.me/237000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-semibold rounded-full transition-all whitespace-nowrap"
            >
              Demander un devis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
