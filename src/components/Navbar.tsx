import React, { useState, useEffect, useRef } from 'react';
import {
  Utensils,
  Menu as MenuIcon,
  X,
  MapPin,
  ShoppingBag,
  ShoppingCart,
  CalendarCheck,
  ChevronDown,
  Info,
  Clock,
  Flame
} from 'lucide-react';
import { BurgerLabLogo } from './BurgerLabLogo';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onSelectCategory?: (categoryId: string) => void;
  onOpenOnlineOrder?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOnlineOrder }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { totalItemCount, currentView, navigateToCart, navigateToHome } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Spy on active sections
      const sections = ['home', 'about', 'menu', 'why-us', 'branches', 'hours', 'reservation'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMoreDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Main navigation items shown directly in navbar
  const primaryNavLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: 'Book a Table', href: '#reservation', id: 'reservation' },
  ];

  // Secondary navigation items placed inside the "More" dropdown
  const moreNavLinks = [
    { name: 'About Us', href: '#about', id: 'about', icon: Info, desc: 'Our story, mission & quality pledge' },
    { name: 'Why Burger Lab', href: '#why-us', id: 'why-us', icon: Flame, desc: 'Fresh ingredients & consistent taste' },
    { name: 'Branches', href: '#branches', id: 'branches', icon: MapPin, desc: 'Mirpur, Bashundhara, Dhanmondi, Uttara' },
    { name: 'Opening Hours', href: '#hours', id: 'hours', icon: Clock, desc: 'Dhaka dine-in & delivery schedules' },
  ];

  const isMoreActive = moreNavLinks.some(item => activeSection === item.id);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    if (currentView === 'cart') {
      navigateToHome();
      setTimeout(() => {
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleOnlineOrderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    if (onOpenOnlineOrder) {
      onOpenOnlineOrder();
    }
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    navigateToCart();
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-2xl shadow-black/80 border-b border-white/10 py-3.5'
          : 'bg-[#0A0A0A] border-b border-white/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-3 group"
            id="navbar-brand-logo"
          >
            <BurgerLabLogo
              size={44}
              className="rounded-full shadow-lg shadow-red-950/60 group-hover:scale-105 transition-transform duration-200"
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-white font-['Outfit']">
                Burger<span className="text-red-600">Lab</span>
              </span>
              <span className="text-[9px] tracking-widest text-white/40 uppercase font-bold">
                Consistency in Quality
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs font-semibold uppercase tracking-widest text-white/60" aria-label="Main Navigation">
            {/* Home */}
            <a
              href="#home"
              id="nav-link-home"
              onClick={(e) => scrollToSection(e, '#home')}
              className={`transition-colors duration-150 relative py-1 ${
                activeSection === 'home'
                  ? 'text-white font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Home
              {activeSection === 'home' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
              )}
            </a>

            {/* Menu */}
            <a
              href="#menu"
              id="nav-link-menu"
              onClick={(e) => scrollToSection(e, '#menu')}
              className={`transition-colors duration-150 relative py-1 ${
                activeSection === 'menu'
                  ? 'text-white font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Menu
              {activeSection === 'menu' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
              )}
            </a>

            {/* Online Order Button (Beside Menu) */}
            <button
              type="button"
              id="nav-btn-online-order"
              onClick={handleOnlineOrderClick}
              className="transition-colors duration-150 relative py-1 text-white/60 hover:text-white text-xs font-semibold uppercase tracking-widest cursor-pointer"
            >
              Online Order
            </button>

            {/* Book a Table */}
            <a
              href="#reservation"
              id="nav-link-reservation"
              onClick={(e) => scrollToSection(e, '#reservation')}
              className={`transition-colors duration-150 relative py-1 ${
                activeSection === 'reservation' && currentView !== 'cart'
                  ? 'text-white font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Book a Table
              {activeSection === 'reservation' && currentView !== 'cart' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
              )}
            </a>

            {/* "More" Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                id="navbar-more-dropdown-btn"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center space-x-1 py-1 transition-colors duration-150 text-xs font-semibold uppercase tracking-widest cursor-pointer ${
                  isMoreActive || moreDropdownOpen
                    ? 'text-white font-bold'
                    : 'text-white/60 hover:text-white'
                }`}
                aria-expanded={moreDropdownOpen}
                aria-haspopup="true"
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    moreDropdownOpen ? 'rotate-180 text-red-500' : ''
                  }`}
                />
                {isMoreActive && !moreDropdownOpen && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
                )}
              </button>

              {/* Dropdown Popover */}
              {moreDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-xl bg-zinc-900 border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-white/5 mb-1">
                    <span className="text-[10px] uppercase font-bold font-mono tracking-widest text-white/40 block">
                      Explore Burger Lab
                    </span>
                  </div>
                  <div className="space-y-1">
                    {moreNavLinks.map((item) => {
                      const IconComponent = item.icon;
                      const isItemActive = activeSection === item.id;
                      return (
                        <a
                          key={item.id}
                          href={item.href}
                          id={`nav-more-${item.id}`}
                          onClick={(e) => scrollToSection(e, item.href)}
                          className={`flex items-start space-x-3 p-2.5 rounded-lg transition-colors group cursor-pointer ${
                            isItemActive
                              ? 'bg-red-600/10 text-white border border-red-600/30'
                              : 'text-white/70 hover:text-white hover:bg-zinc-800'
                          }`}
                        >
                          <div
                            className={`p-1.5 rounded-md mt-0.5 shrink-0 transition-colors ${
                              isItemActive
                                ? 'bg-red-600 text-white'
                                : 'bg-zinc-800 text-red-500 group-hover:bg-red-600 group-hover:text-white'
                            }`}
                          >
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span
                              className={`block text-xs font-bold uppercase tracking-wider ${
                                isItemActive ? 'text-red-500 font-bold' : 'text-white'
                              }`}
                            >
                              {item.name}
                            </span>
                            <span className="block text-[10px] text-white/40 font-normal leading-tight mt-0.5">
                              {item.desc}
                            </span>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Cart Button (Desktop only, hidden on tablet) */}
            <button
              type="button"
              id="navbar-cta-cart"
              onClick={handleCartClick}
              className={`hidden lg:flex px-3.5 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all items-center space-x-2 cursor-pointer ${
                currentView === 'cart'
                  ? 'bg-zinc-800 text-white border border-red-600 shadow-md'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-white/90 hover:text-white border border-white/10'
              }`}
            >
              <div className="relative">
                <ShoppingCart className="w-3.5 h-3.5 text-red-500" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 px-1 min-w-[15px] h-[15px] text-[9px] font-black rounded-full bg-red-600 text-white flex items-center justify-center font-mono">
                    {totalItemCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </button>

            <button
              type="button"
              id="navbar-cta-online-order"
              onClick={handleOnlineOrderClick}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold uppercase tracking-wider rounded transition-all shadow-md shadow-red-950/40 flex items-center space-x-1.5 group cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-white/90 group-hover:scale-110 transition-transform" />
              <span>Online Order</span>
            </button>
            <a
              href="#reservation"
              id="navbar-cta-reservation"
              onClick={(e) => scrollToSection(e, '#reservation')}
              className="px-4 py-2 border border-red-600/80 text-red-500 hover:text-white hover:bg-red-600 text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book a table</span>
            </a>
          </div>

          {/* Mobile & Tablet Header Controls */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              type="button"
              onClick={handleOnlineOrderClick}
              className="px-2.5 py-1.5 text-white bg-red-600 rounded text-xs font-bold uppercase tracking-wider flex items-center space-x-1 sm:hidden cursor-pointer"
              aria-label="Online Order"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order</span>
            </button>

            {/* Mobile & Tablet Cart Logo Button (at the left side of the menu / 3-dot toggle) */}
            <button
              type="button"
              id="navbar-mobile-cart-btn"
              onClick={handleCartClick}
              className={`relative p-2 rounded-lg border text-white transition-all flex items-center justify-center cursor-pointer ${
                currentView === 'cart'
                  ? 'bg-zinc-800 border-red-600 shadow-md text-red-500'
                  : 'bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 border-white/10 text-white/90 hover:text-white'
              }`}
              aria-label="Shopping Cart"
              title="View Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4 text-red-500" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 px-1 min-w-[16px] h-[16px] text-[9px] font-black rounded-full bg-red-600 text-white flex items-center justify-center font-mono shadow">
                  {totalItemCount}
                </span>
              )}
            </button>

            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-white/70 hover:text-white hover:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-600 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          {/* Main Links */}
          <div className="grid grid-cols-1 gap-1 text-xs font-semibold uppercase tracking-widest">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className={`block px-3 py-2.5 rounded transition-colors ${
                activeSection === 'home' && currentView !== 'cart'
                  ? 'text-white bg-zinc-900 font-bold border-l-2 border-red-600'
                  : 'text-white/60 hover:text-white hover:bg-zinc-900'
              }`}
            >
              Home
            </a>
            <a
              href="#menu"
              onClick={(e) => scrollToSection(e, '#menu')}
              className={`block px-3 py-2.5 rounded transition-colors ${
                activeSection === 'menu' && currentView !== 'cart'
                  ? 'text-white bg-zinc-900 font-bold border-l-2 border-red-600'
                  : 'text-white/60 hover:text-white hover:bg-zinc-900'
              }`}
            >
              Menu
            </a>
            <button
              type="button"
              onClick={handleCartClick}
              className={`w-full text-left px-3 py-2.5 rounded transition-colors flex items-center justify-between font-semibold uppercase tracking-widest cursor-pointer ${
                currentView === 'cart'
                  ? 'text-white bg-zinc-900 font-bold border-l-2 border-red-600'
                  : 'text-white/60 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-3.5 h-3.5 text-red-500" />
                <span>Shopping Cart</span>
              </div>
              {totalItemCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-red-600 text-white font-mono">
                  {totalItemCount} Items
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={handleOnlineOrderClick}
              className="w-full text-left px-3 py-2.5 rounded transition-colors text-white/60 hover:text-white hover:bg-zinc-900 font-semibold uppercase tracking-widest cursor-pointer"
            >
              Online Order
            </button>
            <a
              href="#reservation"
              onClick={(e) => scrollToSection(e, '#reservation')}
              className={`block px-3 py-2.5 rounded transition-colors ${
                activeSection === 'reservation' && currentView !== 'cart'
                  ? 'text-white bg-zinc-900 font-bold border-l-2 border-red-600'
                  : 'text-white/60 hover:text-white hover:bg-zinc-900'
              }`}
            >
              Book a Table
            </a>
          </div>

          {/* More Links Group on Mobile */}
          <div className="pt-2 border-t border-white/5">
            <span className="px-3 py-1 text-[10px] uppercase font-bold font-mono tracking-widest text-white/40 block mb-1">
              More Information
            </span>
            <div className="grid grid-cols-1 gap-1 text-xs font-semibold uppercase tracking-widest">
              {moreNavLinks.map((item) => {
                const isItemActive = activeSection === item.id;
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`flex items-center space-x-2 px-3 py-2.5 rounded transition-colors ${
                      isItemActive
                        ? 'text-white bg-zinc-900 font-bold border-l-2 border-red-600'
                        : 'text-white/60 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5 text-red-500" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={handleOnlineOrderClick}
              className="w-full text-center py-2.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 shadow-md shadow-red-950/40 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Online Order (Dhaka)</span>
            </button>
            <a
              href="#reservation"
              onClick={(e) => scrollToSection(e, '#reservation')}
              className="w-full text-center py-2.5 rounded border border-red-600 text-red-500 hover:text-white hover:bg-red-600 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book a table</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

