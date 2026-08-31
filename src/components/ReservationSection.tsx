import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  Facebook,
  Sparkles,
  CalendarCheck,
  AlertCircle,
  Armchair,
  PartyPopper,
  Info
} from 'lucide-react';
import { BRANCHES, RESTAURANT_INFO } from '../data/restaurantData';
import { ReservationFormData, ConfirmedReservation } from '../types';

interface ReservationSectionProps {
  initialBranch?: string;
}

const TIME_SLOTS = [
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '06:00 PM',
  '06:30 PM',
  '07:00 PM',
  '07:30 PM',
  '08:00 PM',
  '08:30 PM',
  '09:00 PM',
  '09:30 PM',
  '10:00 PM',
];

const SEATING_PREFERENCES = [
  'Standard Dining Table',
  'Cozy Booth',
  'Window-side Seating',
  'Quiet Corner',
  'Large Group Table'
];

const OCCASIONS = [
  'Casual Dining / Hangout',
  'Birthday Celebration',
  'Family Dinner',
  'Anniversary / Date',
  'Office / Business Lunch',
  'Treat / Party'
];

export const ReservationSection: React.FC<ReservationSectionProps> = ({ initialBranch }) => {
  // Find initial branch ID if matching name provided
  const initialBranchObj = BRANCHES.find(b => b.name === initialBranch) || BRANCHES[0];

  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    phone: '',
    email: '',
    branchId: initialBranchObj.id,
    date: new Date().toISOString().split('T')[0],
    timeSlot: '07:00 PM',
    guests: 2,
    seatingPreference: 'Standard Dining Table',
    occasion: 'Casual Dining / Hangout',
    specialRequests: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationFormData, string>>>({});
  const [confirmedReservation, setConfirmedReservation] = useState<ConfirmedReservation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBranch = BRANCHES.find(b => b.id === formData.branchId) || BRANCHES[0];

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ReservationFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your contact phone number.';
    } else if (!/^[0-9+-\s()]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (e.g. 01815008065).';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address for confirmation.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a reservation date.';
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Please select a preferred time slot.';
    }

    if (formData.guests < 1 || formData.guests > 30) {
      newErrors.guests = 'Guest count must be between 1 and 30.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateQuickSelect = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    setFormData({ ...formData, date: d.toISOString().split('T')[0] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate reservation processing
    setTimeout(() => {
      setIsSubmitting(false);
      const randomId = `BL-${selectedBranch.area.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      setConfirmedReservation({
        ...formData,
        bookingId: randomId,
        createdAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        branchName: selectedBranch.name,
        branchAddress: selectedBranch.address,
        branchPhone: selectedBranch.displayPhone
      });
    }, 700);
  };

  const handleResetReservation = () => {
    setConfirmedReservation(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      branchId: BRANCHES[0].id,
      date: new Date().toISOString().split('T')[0],
      timeSlot: '07:00 PM',
      guests: 2,
      seatingPreference: 'Standard Dining Table',
      occasion: 'Casual Dining / Hangout',
      specialRequests: ''
    });
    setErrors({});
  };

  return (
    <section id="reservation" className="py-20 bg-[#0A0A0A] relative overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-red-600/20 border border-red-600/40 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-3 font-mono">
            <CalendarCheck className="w-3.5 h-3.5 text-red-500" />
            <span>Table Booking & Dine-In</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter font-['Outfit']">
            Book a <span className="text-red-600">Table</span>
          </h2>
          <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed">
            Plan your visit to Burger Lab at Mirpur, Bashundhara, Dhanmondi, or Uttara. Guarantee your table for casual dining, birthdays, and celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Official Channels & Branch Hotlines (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Reservation Highlights */}
            <div className="p-6 sm:p-7 rounded-2xl bg-zinc-900 border border-white/10 shadow-xl space-y-5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight font-['Outfit']">
                    Dining Reservations
                  </h3>
                  <p className="text-xs text-white/60">Instant table allocation across all 4 Dhaka branches</p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs text-white/80">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Zero Booking Fee:</strong> Reservations are completely complimentary.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>15-Minute Grace Window:</strong> Your table is held for 15 minutes past reservation time.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Parties & Celebrations:</strong> Birthday setup and custom seating arrangements available upon request.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-800/80 border border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span className="font-mono text-white/80">Daily Kitchen Hours</span>
                </div>
                <span className="font-bold text-red-500 font-mono">11:30 AM – 11:00 PM</span>
              </div>
            </div>

            {/* Branch Phone Directory for Instant Call Booking */}
            <div className="p-6 sm:p-7 rounded-2xl bg-zinc-900 border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight font-['Outfit']">
                  Direct Branch Hotline
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 font-mono">Call Anytime</span>
              </div>
              <p className="text-xs text-white/60">
                Prefer to book over the phone or have an urgent party request? Call your chosen branch directly:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {BRANCHES.map((b) => (
                  <div key={b.id} className="p-3.5 rounded-xl bg-zinc-800/80 border border-white/5 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-red-500 uppercase tracking-tight block">{b.name.replace(' Branch', '')}</span>
                      <span className="text-[11px] text-white/50 truncate block mt-0.5 font-serif italic">{b.area}</span>
                    </div>
                    <a
                      href={`tel:${b.contactNumber}`}
                      className="mt-3 text-xs font-mono font-bold text-white hover:text-red-500 flex items-center space-x-1.5"
                    >
                      <Phone className="w-3 h-3 text-red-500" />
                      <span>{b.displayPhone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Support Channels */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-white/80 hover:text-white font-mono">
                  {RESTAURANT_INFO.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Facebook className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={RESTAURANT_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white"
                >
                  Facebook Page
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Reservation Form or Confirmation Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-8 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl relative">
              
              {confirmedReservation ? (
                /* Confirmation View */
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/40 text-emerald-400 flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-bold uppercase tracking-tight text-white font-['Outfit']">
                        Reservation Request Confirmed!
                      </h4>
                      <p className="text-xs text-emerald-300 mt-0.5">
                        Your table booking has been recorded. A notification has been dispatched for <strong>{confirmedReservation.name}</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Summary Ticket Card */}
                  <div className="p-6 rounded-xl bg-zinc-800/90 border border-white/10 space-y-4 font-mono">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-[11px] uppercase tracking-widest text-white/40">Reservation ID</span>
                      <span className="text-base font-bold text-red-500 tracking-wider">{confirmedReservation.bookingId}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-white/40 block text-[10px] uppercase tracking-wider">Branch</span>
                        <strong className="text-white font-bold text-sm block mt-0.5">{confirmedReservation.branchName}</strong>
                        <span className="text-white/60 text-[11px] font-serif italic block mt-0.5">{confirmedReservation.branchAddress}</span>
                      </div>

                      <div>
                        <span className="text-white/40 block text-[10px] uppercase tracking-wider">Date & Time</span>
                        <strong className="text-white font-bold text-sm block mt-0.5">
                          {confirmedReservation.date} at {confirmedReservation.timeSlot}
                        </strong>
                        <span className="text-white/60 text-[11px] block mt-0.5">{confirmedReservation.guests} Guest(s) • {confirmedReservation.seatingPreference}</span>
                      </div>

                      <div>
                        <span className="text-white/40 block text-[10px] uppercase tracking-wider">Contact Person</span>
                        <strong className="text-white block mt-0.5">{confirmedReservation.name}</strong>
                        <span className="text-white/60">{confirmedReservation.phone}</span>
                      </div>

                      <div>
                        <span className="text-white/40 block text-[10px] uppercase tracking-wider">Occasion</span>
                        <strong className="text-white block mt-0.5">{confirmedReservation.occasion}</strong>
                        <span className="text-white/60">{confirmedReservation.email}</span>
                      </div>
                    </div>

                    {confirmedReservation.specialRequests && (
                      <div className="border-t border-white/10 pt-3">
                        <span className="text-white/40 block text-[10px] uppercase tracking-wider">Special Instructions:</span>
                        <p className="text-xs text-white/80 font-sans italic mt-1 bg-zinc-900/80 p-2.5 rounded border border-white/5">
                          &quot;{confirmedReservation.specialRequests}&quot;
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions after booking */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={`tel:${confirmedReservation.branchPhone}`}
                      className="flex-1 py-3 px-4 rounded bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs uppercase tracking-widest text-center shadow-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Branch Hotline</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleResetReservation}
                      className="py-3 px-5 rounded bg-zinc-800 hover:bg-zinc-700 text-white/80 hover:text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-colors cursor-pointer"
                    >
                      Make Another Booking
                    </button>
                  </div>
                </div>
              ) : (
                /* Reservation Form */
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight font-['Outfit']">
                      Book a Table
                    </h3>
                    <p className="text-xs text-white/60 mt-1">
                      Choose your preferred branch, date, and time. No upfront charge required.
                    </p>
                  </div>

                  {/* Step 1: Select Branch */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2 font-mono">
                      1. Select Branch <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BRANCHES.map((b) => {
                        const isSelected = formData.branchId === b.id;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, branchId: b.id })}
                            className={`p-3 rounded-lg text-left transition-all border cursor-pointer ${
                              isSelected
                                ? 'bg-red-600 text-white border-red-600 shadow-md'
                                : 'bg-zinc-800 text-white/70 border-white/5 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            <span className="block text-xs font-bold uppercase tracking-tight">{b.name.replace(' Branch', '')}</span>
                            <span className="block text-[10px] opacity-70 truncate font-serif italic">{b.area}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Date & Quick Buttons */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="res-date" className="block text-[10px] font-bold uppercase tracking-widest text-white/60 font-mono">
                        2. Date <span className="text-red-500">*</span>
                      </label>
                      <div className="flex space-x-1.5">
                        <button
                          type="button"
                          onClick={() => handleDateQuickSelect(0)}
                          className="px-2 py-0.5 text-[10px] font-mono uppercase rounded bg-zinc-800 hover:bg-zinc-700 text-white/80 hover:text-white border border-white/5 cursor-pointer"
                        >
                          Today
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDateQuickSelect(1)}
                          className="px-2 py-0.5 text-[10px] font-mono uppercase rounded bg-zinc-800 hover:bg-zinc-700 text-white/80 hover:text-white border border-white/5 cursor-pointer"
                        >
                          Tomorrow
                        </button>
                      </div>
                    </div>
                    <input
                      id="res-date"
                      type="date"
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg bg-zinc-800 text-white text-sm border focus:outline-none transition-colors ${
                        errors.date ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-red-600'
                      }`}
                    />
                    {errors.date && <p className="mt-1 text-xs text-red-400">{errors.date}</p>}
                  </div>

                  {/* Step 3: Time Slot & Guest Count */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="res-timeslot" className="block text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1.5 font-mono">
                        3. Time Slot <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="res-timeslot"
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 text-white text-sm border border-white/10 focus:border-red-600 focus:outline-none transition-colors"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="res-guests" className="block text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1.5 font-mono">
                        4. Number of Guests <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          id="res-guests"
                          type="number"
                          min={1}
                          max={30}
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                          className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 text-white text-sm border border-white/10 focus:border-red-600 focus:outline-none"
                        />
                        <span className="text-xs text-white/50 font-mono shrink-0">Person(s)</span>
                      </div>
                      {errors.guests && <p className="mt-1 text-xs text-red-400">{errors.guests}</p>}
                    </div>
                  </div>

                  {/* Step 4: Seating & Occasion */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="res-seating" className="block text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1.5 font-mono">
                        Seating Preference
                      </label>
                      <select
                        id="res-seating"
                        value={formData.seatingPreference}
                        onChange={(e) => setFormData({ ...formData, seatingPreference: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 text-white text-sm border border-white/10 focus:border-red-600 focus:outline-none"
                      >
                        {SEATING_PREFERENCES.map((seat) => (
                          <option key={seat} value={seat}>
                            {seat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="res-occasion" className="block text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1.5 font-mono">
                        Occasion
                      </label>
                      <select
                        id="res-occasion"
                        value={formData.occasion}
                        onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 text-white text-sm border border-white/10 focus:border-red-600 focus:outline-none"
                      >
                        {OCCASIONS.map((occ) => (
                          <option key={occ} value={occ}>
                            {occ}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Step 5: Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div>
                      <label htmlFor="res-name" className="block text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1 font-mono">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="res-name"
                        type="text"
                        placeholder="e.g. Tanvir Ahmed"
                        value={formData.name}
                        onChange={(e) => {
                          const lettersOnly = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                          setFormData({ ...formData, name: lettersOnly });
                        }}
                        onKeyDown={(e) => {
                          if (['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', ' '].includes(e.key)) return;
                          if (!/^[a-zA-Z]$/.test(e.key) && !e.ctrlKey && !e.metaKey) {
                            e.preventDefault();
                          }
                        }}
                        className={`w-full px-3 py-2.5 rounded-lg bg-zinc-800 text-white text-sm border focus:outline-none transition-colors ${
                          errors.name ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-red-600'
                        }`}
                      />
                      {errors.name && <p className="mt-1 text-[11px] text-red-400">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="res-phone" className="block text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1 font-mono">
                        Phone Number (Numbers Only) <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="res-phone"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="e.g. 01815008065"
                        value={formData.phone}
                        onChange={(e) => {
                          const numbersOnly = e.target.value.replace(/\D/g, '').slice(0, 15);
                          setFormData({ ...formData, phone: numbersOnly });
                        }}
                        onKeyDown={(e) => {
                          if (['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)) return;
                          if (!/^[0-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey) {
                            e.preventDefault();
                          }
                        }}
                        className={`w-full px-3 py-2.5 rounded-lg bg-zinc-800 text-white text-sm border focus:outline-none transition-colors font-mono ${
                          errors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-red-600'
                        }`}
                      />
                      {errors.phone && <p className="mt-1 text-[11px] text-red-400">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="res-email" className="block text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1 font-mono">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="res-email"
                        type="email"
                        placeholder="e.g. name@mail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3 py-2.5 rounded-lg bg-zinc-800 text-white text-sm border focus:outline-none transition-colors ${
                          errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-red-600'
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-[11px] text-red-400">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label htmlFor="res-special" className="block text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1 font-mono">
                      Special Requests / Dietary Notes (Optional)
                    </label>
                    <textarea
                      id="res-special"
                      rows={2}
                      placeholder="e.g. Need high chair, celebrating a birthday, prefer quiet seating..."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white text-sm border border-white/10 focus:border-red-600 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="btn-submit-reservation"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-red-950/60 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Booking Table...</span>
                    ) : (
                      <>
                        <CalendarCheck className="w-4 h-4" />
                        <span>Confirm Table Booking</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
