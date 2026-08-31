import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { MenuCategoriesSection } from './components/MenuCategoriesSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { BranchesSection } from './components/BranchesSection';
import { OpeningHoursSection } from './components/OpeningHoursSection';
import { ReservationSection } from './components/ReservationSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { OnlineOrderModal } from './components/OnlineOrderModal';
import { CartPage } from './components/CartPage';
import { Branch } from './types';
import { ShoppingCart, CheckCircle2, ArrowRight } from 'lucide-react';

function MainAppContent() {
  const [selectedBranchForReservation, setSelectedBranchForReservation] = useState<string>('Mirpur Branch');
  const [isOnlineOrderOpen, setIsOnlineOrderOpen] = useState(false);

  const {
    currentView,
    navigateToCart,
    navigateToHome,
    totalItemCount,
    subtotal,
    toastMessage,
  } = useCart();

  const scrollToElement = (elementId: string) => {
    if (currentView !== 'home') {
      navigateToHome();
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          const yOffset = -75;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const el = document.getElementById(elementId);
    if (el) {
      const yOffset = -75;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleExploreMenu = () => {
    scrollToElement('menu');
  };

  const handleFindBranch = () => {
    scrollToElement('branches');
  };

  const handleSelectBranchForReservation = (branchName: string) => {
    setSelectedBranchForReservation(branchName);
    scrollToElement('reservation');
  };

  const handleSelectBranchFromModal = (branch: Branch) => {
    setSelectedBranchForReservation(branch.name);
    scrollToElement('reservation');
  };

  const handleBackToHome = () => {
    navigateToHome();
  };

  const handleExploreMenuFromCart = () => {
    navigateToHome();
    setTimeout(() => {
      scrollToElement('menu');
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-red-600 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenOnlineOrder={() => setIsOnlineOrderOpen(true)}
      />

      {/* View Switcher: Cart Page vs Home Page */}
      {currentView === 'cart' ? (
        <main className="flex-1">
          <CartPage
            onBackToHome={handleBackToHome}
            onExploreMenu={handleExploreMenuFromCart}
          />
        </main>
      ) : (
        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection
            onExploreMenu={handleExploreMenu}
            onFindBranch={handleFindBranch}
          />

          {/* About Burger Lab */}
          <AboutSection />

          {/* Popular Menu Categories */}
          <MenuCategoriesSection
            onSelectBranch={handleSelectBranchFromModal}
            onOpenOnlineOrder={() => setIsOnlineOrderOpen(true)}
          />

          {/* Why Choose Burger Lab */}
          <WhyChooseSection />

          {/* Dedicated Branches Section */}
          <BranchesSection
            onSelectBranchForContact={handleSelectBranchForReservation}
          />

          {/* Opening Hours Section */}
          <OpeningHoursSection />

          {/* Table Reservation Section */}
          <ReservationSection
            initialBranch={selectedBranchForReservation}
          />

          {/* Pre-Footer Call to Action */}
          <CTASection
            onExploreMenu={handleExploreMenu}
            onFindBranch={handleFindBranch}
          />
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Floating Bottom Quick-Cart Trigger (When on Home & items in Cart) */}
      {currentView === 'home' && totalItemCount > 0 && (
        <div className="fixed bottom-5 right-5 z-40 animate-in slide-in-from-bottom-5 duration-300">
          <button
            type="button"
            onClick={navigateToCart}
            className="px-4 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-2xl shadow-red-950 flex items-center space-x-3 border border-white/20 group cursor-pointer hover:scale-105 transition-all"
            aria-label="View Cart"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 group-hover:rotate-6 transition-transform" />
              <span className="absolute -top-2 -right-2 px-1.5 min-w-[18px] h-[18px] text-[10px] font-black rounded-full bg-white text-red-600 flex items-center justify-center font-mono shadow">
                {totalItemCount}
              </span>
            </div>
            <div className="text-left">
              <span className="block text-[10px] text-white/80 leading-none">View Cart</span>
              <span className="block text-sm font-black font-['Outfit'] leading-tight">৳{subtotal}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Toast Notification Snackbar */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white text-xs font-semibold shadow-2xl flex items-center space-x-2.5 backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Online Order Modal */}
      <OnlineOrderModal
        isOpen={isOnlineOrderOpen}
        onClose={() => setIsOnlineOrderOpen(false)}
        onExploreMenu={handleExploreMenu}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}
