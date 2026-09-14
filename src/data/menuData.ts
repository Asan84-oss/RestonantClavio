/**
 * ============================================================
 * CLAVIO AKWA - MENU DATA CONFIGURATION
 * ============================================================
 * 
 * This file contains all menu items organized by category.
 * To update items, simply modify the arrays below.
 * 
 * STRUCTURE:
 * - id: Unique identifier for each item
 * - name: Display name of the dish/drink
 * - description: Appetizing description (keep under 120 chars for mobile)
 * - price: Price in XAF (Central African Franc)
 * - image: URL to the item image (use Instagram/Facebook sourced images)
 * - tag: Optional highlight tag (e.g., "Populaire", "Signature", "Nouveau")
 * - spicy: Optional boolean for spicy items
 * 
 * HOW TO UPDATE:
 * 1. Pull images from @clavioakwa Instagram or Facebook
 * 2. Replace the 'image' field with the new image URL
 * 3. Update name/description/price as needed
 * 4. Add new items by copying an existing object and changing the id
 * ============================================================
 */

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string;
  tag?: string;
  spicy?: boolean;
  isNew?: boolean;
}

export interface MenuCategory {
  id: string;
  label: string;
  subtitle: string;
  icon: string; // emoji icon for universal compatibility
  items: MenuItem[];
}

// ============================================================
// CATEGORY 1: LES GRILLADES
// Premium fire-grilled specialties - Clavio Akwa's signature
// ============================================================
const grillades: MenuItem[] = [
  {
    id: 101,
    name: "Brochettes de Filet de Bœuf",
    description: "Succulentes grillades de filet marinées 24h aux épices camerounaises, flambées au charbon de bois",
    price: "7 500 XAF",
    image: "https://image.qwenlm.ai/generated-images/355df606-d4b8-4431-969c-f2b390475847/_result.png",
    tag: "Signature",
    spicy: true,
  },
  {
    id: 102,
    name: "Sole Grillée du Chef",
    description: "Sole entière grillée à la perfection, beurre citronné aux herbes fraîches du jardin",
    price: "12 000 XAF",
    tag: "Chef",
  },
  {
    id: 103,
    name: "Ailes de Poulet Laquées",
    description: "Ailes croustillantes nappées de notre sauce laquée secrète, miel et piment doux",
    price: "5 500 XAF",
    tag: "Populaire",
    spicy: true,
  },
  {
    id: 104,
    name: "Côtes de Porc Caramélisées",
    description: "Travers de porc fondants, glaçage au miel de forêt et gingembre frais râpé",
    price: "8 500 XAF",
    tag: "Best-seller",
  },
  {
    id: 105,
    name: "Poulet Braisé Fermier",
    description: "Demi-poulet fermier braisé lentement, marinade secrète du chef, accompagné de plantain doré",
    price: "6 500 XAF",
    spicy: true,
  },
  {
    id: 106,
    name: "Crevettes Flambées du Rooftop",
    description: "Grosses crevettes flambées au whisky, ail confit et beurre d'herbes",
    price: "14 000 XAF",
    tag: "Premium",
    isNew: true,
  },
];

// ============================================================
// CATEGORY 2: COCKTAILS SIGNATURE
// Luxury mixed drinks crafted by our expert mixologists
// ============================================================
const cocktails: MenuItem[] = [
  {
    id: 201,
    name: "Rooftop Sunset",
    description: "Rhum ambré premium, fruit de la passion frais, sirop de canne, zeste d'orange flambé",
    price: "5 000 XAF",
    image: "https://image.qwenlm.ai/generated-images/c2718ef1-b179-42db-939f-eda95fea27d4/_result.png",
    tag: "Signature",
  },
  {
    id: 202,
    name: "Akwa Mule",
    description: "Vodka premium, gingembre frais pilé, citron vert, tonic artisanal, menthe du jardin",
    price: "4 500 XAF",
    tag: "Populaire",
  },
  {
    id: 203,
    name: "Douala Nights",
    description: "Gin infusé au concombre, eau de tonic premium, herbes aromatiques, twist de citron",
    price: "4 500 XAF",
  },
  {
    id: 204,
    name: "Mermoz Spritz",
    description: "Prosecco italien, Aperol, orange sanguine pressée, eau gazeuse, glace pilée",
    price: "5 500 XAF",
    tag: "Nouveau",
    isNew: true,
  },
  {
    id: 205,
    name: "Tropical Breeze (Mocktail)",
    description: "Mangue fraîche, ananas, lait de coco onctueux, grenadine, glace pilée — sans alcool",
    price: "3 500 XAF",
    tag: "Sans Alcool",
  },
  {
    id: 206,
    name: "Passion Mojito (Mocktail)",
    description: "Fruit de la passion, menthe fraîche écrasée, citron vert, eau de sparkle — sans alcool",
    price: "3 000 XAF",
    tag: "Sans Alcool",
  },
];

// ============================================================
// CATEGORY 3: LES BRUSCHETTAS & TAPAS
// Elegant finger foods perfect for lounge sharing
// ============================================================
const bruschettas: MenuItem[] = [
  {
    id: 301,
    name: "Bruschetta Tomate-Basilic",
    description: "Pain artisanal grillé, tomates fraîches marinées, basilic frais, mozzarella di bufala, huile d'olive vierge",
    price: "4 000 XAF",
    image: "https://image.qwenlm.ai/generated-images/500863b9-419a-4403-90f4-ddc72542b50d/_result.png",
    tag: "Classique",
  },
  {
    id: 302,
    name: "Planches Apéritives du Rooftop",
    description: "Assortiment de charcuteries fines, fromages affinés, olives, noix caramélisées et crackers",
    price: "8 500 XAF",
    tag: "À partager",
  },
  {
    id: 303,
    name: "Tartare de Saumon Avocat",
    description: "Saumon frais coupé au couteau, avocat crémeux, sésame torréfié, sauce ponzu",
    price: "6 500 XAF",
    tag: "Premium",
    isNew: true,
  },
  {
    id: 304,
    name: "Croquettes de Crevettes",
    description: "Crevettes panées croustillantes, sauce cocktail maison, salade croquante",
    price: "5 000 XAF",
  },
  {
    id: 305,
    name: "Mini Burgers Signature (x3)",
    description: "Trois mini burgers gourmet : bœuf wagyu, cheddar affiné, oignons caramélisés, sauce truffe",
    price: "7 000 XAF",
    tag: "Populaire",
  },
  {
    id: 306,
    name: "Houmous Maison & Pain Pita",
    description: "Houmous crémeux aux pois chiches, paprika fumé, pain pita chaud fraîchement cuit",
    price: "3 500 XAF",
  },
];

// ============================================================
// EXPORT ALL CATEGORIES
// ============================================================
export const menuCategories: MenuCategory[] = [
  {
    id: "grillades",
    label: "Les Grillades",
    subtitle: "Nos succulentes grillades au feu de bois",
    icon: "🔥",
    items: grillades,
  },
  {
    id: "cocktails",
    label: "Cocktails Signature",
    subtitle: "Créations exclusives de nos mixologues",
    icon: "🍸",
    items: cocktails,
  },
  {
    id: "bruschettas",
    label: "Bruschettas & Tapas",
    subtitle: "Finger foods d'exception à partager",
    icon: "🍽️",
    items: bruschettas,
  },
];

// ============================================================
// HERO FEATURED ITEM (for the floating animation)
// ============================================================
export const heroFeaturedItem = {
  name: "Les Grillades de Clavio",
  subtitle: "Succulentes grillades au feu de bois",
  image: "https://image.qwenlm.ai/generated-images/355df606-d4b8-4431-969c-f2b390475847/_result.png",
  cta: "Commander Maintenant",
};
