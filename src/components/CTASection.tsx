import React from 'react';
import { Utensils, MapPin, ChevronRight, Sparkles, Flame } from 'lucide-react';

interface CTASectionProps {
  onExploreMenu: () => void;
  onFindBranch: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onExploreMenu, onFindBranch }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-red-600/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 sm:p-12 lg:p-16 text-center relative shadow-2xl overflow-hidden">
          
          {/* Subtle decorative circles */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-red-600/5 rounded-full blur-2xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-red-600/20 border border-red-600/40 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span>Consistency in Every Single Bite</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter font-['Outfit'] max-w-2xl mx-auto">
            Hungry for a <span className="text-red-600">Great Burger?</span>
          </h2>

          {/* Subtext */}
          <p className="mt-4 text-white/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Visit Burger Lab today at Mirpur, Bashundhara, Dhanmondi, or Uttara. Explore our full menu of burgers, loaded fries, sides, bowls, and refreshers.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              id="cta-explore-menu"
              onClick={onExploreMenu}
              className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs uppercase tracking-widest rounded shadow-lg shadow-red-950/80 transition-all duration-200 flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <Utensils className="w-4 h-4" />
              <span>Explore Menu</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              id="cta-find-branch"
              onClick={onFindBranch}
              className="w-full sm:w-auto px-8 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white/90 font-bold text-xs uppercase tracking-widest rounded border border-white/10 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Find a Branch</span>
            </button>
          </div>

          {/* Micro Trust points */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono uppercase tracking-wider text-white/50">
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
              Dine-in & Takeaway
            </span>
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
              Open Sunday to Saturday
            </span>
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
              Affordable to Moderate Pricing
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
