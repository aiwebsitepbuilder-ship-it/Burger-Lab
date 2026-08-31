import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShoppingBag, 
  Phone, 
  MapPin, 
  CreditCard, 
  DollarSign, 
  Clock, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Utensils
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRANCHES } from '../data/restaurantData';
import { BurgerLabLogo } from './BurgerLabLogo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderCompleted,
}) => {
  const {
    cartItems,
    deliveryArea,
    deliveryAddress,
    subtotal,
    deliveryCharge,
    discount,
    promoCode,
    total,
    totalItemCount,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [detailedAddress, setDetailedAddress] = useState(deliveryAddress.address || '');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'card'>('cod');
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0].name);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only letters (A-Z, a-z) and spaces allowed
    const lettersOnly = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setCustomerName(lettersOnly);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only numbers/digits allowed (max 15 digits)
    const numbersOnly = e.target.value.replace(/\D/g, '').slice(0, 15);
    setCustomerPhone(numbersOnly);
  };
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !detailedAddress) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `BL-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrderId(generatedId);
      setIsSubmitting(false);
      setOrderConfirmed(true);
    }, 900);
  };

  const handleModalClose = () => {
    if (orderConfirmed) {
      setOrderConfirmed(false);
      onOrderCompleted();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-zinc-900 border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleModalClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderConfirmed ? (
          <div>
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/10">
              <BurgerLabLogo size={44} className="rounded-full shadow-lg shadow-red-950/60 shrink-0" />
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-red-600/20 text-red-500 text-[10px] font-bold uppercase tracking-widest font-mono mb-1">
                  <span>Fast Checkout</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-['Outfit']">
                  Complete Your Burger Lab Order
                </h2>
              </div>
            </div>

            {/* Order Mini-Summary Banner */}
            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/10 mb-6 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4 text-red-500" />
                <span className="text-white/80 font-medium">
                  {totalItemCount} Items ({deliveryArea.name})
                </span>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-white/60">Total to Pay:</span>
                <span className="text-base font-black text-red-500 font-['Outfit']">Tk {total}</span>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              
              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-white/70 mb-1">
                    Your Full Name (Letters Only) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={handleNameChange}
                    onKeyDown={(e) => {
                      // Allow navigation, delete, backspace, tab, space
                      if (['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', ' '].includes(e.key)) return;
                      // Block numbers and non-letter keys
                      if (!/^[a-zA-Z]$/.test(e.key) && !e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                      }
                    }}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/15 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-white/70 mb-1">
                    Phone Number (Numbers Only) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                    value={customerPhone}
                    onChange={handlePhoneChange}
                    onKeyDown={(e) => {
                      // Allow navigation, delete, backspace, tab
                      if (['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)) return;
                      // Block non-digit keys
                      if (!/^[0-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                      }
                    }}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/15 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-red-600 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Delivery Address Details */}
              <div>
                <label className="block text-xs font-mono uppercase font-bold text-white/70 mb-1">
                  Exact Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={detailedAddress}
                  onChange={(e) => setDetailedAddress(e.target.value)}
                  placeholder="House/Holding #, Flat/Floor, Road #, Sector/Block, Dhaka..."
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/15 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-red-600 transition-colors resize-none"
                />
              </div>

              {/* Nearest Kitchen & Special Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-white/70 mb-1">
                    Fulfilling Branch
                  </label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-red-600 transition-colors cursor-pointer"
                  >
                    {BRANCHES.map((b) => (
                      <option key={b.id} value={b.name} className="bg-zinc-900 text-white">
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-white/70 mb-1">
                    Special Cooking / Delivery Notes
                  </label>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Extra napkins, less spicy"
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/15 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-mono uppercase font-bold text-white/70 mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'bg-red-600/20 border-red-600 text-white font-bold'
                        : 'bg-zinc-950/60 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    <DollarSign className="w-4 h-4 mx-auto mb-1 text-red-500" />
                    <span className="text-[11px] block">Cash on Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'bkash'
                        ? 'bg-pink-600/20 border-pink-500 text-white font-bold'
                        : 'bg-zinc-950/60 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    <span className="text-pink-400 font-bold block text-xs mb-1">bKash</span>
                    <span className="text-[11px] block">Online Payment</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'nagad'
                        ? 'bg-orange-600/20 border-orange-500 text-white font-bold'
                        : 'bg-zinc-950/60 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    <span className="text-orange-400 font-bold block text-xs mb-1">Nagad</span>
                    <span className="text-[11px] block">Digital Wallet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-red-600/20 border-red-600 text-white font-bold'
                        : 'bg-zinc-950/60 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1 text-red-500" />
                    <span className="text-[11px] block">POS Card on Del.</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-red-950/80 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>PLACING YOUR ORDER...</span>
                  ) : (
                    <>
                      <span>CONFIRM ORDER (Tk {total})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Order Confirmation Screen */
          <div className="text-center py-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-950/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-mono font-bold uppercase tracking-widest inline-block mb-2">
              Order Confirmed • #{confirmedOrderId}
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-['Outfit']">
              Thank You, {customerName}!
            </h3>

            <p className="text-white/70 text-sm mt-2 max-w-md mx-auto leading-relaxed">
              Your order has been received by <strong className="text-white">{selectedBranch}</strong>. Our kitchen is firing up your fresh burgers!
            </p>

            {/* Receipt Summary Card */}
            <div className="mt-6 p-4 rounded-xl bg-zinc-950 border border-white/10 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between text-white/60">
                <span>Order ID:</span>
                <span className="text-white font-mono font-bold">{confirmedOrderId}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Delivery Area:</span>
                <span className="text-white font-semibold">{deliveryArea.name}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Estimated Time:</span>
                <span className="text-emerald-400 font-mono font-bold">{deliveryArea.estimatedTime}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Payment Method:</span>
                <span className="text-white uppercase font-bold">{paymentMethod.toUpperCase()}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between text-sm">
                <span className="font-bold text-white">Grand Total:</span>
                <span className="font-black text-red-500 font-['Outfit'] text-base">Tk {total}</span>
              </div>
            </div>

            {/* Assistance Quick Actions */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>WhatsApp Kitchen Updates</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleModalClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Done & Back to Menu
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
