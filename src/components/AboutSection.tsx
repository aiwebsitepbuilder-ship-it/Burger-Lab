import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, CheckCircle2, Clock, MapPin, Utensils } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#0A0A0A] border-y border-white/10 relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-red-600/20 border border-red-600/40 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3 text-red-500" />
            <span>Discover Our Story</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter font-['Outfit']">
            About <span className="text-red-600">Burger Lab</span>
          </h2>
          <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed">
            Dedicated to delivering dependable taste, warm hospitality, and unforgettable culinary craftsmanship across Dhaka.
          </p>
        </div>

        {/* Main Grid: Content + Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-square bg-zinc-900 group">
                <img
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop"
                  alt="Burger Lab handcrafted burger bun and patty"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 text-center">
                <span className="text-2xl font-black text-red-600 font-['Outfit'] block">7 Days</span>
                <span className="text-[11px] text-white/60 font-semibold uppercase tracking-wider">Open Sunday – Saturday</span>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="p-4 rounded-xl bg-zinc-900 border-l-4 border-red-600 text-left">
                <span className="text-xl font-black text-white font-['Outfit'] uppercase block">Accessible</span>
                <span className="text-[11px] text-white/60 font-medium">Affordable to Moderate Pricing</span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-square bg-zinc-900 group">
                <img
                  src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=600&auto=format&fit=crop"
                  alt="Burger Lab crispy loaded fries"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Text Content & Core Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-white/70 leading-relaxed text-sm sm:text-base">
              <p>
                At <strong className="text-white font-bold">Burger Lab</strong>, our main specialty and signature attraction is our crafted range of burgers. We believe that exceptional casual dining begins with unwavering attention to flavor balance, prime cooking temperature, and freshly toasted buns.
              </p>
              <p>
                Beyond our signature burgers, we satisfy every craving with a diverse selection of customer favorites—including crispy <strong className="text-white font-medium">loaded fries</strong>, crunchy <strong className="text-white font-medium">sides</strong>, wholesome <strong className="text-white font-medium">rice bowls</strong>, hot soothing <strong className="text-white font-medium">soup</strong>, and chilled <strong className="text-white font-medium">drinks</strong>.
              </p>
            </div>

            {/* Core Values Bullet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded bg-red-600/20 border border-red-600/40 flex items-center justify-center shrink-0 mt-0.5 text-red-500">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight font-['Outfit']">Consistency in Quality</h4>
                  <p className="text-xs text-white/60 mt-1">
                    Our core brand promise. Identical high standards in every meal.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded bg-red-600/20 border border-red-600/40 flex items-center justify-center shrink-0 mt-0.5 text-red-500">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight font-['Outfit']">Burgers are the Star</h4>
                  <p className="text-xs text-white/60 mt-1">
                    Specialized preparation methods developed specifically for burger lovers.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded bg-red-600/20 border border-red-600/40 flex items-center justify-center shrink-0 mt-0.5 text-red-500">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight font-['Outfit']">Accessible Pricing</h4>
                  <p className="text-xs text-white/60 mt-1">
                    Affordable to moderate price point designed for everyday enjoyment.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded bg-red-600/20 border border-red-600/40 flex items-center justify-center shrink-0 mt-0.5 text-red-500">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight font-['Outfit']">7 Days a Week</h4>
                  <p className="text-xs text-white/60 mt-1">
                    Ready to welcome you Sunday through Saturday across all Dhaka branches.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Banner Strip */}
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-xs text-white/80 font-medium">
                  Visit Burger Lab at Mirpur, Bashundhara, Dhanmondi & Uttara.
                </span>
              </div>
              <a
                href="#branches"
                className="text-xs font-bold text-red-500 hover:text-white uppercase tracking-wider flex items-center space-x-1"
              >
                <span>View Locations</span>
                <span>→</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
