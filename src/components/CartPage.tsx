import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  X, 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  Tag, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  RefreshCw,
  Sparkles,
  Utensils,
  ChevronRight,
  Info
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DELIVERY_AREAS, DeliveryArea } from '../data/deliveryAreas';
import { CheckoutModal } from './CheckoutModal';

interface CartPageProps {
  onBackToHome?: () => void;
  onExploreMenu?: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onBackToHome, onExploreMenu }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    setQuantity,
    clearCart,
    deliveryArea,
    setDeliveryArea,
    deliveryAddress,
    setDeliveryAddress,
    promoCode,
    discountAmount,
    promoError,
    promoSuccess,
    applyPromoCode,
    removePromoCode,
    minimumOrderAmount,
    subtotal,
    deliveryCharge,
    discount,
    total,
    totalItemCount,
    isMinimumReached,
    shortageAmount,
    navigateToHome,
    showToast,
  } = useCart();

  // Local state for delivery form inputs before submitting/updating
  const [selectedAreaId, setSelectedAreaId] = useState<string>(deliveryArea.id);
  const [cityInput, setCityInput] = useState<string>(deliveryAddress.city || 'Dhaka');
  const [addressInput, setAddressInput] = useState<string>(deliveryAddress.address || '');
  const [postcodeInput, setPostcodeInput] = useState<string>(deliveryAddress.postcode || '');
  const [couponInput, setCouponInput] = useState<string>('');
  const [isDeliveryUpdated, setIsDeliveryUpdated] = useState<boolean>(false);
  const [isCartUpdatedAnim, setIsCartUpdatedAnim] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Handle Delivery area and address update
  const handleUpdateDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    const area = DELIVERY_AREAS.find((a) => a.id === selectedAreaId) || DELIVERY_AREAS[0];
    setDeliveryArea(area);
    setDeliveryAddress({
      areaId: area.id,
      areaName: area.name,
      city: cityInput,
      address: addressInput,
      postcode: postcodeInput,
    });
    setIsDeliveryUpdated(true);
    showToast(`Delivery area updated to ${area.name} (৳${area.charge})`);
    setTimeout(() => setIsDeliveryUpdated(false), 2500);
  };

  // Handle area selector change directly
  const handleAreaChange = (areaId: string) => {
    setSelectedAreaId(areaId);
    const area = DELIVERY_AREAS.find((a) => a.id === areaId);
    if (area) {
      setDeliveryArea(area);
      setDeliveryAddress({
        ...deliveryAddress,
        areaId: area.id,
        areaName: area.name,
      });
      showToast(`Selected ${area.name} — Delivery charge: ৳${area.charge}`);
    }
  };

  // Handle Update Cart button
  const handleUpdateCart = () => {
    setIsCartUpdatedAnim(true);
    showToast('Cart calculations & item subtotals updated successfully.');
    setTimeout(() => setIsCartUpdatedAnim(false), 1200);
  };

  // Handle Promo Submission
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyPromoCode(couponInput);
    if (success) {
      setCouponInput('');
    }
  };

  const handleGoToMenu = () => {
    if (onExploreMenu) {
      onExploreMenu();
    } else if (onBackToHome) {
      onBackToHome();
    } else {
      navigateToHome();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white py-8 sm:py-12 relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-red-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2 text-xs text-white/50">
            <button
              type="button"
              onClick={handleGoToMenu}
              className="hover:text-red-500 transition-colors uppercase tracking-wider font-semibold cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-white font-bold uppercase tracking-wider">Shopping Cart</span>
          </div>

          <button
            type="button"
            onClick={handleGoToMenu}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white/80 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-red-500" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* 1. TOP MINIMUM ORDER WARNING / SUCCESS NOTIFICATION */}
        <div className="mb-8" id="cart-minimum-order-banner">
          {!isMinimumReached ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 text-amber-300 shadow-xl shadow-amber-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-start sm:items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-400 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-amber-200 tracking-tight">
                    ⚠ Minimum Order Requirement
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-300/90 mt-0.5 leading-relaxed">
                    Your current order total is <span className="font-extrabold text-white bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">৳{subtotal}</span> — you must have an order with a minimum of <span className="font-extrabold text-amber-200">৳{minimumOrderAmount}</span> to place your order.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
                <span className="text-xs font-mono bg-amber-950/60 px-3 py-1.5 rounded-lg border border-amber-500/30 text-amber-200">
                  Add <strong className="text-white font-bold">৳{shortageAmount}</strong> more
                </span>
                <button
                  type="button"
                  onClick={handleGoToMenu}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Add Items
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-300 shadow-xl shadow-emerald-950/20 flex items-center justify-between gap-4 animate-in fade-in duration-300">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-emerald-200 tracking-tight">
                    ✓ Minimum Order Requirement Reached!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-300/90 mt-0.5">
                    Your order total is <strong className="text-white font-extrabold">৳{subtotal}</strong> (exceeds the ৳{minimumOrderAmount} minimum). You are eligible to proceed to checkout!
                  </p>
                </div>
              </div>
              <span className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ready to Checkout</span>
              </span>
            </div>
          )}
        </div>

        {/* 2. CART ITEMS SECTION */}
        <div className="mb-12">
          {/* Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-red-600/20 border border-red-600/40 text-red-500 text-xs font-bold uppercase tracking-widest mb-2 font-mono">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Selected Meals & Indulgences</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-['Outfit']">
                You Have <span className="text-red-600">{totalItemCount}</span> {totalItemCount === 1 ? 'Item' : 'Items'} In Your Cart
              </h1>
            </div>

            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-white/50 hover:text-red-400 transition-colors uppercase tracking-wider font-semibold flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>

          {/* Cart Table / Empty State */}
          {cartItems.length === 0 ? (
            <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-10 sm:p-16 text-center max-w-2xl mx-auto shadow-2xl">
              <div className="w-20 h-20 rounded-2xl bg-red-600/10 border border-red-600/30 text-red-500 flex items-center justify-center mx-auto mb-5 shadow-inner">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight font-['Outfit']">
                Your Shopping Cart Is Empty
              </h3>
              <p className="text-white/60 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                Discover our signature chicken & beef burgers, loaded fries, rice bowls, and sides crafted with consistent Dhaka laboratory perfection.
              </p>
              <button
                type="button"
                onClick={handleGoToMenu}
                className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-red-950/60 inline-flex items-center space-x-2 cursor-pointer"
              >
                <Utensils className="w-4 h-4" />
                <span>Explore Full Menu</span>
              </button>
            </div>
          ) : (
            <div className="bg-zinc-900/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
              
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-zinc-950/80 border-b border-white/10 text-xs font-mono font-bold uppercase tracking-widest text-white/50">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-1 text-right">Subtotal</div>
                <div className="col-span-1 text-center">Remove</div>
              </div>

              {/* Items List (Responsive: Desktop Rows, Mobile Cards) */}
              <div className="divide-y divide-white/5">
                {cartItems.map((item) => {
                  const itemSubtotal = item.price * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="p-4 sm:p-6 md:grid md:grid-cols-12 md:gap-4 md:items-center hover:bg-white/[0.02] transition-colors"
                    >
                      {/* 1. PRODUCT (Col 1-6) */}
                      <div className="md:col-span-6 flex items-start sm:items-center space-x-4 mb-4 md:mb-0">
                        {/* Food Image Thumbnail */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-zinc-950 border border-white/10 shrink-0 relative group">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>

                        {/* Title & Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 flex-wrap gap-1">
                            <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight font-['Outfit'] truncate">
                              {item.name}
                            </h3>
                            {item.variantLabel && (
                              <span className="px-2 py-0.5 rounded bg-red-600/20 border border-red-600/40 text-red-400 text-[10px] font-bold uppercase tracking-wider shrink-0">
                                {item.variantLabel}
                              </span>
                            )}
                          </div>

                          {item.description && (
                            <p className="text-xs text-white/50 line-clamp-1 mt-0.5">
                              {item.description}
                            </p>
                          )}

                          {/* Mobile-only Price Tag */}
                          <div className="md:hidden mt-2 flex items-center space-x-2 text-xs">
                            <span className="text-white/50">Unit Price:</span>
                            <span className="font-bold text-red-500 font-['Outfit'] text-sm">৳{item.price}</span>
                          </div>
                        </div>

                        {/* Mobile Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="md:hidden p-1.5 rounded-lg text-white/40 hover:text-red-500 hover:bg-red-600/10 transition-colors cursor-pointer shrink-0"
                          title="Remove item"
                          aria-label={`Remove ${item.name}`}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* 2. PRICE (Col 7-8) - Desktop */}
                      <div className="hidden md:block md:col-span-2 text-center">
                        <span className="text-base font-extrabold text-white font-['Outfit']">
                          ৳{item.price}
                        </span>
                      </div>

                      {/* 3. QUANTITY (Col 9-10) */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-center mt-3 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                        <span className="md:hidden text-xs text-white/50 uppercase font-mono">
                          Quantity:
                        </span>

                        <div className="inline-flex items-center rounded-xl bg-zinc-950 border border-white/15 p-1 shadow-inner">
                          {/* Decrement Button */}
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white transition-colors cursor-pointer ${
                              item.quantity <= 1
                                ? 'opacity-30 cursor-not-allowed bg-transparent'
                                : 'hover:bg-red-600 active:scale-95 bg-zinc-800'
                            }`}
                            title="Decrease quantity"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>

                          {/* Quantity Number Input/Display */}
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => setQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-10 sm:w-12 text-center bg-transparent text-sm sm:text-base font-black text-white font-['Outfit'] focus:outline-none"
                            aria-label="Quantity"
                          />

                          {/* Increment Button */}
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-800 hover:bg-red-600 text-white flex items-center justify-center active:scale-95 transition-colors cursor-pointer"
                            title="Increase quantity"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* 4. SUBTOTAL (Col 11) */}
                      <div className="flex items-center justify-between md:justify-end md:col-span-1 mt-2 md:mt-0">
                        <span className="md:hidden text-xs text-white/50 uppercase font-mono">
                          Subtotal:
                        </span>
                        <span className="text-base sm:text-lg font-black text-red-500 font-['Outfit']">
                          ৳{itemSubtotal}
                        </span>
                      </div>

                      {/* 5. REMOVE (Col 12) - Desktop */}
                      <div className="hidden md:flex md:col-span-1 justify-center">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-lg bg-zinc-800/80 hover:bg-red-600 text-white/60 hover:text-white flex items-center justify-center transition-all cursor-pointer group"
                          title="Remove item"
                          aria-label={`Remove ${item.name}`}
                        >
                          <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}
        </div>

        {/* 3. SECTION BELOW THE CART (Two-column layout on desktop, stacked on mobile) */}
        {cartItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ========================================================================= */}
            {/* LEFT COLUMN: "Calculate Delivery" */}
            {/* ========================================================================= */}
            <div className="lg:col-span-7 bg-zinc-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
              <div className="flex items-center space-x-2.5 mb-6 border-b border-white/10 pb-4">
                <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-600/40 text-red-500 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-['Outfit']">
                    Calculate Delivery
                  </h2>
                  <p className="text-xs text-white/50">
                    Express food delivery direct from your nearest Dhaka Burger Lab kitchen
                  </p>
                </div>
              </div>

              <form onSubmit={handleUpdateDelivery} className="space-y-4">
                
                {/* 1. Select Delivery Area */}
                <div>
                  <label htmlFor="delivery-area-select" className="block text-xs font-mono uppercase font-bold text-white/70 mb-1.5">
                    Select Delivery Area <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500 pointer-events-none" />
                    <select
                      id="delivery-area-select"
                      value={selectedAreaId}
                      onChange={(e) => handleAreaChange(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-zinc-950 border border-white/15 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-red-600 transition-colors cursor-pointer appearance-none"
                    >
                      {DELIVERY_AREAS.map((area) => (
                        <option key={area.id} value={area.id} className="bg-zinc-900 text-white py-2">
                          {area.name} — ৳{area.charge} ({area.estimatedTime})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-white/50 px-1">
                    <span>Zone: <strong className="text-white/80">{deliveryArea.zone}</strong></span>
                    <span>Est. Delivery: <strong className="text-red-400 font-mono">{deliveryArea.estimatedTime}</strong></span>
                  </div>
                </div>

                {/* 2. City / Area & Postcode Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* City/Area */}
                  <div>
                    <label htmlFor="city-input" className="block text-xs font-mono uppercase font-bold text-white/70 mb-1.5">
                      City / Metropolis
                    </label>
                    <input
                      id="city-input"
                      type="text"
                      value={cityInput}
                      onChange={(e) => setCityInput(e.target.value)}
                      placeholder="e.g. Dhaka"
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-white/15 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>

                  {/* Optional Postcode */}
                  <div>
                    <label htmlFor="postcode-input" className="block text-xs font-mono uppercase font-bold text-white/70 mb-1.5">
                      Postcode <span className="text-white/40 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      id="postcode-input"
                      type="text"
                      value={postcodeInput}
                      onChange={(e) => setPostcodeInput(e.target.value)}
                      placeholder="e.g. 1216, 1229"
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-white/15 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                </div>

                {/* 3. Delivery Address */}
                <div>
                  <label htmlFor="address-textarea" className="block text-xs font-mono uppercase font-bold text-white/70 mb-1.5">
                    Delivery Address & Landmarks <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address-textarea"
                    rows={2}
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    placeholder="House/Apartment #, Road #, Sector/Block, Nearby Landmark..."
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-white/15 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-red-600 transition-colors resize-none"
                  />
                </div>

                {/* UPDATE Button */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    id="btn-update-delivery"
                    className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/10 flex items-center space-x-2 cursor-pointer shadow-md"
                  >
                    {isDeliveryUpdated ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>UPDATED</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 text-red-500" />
                        <span>UPDATE</span>
                      </>
                    )}
                  </button>

                  <span className="text-xs text-white/50 font-mono">
                    Delivery: <strong className="text-white font-bold font-['Outfit']">৳{deliveryCharge}</strong>
                  </span>
                </div>
              </form>

              {/* Nearest Kitchen Hint */}
              <div className="mt-6 p-3 rounded-xl bg-zinc-950/60 border border-white/5 flex items-start space-x-3 text-xs text-white/60">
                <Info className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>
                  Orders are dispatched hot from your closest Burger Lab branch (Mirpur, Bashundhara, Dhanmondi, or Uttara) to maintain peak crispness and juicy flavor.
                </span>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* RIGHT COLUMN: "Cart Totals" */}
            {/* ========================================================================= */}
            <div className="lg:col-span-5 bg-zinc-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-['Outfit']">
                    Cart Totals
                  </h2>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 border border-white/5 text-white/60">
                    {totalItemCount} Items
                  </span>
                </div>

                {/* Totals Breakdown */}
                <div className="space-y-3.5 mb-6 text-sm">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-white/70">
                    <span>Subtotal</span>
                    <span className="font-bold text-white font-['Outfit'] text-base">
                      ৳{subtotal}
                    </span>
                  </div>

                  {/* Delivery Charge */}
                  <div className="flex items-center justify-between text-white/70">
                    <div className="flex items-center space-x-1.5">
                      <span>Delivery Charge</span>
                      <span className="text-[11px] text-white/40 font-mono">({deliveryArea.name.split(' ')[0]})</span>
                    </div>
                    <span className="font-bold text-white font-['Outfit'] text-base">
                      ৳{deliveryCharge}
                    </span>
                  </div>

                  {/* Discount (only show if applicable) */}
                  {discount > 0 && (
                    <div className="flex items-center justify-between text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-xl border border-emerald-500/20 animate-in fade-in duration-200">
                      <div className="flex items-center space-x-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        <span className="font-semibold text-xs uppercase">Discount ({promoCode})</span>
                      </div>
                      <span className="font-extrabold font-['Outfit'] text-base">
                        −৳{discount}
                      </span>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-t border-white/10 pt-3 flex items-baseline justify-between">
                    <div>
                      <span className="text-base sm:text-lg font-black text-white uppercase tracking-tight font-['Outfit']">
                        Total
                      </span>
                      <span className="block text-[10px] text-white/40 font-mono">Includes VAT & Delivery</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-black text-red-500 font-['Outfit']">
                        ৳{total}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Promo Code Input Box */}
                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/10 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono uppercase font-bold text-white/60 flex items-center space-x-1">
                      <Tag className="w-3 h-3 text-red-500" />
                      <span>Have a Promo Coupon?</span>
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">Try: BURGERLAB10</span>
                  </div>

                  {promoCode ? (
                    <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2 text-xs">
                      <span className="text-emerald-400 font-bold font-mono">Coupon: {promoCode}</span>
                      <button
                        type="button"
                        onClick={removePromoCode}
                        className="text-white/50 hover:text-red-400 text-xs font-bold uppercase transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Coupon Code"
                        className="flex-1 px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-lg text-xs uppercase text-white placeholder-white/40 focus:outline-none focus:border-red-600 font-mono"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase rounded-lg border border-white/10 transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {promoError && (
                    <p className="text-[11px] text-red-400 mt-1.5 font-mono">{promoError}</p>
                  )}
                  {promoSuccess && (
                    <p className="text-[11px] text-emerald-400 mt-1.5 font-mono">{promoSuccess}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons: UPDATE CART & PROCEED TO CHECKOUT */}
              <div className="space-y-3 pt-2">
                {/* 1. UPDATE CART Button */}
                <button
                  type="button"
                  id="btn-update-cart"
                  onClick={handleUpdateCart}
                  className={`w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-white font-bold text-xs uppercase tracking-widest transition-all border border-white/10 flex items-center justify-center space-x-2 cursor-pointer ${
                    isCartUpdatedAnim ? 'ring-2 ring-red-600' : ''
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-red-500 ${isCartUpdatedAnim ? 'animate-spin' : ''}`} />
                  <span>UPDATE CART</span>
                </button>

                {/* 2. PROCEED TO CHECKOUT Button */}
                <button
                  type="button"
                  id="btn-proceed-to-checkout"
                  onClick={() => {
                    if (isMinimumReached) {
                      setIsCheckoutOpen(true);
                    } else {
                      showToast(`Minimum order requirement is ৳${minimumOrderAmount}. Please add ৳${shortageAmount} more!`);
                    }
                  }}
                  disabled={!isMinimumReached}
                  className={`w-full py-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-200 flex items-center justify-center space-x-2 shadow-2xl cursor-pointer ${
                    isMinimumReached
                      ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-red-950/80 hover:scale-[1.01]'
                      : 'bg-zinc-800/80 text-white/30 border border-white/5 cursor-not-allowed'
                  }`}
                  title={
                    isMinimumReached
                      ? 'Proceed with your food order'
                      : `Minimum order amount of ৳${minimumOrderAmount} required`
                  }
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Explanatory notice when checkout is disabled */}
                {!isMinimumReached && (
                  <p className="text-[11px] text-center text-amber-400/90 font-mono leading-tight">
                    * Minimum order of ৳{minimumOrderAmount} required. Add ৳{shortageAmount} more to checkout.
                  </p>
                )}
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Full Interactive Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderCompleted={() => {
          setIsCheckoutOpen(false);
          clearCart();
          handleGoToMenu();
        }}
      />
    </div>
  );
};
