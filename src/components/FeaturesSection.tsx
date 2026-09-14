import { Zap, Shield, Smartphone, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Réservation Instantanée',
    description: 'Plus besoin d\'attendre. Réservez votre table en 30 secondes et recevez une confirmation immédiate.',
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: 'Commande en Ligne',
    description: 'Parcourez le menu, composez votre commande et payez en ligne. Votre repas vous attend à l\'arrivée.',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Service Premium',
    description: 'Placement rooftop garanti, serveurs dédiés et attention personnalisée pour chaque client.',
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: 'Ambiance Exclusive',
    description: 'Vue panoramique sur Douala, design haut de gamme et atmosphère lounge inégalée en ville.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 lg:py-20 bg-bg-secondary border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-6 rounded-2xl hover:bg-bg-card/50 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-text-primary font-semibold text-sm mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-xs leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
