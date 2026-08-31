import React, { useState } from 'react';
import { X, ShoppingBag, Phone, ExternalLink, MapPin, CheckCircle, Clock, Utensils, AlertCircle } from 'lucide-react';
import { BRANCHES } from '../data/restaurantData';
import { BurgerLabLogo } from './BurgerLabLogo';

interface OnlineOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreMenu: () => void;
}

export const OnlineOrderModal: React.FC<OnlineOrderModalProps> = ({
  isOpen,
  onClose,
  onExploreMenu,
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>(BRANCHES[0].id);

  if (!isOpen) return null;

  const selectedBranch = BRANCHES.find((b) => b.id === selectedBranchId) || BRANCHES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-zinc-900 border border-white/10 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 text-white animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <BurgerLabLogo size={48} className="rounded-full shadow-lg shadow-red-950/60 shrink-0" />
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-red-600/20 text-red-500 text-[10px] font-bold uppercase tracking-widest font-mono mb-1">
              <span>Dhaka Express Service</span>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white font-['Outfit']">
              Order Online From <span className="text-red-600">Burger Lab</span>
            </h3>
            <p className="text-xs text-white/60">
              Get your favorite burgers, loaded fries & bowls delivered to your doorstep or ready for pickup.
            </p>
          </div>
        </div>

        {/* Select Branch */}
        <div className="mb-6">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2 font-mono">
            1. Select Your Nearest Branch:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {BRANCHES.map((branch) => {
              const isSelected = branch.id === selectedBranchId;
              return (
                <button
                  key={branch.id}
                  type="button"
                  onClick={() => setSelectedBranchId(branch.id)}
                  className={`p-2.5 rounded-lg text-left transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-red-600/20 border-red-600 text-white shadow-md'
                      : 'bg-zinc-800/80 border-white/5 text-white/70 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <span className="block text-xs font-bold uppercase tracking-tight">{branch.name.replace(' Branch', '')}</span>
                  <span className="block text-[10px] text-white/40 truncate font-serif italic mt-0.5">{branch.area}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ordering Options */}
        <div className="space-y-3 mb-6">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1 font-mono">
            2. Choose Your Ordering Method:
          </label>

          {/* Option A: Direct Branch Hotline Call (Instant Takeaway & Pickup) */}
          <div className="p-4 rounded-xl bg-zinc-800/90 border border-red-600/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded bg-red-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Direct Hotline Order / Takeaway</span>
                  <span className="px-1.5 py-0.5 rounded bg-red-600/30 text-red-400 text-[9px] font-bold uppercase font-mono">Fastest</span>
                </div>
                <p className="text-xs text-white/60 mt-0.5">
                  Call {selectedBranch.name} directly for immediate order placement, pickup & custom combos.
                </p>
                <div className="mt-1 flex items-center space-x-2 text-xs font-mono font-bold text-red-400">
                  <MapPin className="w-3 h-3 text-red-500" />
                  <span>{selectedBranch.displayPhone}</span>
                </div>
              </div>
            </div>
            <a
              href={`tel:${selectedBranch.contactNumber}`}
              className="w-full sm:w-auto px-4 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold uppercase tracking-wider rounded shadow-md transition-colors flex items-center justify-center space-x-1.5 shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Branch</span>
            </a>
          </div>

          {/* Option B: Foodpanda Delivery */}
          <div className="p-4 rounded-xl bg-zinc-800/80 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-white/20 transition-colors">
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded bg-pink-600/20 border border-pink-600/40 text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
                <Utensils className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">Foodpanda Delivery</span>
                <p className="text-xs text-white/60 mt-0.5">
                  Search &quot;Burger Lab {selectedBranch.area}&quot; on Foodpanda for doorstep delivery in Dhaka.
                </p>
              </div>
            </div>
            <a
              href="https://www.foodpanda.com.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center space-x-1.5 shrink-0"
            >
              <span>Foodpanda</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Option C: Pathao Food Delivery */}
          <div className="p-4 rounded-xl bg-zinc-800/80 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-white/20 transition-colors">
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded bg-red-600/20 border border-red-600/40 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">Pathao Food Delivery</span>
                <p className="text-xs text-white/60 mt-0.5">
                  Order through the Pathao app for convenient rider delivery across Dhaka metropolitan areas.
                </p>
              </div>
            </div>
            <a
              href="https://pathao.com/food"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center space-x-1.5 shrink-0"
            >
              <span>Pathao Food</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom helper & view menu link */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-[11px] text-white/50 font-mono">
            <Clock className="w-3.5 h-3.5 text-red-500" />
            <span>Online Orders: 11:30 AM – 11:00 PM Daily</span>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onExploreMenu();
            }}
            className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors cursor-pointer"
          >
            Browse Full Menu First →
          </button>
        </div>
      </div>
    </div>
  );
};
