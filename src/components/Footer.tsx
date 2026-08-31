import React from 'react';
import { Mail, Facebook, Phone, MapPin, Clock, ShieldCheck, ArrowUp, Heart } from 'lucide-react';
import { RESTAURANT_INFO, BRANCHES, SCHEDULE_DETAILS } from '../data/restaurantData';
import { BurgerLabLogo } from './BurgerLabLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Menu Categories', href: '#menu' },
    { name: 'Why Burger Lab', href: '#why-us' },
    { name: 'Branches', href: '#branches' },
    { name: 'Opening Hours', href: '#hours' },
    { name: 'Book a Table', href: '#reservation' },
  ];

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 text-white/60 text-sm">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <BurgerLabLogo
                size={48}
                className="rounded-full shadow-xl shadow-black/80 shrink-0"
              />
              <div>
                <span className="text-2xl font-black text-white uppercase tracking-tighter font-['Outfit']">
                  BURGER <span className="text-red-600">LAB</span>
                </span>
                <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase font-mono">
                  Consistency in Quality
                </p>
              </div>
            </div>

            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Burger Lab is Dhaka’s favorite casual dining burger restaurant. Dedicated to serving high-quality burgers, loaded fries, sides, rice bowls, soups, and drinks at accessible prices.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href={RESTAURANT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded bg-zinc-900 hover:bg-red-600 text-white/80 hover:text-white border border-white/10 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Burger Lab Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${RESTAURANT_INFO.email}`}
                className="w-9 h-9 rounded bg-zinc-900 hover:bg-red-600 text-white/80 hover:text-white border border-white/10 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Burger Lab Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-xs text-white/50 flex items-center space-x-2 font-mono">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>Core Promise: Consistency in Every Bite</span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="hover:text-red-500 transition-colors text-white/70 inline-block uppercase text-xs tracking-wider font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: All 4 Branches (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 font-mono">
              Our 4 Branches
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              {BRANCHES.map((b) => (
                <li key={b.id} className="border-b border-white/5 pb-2">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block text-xs font-bold uppercase">{b.name}</strong>
                      <span className="text-white/50 text-[11px] block leading-tight font-serif italic">{b.address}</span>
                      <a
                        href={`tel:${b.contactNumber}`}
                        className="text-red-500 hover:text-red-400 font-mono text-[11px] font-bold mt-0.5 inline-block"
                      >
                        📞 {b.displayPhone}
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Opening Hours & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 font-mono">
              Service Hours
            </h4>
            
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/5 space-y-2 text-xs">
              <div>
                <span className="text-white/40 block font-mono text-[10px] uppercase tracking-wider">Sunday to Thursday:</span>
                <span className="text-white font-mono font-bold">11:30 AM – 11:00 PM</span>
              </div>
              <div className="pt-1.5 border-t border-white/5">
                <span className="text-white/40 block font-mono text-[10px] uppercase tracking-wider">Friday Schedule:</span>
                <span className="text-white font-mono font-bold">11:30 AM – 11:00 PM</span>
                <span className="text-[10px] font-mono text-amber-400 block">Break: 3:00 AM – 11:00 AM</span>
              </div>
              <div className="pt-1.5 border-t border-white/5">
                <span className="text-white/40 block font-mono text-[10px] uppercase tracking-wider">Saturday:</span>
                <span className="text-white font-mono font-bold">11:30 AM – 11:00 PM</span>
              </div>
            </div>

            <div className="pt-2 text-xs space-y-1.5">
              <a
                href={`mailto:${RESTAURANT_INFO.email}`}
                className="flex items-center text-white/70 hover:text-red-500 transition-colors font-mono"
              >
                <Mail className="w-3.5 h-3.5 mr-2 text-red-500 shrink-0" />
                <span className="truncate">{RESTAURANT_INFO.email}</span>
              </a>
              <a
                href={RESTAURANT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white/70 hover:text-red-500 transition-colors"
              >
                <Facebook className="w-3.5 h-3.5 mr-2 text-red-500 shrink-0" />
                <span>facebook.com/Burgerlabbd</span>
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="border-t border-white/5 bg-[#050505] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} <strong className="text-white font-bold uppercase tracking-wider font-mono">Burger Lab</strong>. All rights reserved. Dhaka, Bangladesh.
          </div>

          <div className="flex items-center space-x-6">
            <span className="font-mono text-[11px] uppercase tracking-wider">Consistency in Quality</span>
            <span>•</span>
            <span className="hidden md:inline font-mono text-[11px] uppercase tracking-wider">Mirpur • Bashundhara • Dhanmondi • Uttara</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
