import { useState } from 'react';
import { Flame, Wine, UtensilsCrossed, IceCream } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string;
  tag?: string;
}

interface MenuCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    id: 'grillades',
    label: 'Grillades',
    icon: <Flame className="w-4 h-4" />,
    items: [
      {
        id: 1,
        name: 'Brochettes de Bœuf Premium',
        description: 'Tendres morceaux de bœuf marinés aux épices camerounaises, grillés à la braise',
        price: '4 500 FCFA',
        tag: 'Populaire',
      },
      {
        id: 2,
        name: 'Poulet Braisé du Chef',
        description: 'Poulet fermier mariné 24h, grillé lentement avec notre sauce secrète',
        price: '6 000 FCFA',
        tag: 'Chef',
      },
      {
        id: 3,
        name: 'Côtes de Porc Laquées',
        description: 'Travers de porc caramélisés au miel et gingembre, accompagnés de plantain',
        price: '7 500 FCFA',
      },
      {
        id: 4,
        name: 'Poisson Braisé Royal',
        description: 'Bar entier braisé, oignons caramélisés et piment frais du marché',
        price: '8 000 FCFA',
      },
    ],
  },
  {
    id: 'entrees',
    label: 'Entrées',
    icon: <UtensilsCrossed className="w-4 h-4" />,
    items: [
      {
        id: 5,
        name: 'Bruschetta Méditerranéenne',
        description: 'Pain grillé, tomates fraîches, basilic, mozzarella et huile d\'olive',
        price: '3 500 FCFA',
      },
      {
        id: 6,
        name: 'Salade Clavio Signature',
        description: 'Mesclun, mangue, crevettes grillées, vinaigrette passion',
        price: '4 000 FCFA',
        tag: 'Signature',
      },
      {
        id: 7,
        name: 'Plateau de Fromages',
        description: 'Sélection affinée, noix, miel et confiture maison',
        price: '5 500 FCFA',
      },
    ],
  },
  {
    id: 'cocktails',
    label: 'Cocktails',
    icon: <Wine className="w-4 h-4" />,
    items: [
      {
        id: 8,
        name: 'Sunset Akwa',
        description: 'Rhum ambré, fruit de la passion, citron vert, sirop de canne',
        price: '3 500 FCFA',
        tag: 'Signature',
      },
      {
        id: 9,
        name: 'Mermoz Spritz',
        description: 'Prosecco, Aperol, orange sanguine, eau gazeuse',
        price: '4 000 FCFA',
      },
      {
        id: 10,
        name: 'Douala Night',
        description: 'Gin premium, tonic, concombre, herbes fraîches du jardin',
        price: '3 500 FCFA',
      },
      {
        id: 11,
        name: 'Tropical Breeze',
        description: 'Vodka, mangue, ananas, lait de coco, grenadine',
        price: '3 000 FCFA',
      },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    icon: <IceCream className="w-4 h-4" />,
    items: [
      {
        id: 12,
        name: 'Fondant au Chocolat',
        description: 'Cœur coulant, glace vanille de Madagascar, éclats de noisette',
        price: '3 500 FCFA',
      },
      {
        id: 13,
        name: 'Crème Brûlée à la Passion',
        description: 'Crème onctueuse au fruit de la passion, caramel craquant',
        price: '3 000 FCFA',
      },
    ],
  },
];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('grillades');

  const currentItems = menuCategories.find((cat) => cat.id === activeCategory)?.items || [];

  return (
    <section id="menu" className="py-20 lg:py-28 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            Notre Carte
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mt-3 mb-4">
            Menu Digital
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-base sm:text-lg">
            Des saveurs authentiques sublimées par notre chef. Grillades au feu de bois,
            cocktails signature et douceurs raffinées.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 lg:mb-14">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'bg-bg-card text-text-secondary hover:text-text-primary hover:bg-bg-elevated border border-border'
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="group relative gradient-card border border-border hover:border-accent/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
            >
              {/* Tag */}
              {item.tag && (
                <span className="absolute top-4 right-4 px-2.5 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20">
                  {item.tag}
                </span>
              )}

              {/* Content */}
              <div className="flex flex-col gap-2">
                <h3 className="text-text-primary font-semibold text-base sm:text-lg group-hover:text-accent transition-colors">
                  {item.name}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                  <span className="text-accent font-semibold text-base">{item.price}</span>
                  <button className="px-4 py-1.5 bg-accent/10 hover:bg-accent text-accent hover:text-white text-xs font-medium rounded-full transition-all duration-300 border border-accent/20 hover:border-accent">
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-text-muted text-sm mb-4">
            Envie de voir tout le menu ?
          </p>
          <a
            href="#booking"
            className="inline-flex items-center gap-2 px-6 py-3 bg-bg-card border border-border hover:border-accent/30 text-text-primary rounded-full text-sm font-medium transition-all hover:bg-bg-elevated"
          >
            Réserver & Commander
            <span className="text-accent">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
