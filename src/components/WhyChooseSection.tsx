import React from 'react';
import { ShieldCheck, Flame, UtensilsCrossed, BadgePercent, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/restaurantData';

export const WhyChooseSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-red-500" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-red-500" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-red-500" />;
      case 'BadgePercent':
        return <BadgePercent className="w-5 h-5 text-red-500" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-red-500" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <section id="why-us" className="py-20 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-red-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-red-600/20 border border-red-600/40 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3 text-red-500" />
            <span>The Burger Lab Standard</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter font-['Outfit']">
            Why Choose <span className="text-red-600">Burger Lab</span>
          </h2>
          <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed">
            We are built on one simple standard: serving delicious food you can rely on every single time you visit.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_ITEMS.map((item, index) => {
            const isFeatured = index === 0; // Consistency in Quality is the #1 Brand value
            return (
              <div
                key={item.id}
                id={`why-card-${item.id}`}
                className={`p-7 rounded-2xl bg-zinc-900 border transition-all duration-300 hover:-translate-y-1 relative flex flex-col justify-between shadow-xl ${
                  isFeatured 
                    ? 'border-red-600 md:col-span-2 lg:col-span-1 shadow-red-950/20' 
                    : 'border-white/5 hover:border-red-600/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded bg-zinc-800 border border-white/5 flex items-center justify-center">
                      {getIcon(item.iconName)}
                    </div>
                    {item.stat && (
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-red-600 text-white">
                        {item.stat}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white uppercase tracking-tight font-['Outfit']">
                    {item.title}
                  </h3>

                  <p className="text-white/70 text-sm mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-red-500 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                  <span>Burger Lab Quality Verified</span>
                </div>
              </div>
            );
          })}

          {/* Quick Summary Card */}
          <div className="p-7 rounded-2xl bg-red-600 text-white flex flex-col justify-between shadow-2xl shadow-red-950/60">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/80 font-mono">Across Dhaka</span>
              <h3 className="text-2xl font-black font-['Outfit'] mt-1 leading-tight uppercase tracking-tight">
                Ready to Taste the Consistency?
              </h3>
              <p className="text-white/90 text-sm mt-3 leading-relaxed">
                Visit our branches in Mirpur, Bashundhara, Dhanmondi, or Uttara today and discover your new favorite meal.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
              <span className="text-xs font-bold text-white/90 font-mono">Open 7 Days a Week</span>
              <a
                href="#branches"
                className="px-4 py-2 bg-white text-zinc-950 hover:bg-zinc-100 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Find Nearest
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
