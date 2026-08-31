import React, { useState } from 'react';
import { MapPin, Phone, Navigation, Copy, Check, ExternalLink, Clock, Sparkles, CalendarCheck } from 'lucide-react';
import { BRANCHES } from '../data/restaurantData';
import { Branch } from '../types';

interface BranchesSectionProps {
  onSelectBranchForContact?: (branchName: string) => void;
}

export const BranchesSection: React.FC<BranchesSectionProps> = ({ onSelectBranchForContact }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeBranchId, setActiveBranchId] = useState<string>('all');

  const handleCopyAddress = (branch: Branch) => {
    navigator.clipboard.writeText(`${branch.name}, ${branch.address}`);
    setCopiedId(branch.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const filteredBranches = activeBranchId === 'all'
    ? BRANCHES
    : BRANCHES.filter(b => b.id === activeBranchId);

  return (
    <section id="branches" className="py-20 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-red-600/20 border border-red-600/40 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-3">
            <MapPin className="w-3 h-3 text-red-500" />
            <span>4 Locations in Dhaka</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter font-['Outfit']">
            Our <span className="text-red-600">Branches</span>
          </h2>
          <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed">
            Find your nearest Burger Lab branch in Mirpur, Bashundhara, Dhanmondi, or Uttara. Walk in or call for takeaway.
          </p>
        </div>

        {/* Quick Branch Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          <button
            type="button"
            onClick={() => setActiveBranchId('all')}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeBranchId === 'all'
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/50'
                : 'bg-zinc-900 text-white/60 hover:text-white hover:bg-zinc-800 border border-white/10'
            }`}
          >
            All Branches (4)
          </button>
          {BRANCHES.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setActiveBranchId(b.id)}
              className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                activeBranchId === b.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950/50 font-bold'
                  : 'bg-zinc-900 text-white/60 hover:text-white hover:bg-zinc-800 border border-white/10'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{b.name.replace(' Branch', '')}</span>
            </button>
          ))}
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBranches.map((branch) => {
            const isCopied = copiedId === branch.id;
            return (
              <div
                key={branch.id}
                id={`branch-card-${branch.id}`}
                className="bg-zinc-900 border border-white/5 hover:border-red-600/40 rounded-2xl p-6 sm:p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Header of Card */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block font-mono">
                        Dhaka Location
                      </span>
                      <h3 className="text-2xl font-black uppercase text-white font-['Outfit'] mt-0.5 group-hover:text-red-500 transition-colors">
                        {branch.name}
                      </h3>
                      <p className="text-xs text-white/60 mt-1 font-serif italic">
                        {branch.landmark}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/80 shrink-0 font-mono">
                      {branch.area}
                    </span>
                  </div>

                  {/* Address Section */}
                  <div className="p-4 rounded-xl bg-zinc-800/80 border border-white/5 mb-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start space-x-2.5">
                        <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider font-mono">Full Address:</p>
                          <p className="text-sm font-medium text-white leading-snug mt-0.5">
                            {branch.address}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyAddress(branch)}
                        className="p-1.5 rounded bg-zinc-700 hover:bg-zinc-600 text-white/80 hover:text-white transition-colors cursor-pointer shrink-0"
                        title="Copy full address"
                        aria-label="Copy Address"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-red-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {isCopied && (
                      <p className="text-[11px] text-red-400 font-mono font-bold text-right animate-in fade-in">
                        Address copied to clipboard!
                      </p>
                    )}
                  </div>

                  {/* Contact Number Strip */}
                  <div className="p-3.5 rounded-xl bg-zinc-800/80 border border-white/5 mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <Phone className="w-4 h-4 text-red-500 shrink-0" />
                      <div>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider font-mono leading-none">Branch Hotline:</p>
                        <a
                          href={`tel:${branch.contactNumber}`}
                          className="text-base font-bold text-white hover:text-red-500 font-mono tracking-tight transition-colors inline-block mt-1"
                        >
                          {branch.contactNumber}
                        </a>
                      </div>
                    </div>
                    <a
                      href={`tel:${branch.contactNumber}`}
                      className="px-3 py-1.5 bg-zinc-700 hover:bg-red-600 text-xs font-bold uppercase tracking-wider text-white rounded transition-colors"
                    >
                      Call Now
                    </a>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/5">
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`btn-directions-${branch.id}`}
                    className="w-full py-3 px-4 rounded bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-red-950/50"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3 text-white/80" />
                  </a>

                  {onSelectBranchForContact && (
                    <button
                      type="button"
                      onClick={() => onSelectBranchForContact(branch.name)}
                      className="w-full py-3 px-4 rounded bg-zinc-800 hover:bg-zinc-700 text-white/80 hover:text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <CalendarCheck className="w-3.5 h-3.5 text-red-500" />
                      <span>Book a Table</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-zinc-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded bg-red-600/20 border border-red-600/40 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-tight font-['Outfit']">All 4 Branches Follow Standard Service Hours</h4>
              <p className="text-xs text-white/60 font-mono">11:30 AM – 11:00 PM daily throughout the week.</p>
            </div>
          </div>
          <a
            href="#hours"
            className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white/80 text-xs font-bold uppercase tracking-wider rounded border border-white/10 transition-colors shrink-0"
          >
            View Hours Schedule
          </a>
        </div>

      </div>
    </section>
  );
};
