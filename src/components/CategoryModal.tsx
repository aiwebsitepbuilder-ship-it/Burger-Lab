import React from 'react';
import { X, Sparkles, Check, MapPin, ChevronRight, Phone } from 'lucide-react';
import { Category, Branch } from '../types';
import { BRANCHES } from '../data/restaurantData';

interface CategoryModalProps {
  category: Category | null;
  onClose: () => void;
  onSelectBranch: (branch: Branch) => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({ category, onClose, onSelectBranch }) => {
  if (!category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-zinc-900 border border-white/10 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-red-600 text-white/80 hover:text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Banner */}
        <div className="relative h-60 sm:h-72 w-full bg-zinc-950 overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-black/30" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest mb-2">
              <span>{category.icon}</span>
              <span>{category.badge || 'Burger Lab Menu'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-['Outfit']">
              {category.name}
            </h3>
            <p className="text-xs text-red-500 font-bold uppercase tracking-wider">
              {category.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 font-mono">Category Overview</h4>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3 font-mono">
              Quality & Preparation Standards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {category.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs text-white/80 bg-zinc-800/60 p-2.5 rounded border border-white/5">
                  <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Across All Branches Note */}
          <div className="p-4 rounded-xl bg-zinc-800 border-l-4 border-red-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>Available at all 4 Dhaka Branches</span>
              </div>
              <p className="text-xs text-white/60 mt-1 font-mono">
                Mirpur • Bashundhara • Dhanmondi • Uttara
              </p>
            </div>

            <a
              href="#branches"
              onClick={() => {
                onClose();
                const el = document.getElementById('branches');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-1 shrink-0 cursor-pointer shadow-md shadow-red-950/60"
            >
              <span>Visit a Branch</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
