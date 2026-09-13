/**
 * ============================================================
 * FLOATING FOOD ANIMATION COMPONENT
 * ============================================================
 * 
 * Creates a mesmerizing 3D-effect floating animation for the
 * hero food item. Uses GPU-accelerated CSS transforms for
 * smooth 60fps performance on mobile devices.
 * 
 * ANIMATION AXES:
 * - Axis 1: Vertical bobbing (Y-axis, 12px, 6s sinusoidal)
 * - Axis 2: Subtle rotation (-4° to +4°, 8s loop)
 * - Axis 3: Dynamic orange glow pulse (breathing effect)
 * 
 * PERFORMANCE:
 * - Uses translate3d() for GPU acceleration
 * - will-change: transform for layer promotion
 * - No JavaScript animation loops (pure CSS)
 * - Optimized for 60fps on mobile networks
 * - Respects prefers-reduced-motion
 * ============================================================
 */

import { heroFeaturedItem } from '../data/menuData';
import { ArrowRight } from 'lucide-react';

export default function FloatingFoodAnimation() {
  return (
    <div className="relative flex items-center justify-center py-8 lg:py-4">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-accent/8 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Floating Container */}
      <div className="relative floating-food-container">
        {/* Main Food Image with 3D Animation */}
        <div className="floating-food-image relative">
          <img
            src={heroFeaturedItem.image}
            alt={heroFeaturedItem.name}
            className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 object-cover rounded-full"
            loading="eager"
          />
        </div>

        {/* Decorative Ring 1 - Inner */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-[360px] xl:h-[360px] rounded-full border border-accent/15 floating-ring" />
        </div>

        {/* Decorative Ring 2 - Outer */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-[360px] lg:h-[360px] xl:w-[420px] xl:h-[420px] rounded-full border border-dashed border-accent/10 floating-ring-slow" />
        </div>

        {/* Small floating accent dots */}
        <div className="absolute top-4 right-8 w-3 h-3 bg-accent/40 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-8 left-4 w-2 h-2 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 -right-4 w-2.5 h-2.5 bg-accent/25 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* CTA Below the food */}
      <div className="absolute -bottom-2 left-0 right-0 text-center">
        <a
          href="#menu"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-bg-primary/95 backdrop-blur-sm rounded-full border border-accent/30 hover:border-accent/60 transition-all duration-300 group"
        >
          <span className="text-accent font-semibold text-xs sm:text-sm">
            {heroFeaturedItem.cta}
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
