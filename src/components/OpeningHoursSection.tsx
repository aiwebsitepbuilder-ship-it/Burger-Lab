import React, { useState, useEffect } from 'react';
import { Clock, Calendar, AlertCircle, CheckCircle, Info, Sparkles } from 'lucide-react';
import { SCHEDULE_DETAILS } from '../data/restaurantData';
import { getDhakaRestaurantStatus, CurrentStatus } from '../utils/hoursHelper';

export const OpeningHoursSection: React.FC = () => {
  const [status, setStatus] = useState<CurrentStatus>(getDhakaRestaurantStatus());

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getDhakaRestaurantStatus());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hours" className="py-20 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-red-600/20 border border-red-600/40 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-3">
            <Clock className="w-3 h-3 text-red-500" />
            <span>Weekly Schedule</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter font-['Outfit']">
            Opening <span className="text-red-600">Hours</span>
          </h2>
          <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed">
            Burger Lab is available for service throughout the week, from <strong className="text-white font-bold">Sunday to Saturday</strong> across all 4 Dhaka branches.
          </p>
        </div>

        {/* Real-time Status Card */}
        <div className="max-w-3xl mx-auto mb-12 p-6 sm:p-7 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner ${
                status.isOpen
                  ? 'bg-emerald-950/80 border-emerald-700/60 text-emerald-400'
                  : 'bg-red-950/80 border-red-700/60 text-red-400'
              }`}>
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${status.isOpen ? 'bg-emerald-400' : 'bg-red-500'}`} />
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight font-['Outfit']">
                    {status.statusText}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-white/70 mt-0.5">
                  {status.subText}
                </p>
              </div>
            </div>

            <div className="bg-zinc-800/80 px-4 py-2 rounded-xl border border-white/5 text-left sm:text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-white/40 block tracking-widest font-mono">Dhaka Local Time</span>
              <span className="text-sm font-mono font-bold text-red-500">{status.dhakaTimeStr} ({status.dayName})</span>
            </div>
          </div>
        </div>

        {/* Schedule Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Sunday to Thursday */}
          <div className="p-7 rounded-2xl bg-zinc-900 border border-white/5 shadow-xl flex flex-col justify-between hover:border-red-600/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 font-mono">Regular Days</span>
                <Calendar className="w-4 h-4 text-white/40" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight font-['Outfit']">
                Sunday to Thursday
              </h3>
              <div className="my-5 p-4 rounded-xl bg-zinc-800/80 border border-white/5">
                <span className="text-[10px] text-white/40 block mb-1 uppercase tracking-wider font-mono">Kitchen Service Hours</span>
                <span className="text-xl font-black text-white font-['Outfit'] block">
                  11:30 AM – 11:00 PM
                </span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Full-menu dining and takeaway available continuously from lunch until late evening.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center space-x-2 text-[11px] text-emerald-400 font-mono font-bold uppercase tracking-wider">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Standard 5-day cycle</span>
            </div>
          </div>

          {/* Friday (Special Highlight Card) */}
          <div className="p-7 rounded-2xl bg-zinc-900 border-2 border-red-600 shadow-xl shadow-red-950/20 flex flex-col justify-between relative">
            <div className="absolute -top-3 right-6 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded shadow-md font-mono">
              Friday Routine
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 font-mono">Weekend Kickoff</span>
                <Clock className="w-4 h-4 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight font-['Outfit']">
                Friday
              </h3>

              {/* Service Hours */}
              <div className="my-4 p-3.5 rounded-xl bg-zinc-800/80 border border-red-600/30">
                <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block mb-0.5 font-mono">Service Hours:</span>
                <span className="text-lg font-black text-white font-['Outfit'] block">
                  11:30 AM – 11:00 PM
                </span>
              </div>

              {/* Break period notice */}
              <div className="p-3 rounded-xl bg-zinc-800/60 border border-white/5 text-white/70 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-white uppercase tracking-wider text-[10px] font-mono">Break / Closed Period:</strong>
                  <span className="font-mono text-amber-400">3:00 AM – 11:00 AM</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center space-x-2 text-[11px] text-white/60 font-mono font-medium">
              <Info className="w-3.5 h-3.5 text-red-500" />
              <span>Kitchen resumes 11:30 AM</span>
            </div>
          </div>

          {/* Saturday */}
          <div className="p-7 rounded-2xl bg-zinc-900 border border-white/5 shadow-xl flex flex-col justify-between hover:border-red-600/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 font-mono">Weekend Day</span>
                <Calendar className="w-4 h-4 text-white/40" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight font-['Outfit']">
                Saturday
              </h3>
              <div className="my-5 p-4 rounded-xl bg-zinc-800/80 border border-white/5">
                <span className="text-[10px] text-white/40 block mb-1 uppercase tracking-wider font-mono">Kitchen Service Hours</span>
                <span className="text-xl font-black text-white font-['Outfit'] block">
                  11:30 AM – 11:00 PM
                </span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Enjoy your Saturday lunch, snacks, or dinner with our full menu across all 4 branches.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center space-x-2 text-[11px] text-emerald-400 font-mono font-bold uppercase tracking-wider">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Full Saturday service</span>
            </div>
          </div>

        </div>

        {/* Clarity Statement */}
        <div className="mt-10 max-w-3xl mx-auto p-4 rounded-xl bg-zinc-900 border border-white/10 text-center">
          <p className="text-xs sm:text-sm text-white/70">
            <strong className="text-white font-bold uppercase tracking-wider text-xs">Consistency across all branches:</strong> The 11:30 AM to 11:00 PM service schedule is uniformly maintained at Mirpur, Bashundhara, Dhanmondi, and Uttara.
          </p>
        </div>

      </div>
    </section>
  );
};
