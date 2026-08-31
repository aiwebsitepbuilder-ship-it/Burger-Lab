import React from 'react';
import { ChevronRight, MapPin, Sparkles, Utensils, ShieldCheck, Clock, Award } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onFindBranch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreMenu, onFindBranch }) => {
  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-8 pb-16 lg:py-20 bg-[#0A0A0A]">
      {/* Background Decorative Ambient */}
      <div className="absolute inset-0 bg-[#0A0A0A] pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
        {/* Subtle grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-stretch">
          
          {/* Left Hero Card (8 cols) */}
          <div className="lg:col-span-8 relative group rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 p-8 sm:p-10 flex flex-col justify-between shadow-2xl">
            {/* Background Image with Deep Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1400&auto=format&fit=crop"
                alt="Burger Lab Gourmet Burgers"
                className="w-full h-full object-cover object-center opacity-25 group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            </div>

            {/* Subtle Watermark LAB */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 w-full text-center pointer-events-none select-none z-0">
              <span className="text-[120px] sm:text-[180px] font-black italic opacity-10 leading-none text-white">LAB</span>
            </div>

            {/* Top Row: Featured Badge + 100% Quality Tag */}
            <div className="relative z-10 flex items-start justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 bg-red-600 text-[10px] font-bold uppercase tracking-widest text-white rounded">Featured</span>
                <span className="text-white/70 text-xs sm:text-sm italic font-serif">Consistency in every bite</span>
              </div>
              <div className="text-right">
                <div className="text-red-600 font-black text-3xl sm:text-4xl italic leading-none">100%</div>
                <div className="text-[9px] uppercase text-white/40 tracking-widest font-bold mt-0.5">Quality Ingredients</div>
              </div>
            </div>

            {/* Main Headline & Narrative */}
            <div className="relative z-10 my-auto py-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight sm:leading-none mb-4 uppercase tracking-tighter text-white font-['Outfit']">
                Burgers Made with<br/>
                <span className="text-red-600">Consistency.</span>
              </h1>
              <p className="text-white/70 max-w-xl mb-8 text-sm sm:text-base leading-relaxed">
                Experience Dhaka’s trusted burger restaurant crafted with precision. From loaded fries and sides to our signature rice bowls, soup, and drinks, we offer a consistent gourmet experience at affordable-to-moderate prices.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="button"
                  id="hero-btn-explore-menu"
                  onClick={onExploreMenu}
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded transition-all shadow-lg shadow-red-950/60 flex items-center justify-center space-x-2 group/btn cursor-pointer"
                >
                  <span>Explore Menu</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <button
                  type="button"
                  id="hero-btn-find-branch"
                  onClick={onFindBranch}
                  className="px-8 py-4 border border-white/20 hover:bg-white/10 active:bg-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>Find a Branch</span>
                </button>
              </div>
            </div>

            {/* Bottom Row Trust Stats */}
            <div className="relative z-10 pt-6 mt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-2.5 bg-zinc-950/60 rounded border border-white/5">
                <span className="block text-lg font-black text-white font-['Outfit']">4 BRANCHES</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Dhaka City</span>
              </div>
              <div className="p-2.5 bg-zinc-950/60 rounded border border-white/5">
                <span className="block text-lg font-black text-red-600 font-['Outfit']">100% FOCUS</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Burger Quality</span>
              </div>
              <div className="p-2.5 bg-zinc-950/60 rounded border border-white/5">
                <span className="block text-lg font-black text-white font-['Outfit']">6 CATEGORIES</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Full Variety</span>
              </div>
              <div className="p-2.5 bg-zinc-950/60 rounded border border-white/5">
                <span className="block text-lg font-black text-white font-['Outfit']">7 DAYS</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Weekly Service</span>
              </div>
            </div>
          </div>

          {/* Right Hero Card: Branch Quick Snapshot (4 cols) */}
          <div className="lg:col-span-4 bg-zinc-900/50 border border-white/5 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-end mb-5 pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-xs font-bold uppercase text-red-600 tracking-widest">Locations</h3>
                  <h2 className="text-2xl font-black uppercase text-white font-['Outfit']">Our Branches</h2>
                </div>
                <span className="text-white/30 text-xs font-mono">04 TOTAL</span>
              </div>

              <div className="flex flex-col gap-3">
                {/* Mirpur */}
                <div className="p-3.5 bg-zinc-800 rounded-xl border-l-4 border-red-600">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold uppercase text-sm text-white">Mirpur Branch</span>
                    <span className="text-[10px] uppercase font-bold text-red-500 tracking-widest font-mono">Open</span>
                  </div>
                  <p className="text-[11px] text-white/60 leading-tight mb-2">Mirpur-01,2, 2 Zoo Road, Dhaka 1216</p>
                  <a href="tel:01815-008065" className="text-xs font-mono text-red-500 font-bold hover:underline">
                    01815-008065
                  </a>
                </div>

                {/* Bashundhara */}
                <div className="p-3.5 bg-zinc-800/40 border border-white/5 rounded-xl">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold uppercase text-sm text-white">Bashundhara</span>
                    <span className="text-[10px] uppercase text-white/30 font-mono">Dhaka</span>
                  </div>
                  <p className="text-[11px] text-white/60 leading-tight">Ka-11, 2 Bashundhara Rd, Dhaka 1229</p>
                </div>

                {/* Dhanmondi */}
                <div className="p-3.5 bg-zinc-800/40 border border-white/5 rounded-xl">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold uppercase text-sm text-white">Dhanmondi</span>
                    <span className="text-[10px] uppercase text-white/30 font-mono">Dhaka</span>
                  </div>
                  <p className="text-[11px] text-white/60 leading-tight">House 81, Green Taj Center, Satmasjid Road</p>
                </div>

                {/* Uttara */}
                <div className="p-3.5 bg-zinc-800/40 border border-white/5 rounded-xl">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold uppercase text-sm text-white">Uttara Branch</span>
                    <span className="text-[10px] uppercase text-white/30 font-mono">Dhaka</span>
                  </div>
                  <p className="text-[11px] text-white/60 leading-tight">House-16, Gareeb-e-Nawaz Ave, Sector 11, Uttara</p>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-white/40 font-mono text-[11px]">11:30 AM – 11:00 PM</span>
              <button
                type="button"
                onClick={onFindBranch}
                className="text-red-500 font-bold uppercase tracking-wider hover:text-white flex items-center space-x-1 cursor-pointer"
              >
                <span>View All Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
