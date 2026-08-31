import React, { useState, useMemo } from 'react';
import { 
  Utensils, 
  Flame, 
  ShoppingBag, 
  ShoppingCart,
  CalendarCheck, 
  SlidersHorizontal, 
  ShieldCheck,
  Plus,
  Check
} from 'lucide-react';
import { Branch, DetailedMenuCategory } from '../types';
import { 
  OFFICIAL_MENU_CATEGORIES, 
  BURGER_UPGRADES, 
  ASIAN_EXTRAS 
} from '../data/officialMenuData';
import { useCart } from '../context/CartContext';

interface MenuCategoriesSectionProps {
  onSelectBranch?: (branch: Branch) => void;
  onOpenOnlineOrder?: () => void;
}

export const MenuCategoriesSection: React.FC<MenuCategoriesSectionProps> = ({ 
  onSelectBranch,
  onOpenOnlineOrder 
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [addedItemKey, setAddedItemKey] = useState<string | null>(null);

  const { addToCart, navigateToCart } = useCart();

  const handleAddItem = (
    item: {
      id: string;
      name: string;
      category: string;
      description: string;
    },
    price: number,
    variantLabel?: string
  ) => {
    addToCart(
      {
        menuItemId: item.id,
        name: item.name,
        category: item.category,
        price: price,
        variantLabel: variantLabel,
        description: item.description,
      },
      1
    );

    const key = `${item.id}-${variantLabel || 'std'}`;
    setAddedItemKey(key);
    setTimeout(() => {
      setAddedItemKey((prev) => (prev === key ? null : prev));
    }, 1500);
  };

  // Compute all items or filtered items
  const allCategories = OFFICIAL_MENU_CATEGORIES;

  const filteredCategories = useMemo(() => {
    if (activeCategoryId === 'all') {
      return allCategories;
    }
    return allCategories.filter((category) => category.id === activeCategoryId);
  }, [allCategories, activeCategoryId]);

  return (
    <section id="menu" className="py-20 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-red-600/20 border border-red-600/40 text-red-500 text-xs font-bold uppercase tracking-widest mb-3">
            <Utensils className="w-3.5 h-3.5 text-red-500" />
            <span>Official Restaurant Menu</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter font-['Outfit']">
            Explore <span className="text-red-600">Burger Lab</span> Menu
          </h2>
          <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed">
            Consistently crafted chicken & beef burgers, loaded fries, sides, Thai rice bowls, platters, and soups across all 4 Dhaka branches.
          </p>
        </div>

        {/* Category Filter Chips / Tabs */}
        <div className="flex items-center justify-start sm:justify-center flex-wrap gap-2 mb-10 overflow-x-auto pb-2 sm:pb-0">
          <button
            type="button"
            onClick={() => setActiveCategoryId('all')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 ${
              activeCategoryId === 'all'
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/60 font-black'
                : 'bg-zinc-900 text-white/70 hover:text-white hover:bg-zinc-800 border border-white/10'
            }`}
          >
            All Menu Items ({allCategories.reduce((sum, c) => sum + c.items.length, 0)})
          </button>
          
          {allCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center space-x-2 cursor-pointer shrink-0 ${
                activeCategoryId === cat.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950/60 font-black'
                  : 'bg-zinc-900 text-white/70 hover:text-white hover:bg-zinc-800 border border-white/10'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({cat.items.length})</span>
            </button>
          ))}
        </div>

        {/* Categorized Menu Layout */}
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <div key={category.id} id={`category-section-${category.id}`} className="space-y-5">
              
              {/* Category Sub-Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-4 gap-2">
                <div>
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl" aria-hidden="true">{category.icon}</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-['Outfit']">
                      {category.name}
                    </h3>
                    {category.badge && (
                      <span className="px-2.5 py-0.5 rounded bg-red-600/20 border border-red-600/40 text-red-400 text-[10px] font-bold uppercase tracking-wider">
                        {category.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-white/60 text-xs sm:text-sm mt-1">
                    {category.description}
                  </p>
                </div>
                <span className="text-xs font-mono text-white/40">
                  {category.items.length} items available
                </span>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {category.items.map((item) => {
                  return (
                    <div
                      key={item.id}
                      id={`menu-item-${item.id}`}
                      className="group bg-zinc-900/90 hover:bg-zinc-900 border border-white/10 hover:border-red-600/60 rounded-xl p-5 transition-all duration-200 flex flex-col justify-between shadow-lg relative overflow-hidden"
                    >
                      {/* Top Badges */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-base font-bold text-white uppercase tracking-tight font-['Outfit'] group-hover:text-red-500 transition-colors">
                              {item.name}
                            </h4>
                            {item.isSpicy && (
                              <span title="Spicy" className="text-red-500 inline-block">
                                <Flame className="w-3.5 h-3.5 fill-red-500" />
                              </span>
                            )}
                          </div>
                        </div>

                        {item.badge && (
                          <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider shrink-0 shadow-sm">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                        {item.description}
                      </p>

                      {/* Pricing & Footer Actions */}
                      <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2.5">
                        {/* Price rendering & quick add */}
                        <div>
                          {item.price !== undefined ? (
                            <div className="flex items-baseline space-x-1">
                              <span className="text-lg font-black text-red-500 font-['Outfit']">
                                {item.price}
                              </span>
                              <span className="text-xs font-bold text-white/50 uppercase">৳</span>
                            </div>
                          ) : item.prices && item.prices.length > 0 ? (
                            <div className="flex flex-wrap items-center gap-1.5">
                              {item.prices.map((p, idx) => {
                                const isAdded = addedItemKey === `${item.id}-${p.label}`;
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleAddItem(item, p.price, p.label)}
                                    className={`px-2 py-1 rounded border text-[11px] font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                                      isAdded
                                        ? 'bg-emerald-600 border-emerald-500 text-white'
                                        : 'bg-zinc-800 hover:bg-zinc-700 active:bg-red-600 active:text-white border-white/10 text-white'
                                    }`}
                                    title={`Add ${p.label} (${p.price}৳) to cart`}
                                  >
                                    <span className={isAdded ? 'text-white' : 'text-white/60'}>{p.label}:</span>
                                    <span className={isAdded ? 'text-white font-black' : 'text-red-400 font-black'}>{p.price}৳</span>
                                    {isAdded ? (
                                      <Check className="w-3 h-3 text-white ml-0.5" />
                                    ) : (
                                      <Plus className="w-3 h-3 text-white/40 ml-0.5" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>

                        {/* Order / Add to Cart Action */}
                        <div className="flex items-center space-x-1.5 ml-auto">
                          {item.price !== undefined && (
                            <button
                              type="button"
                              onClick={() => handleAddItem(item, item.price!)}
                              className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer ${
                                addedItemKey === `${item.id}-std`
                                  ? 'bg-emerald-600 text-white shadow-md'
                                  : 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm shadow-red-950/40'
                              }`}
                              title="Add item to shopping cart"
                            >
                              {addedItemKey === `${item.id}-std` ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Added</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Add</span>
                                </>
                              )}
                            </button>
                          )}
                          {onOpenOnlineOrder && (
                            <button
                              type="button"
                              onClick={onOpenOnlineOrder}
                              className="px-2.5 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white/70 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-1 cursor-pointer border border-white/5"
                              title="View full ordering options"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span className="hidden sm:inline">Options</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* Upgrades, Add-Ons & Customization Details (From the Official Menu) */}
        <div className="mt-16 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-red-600/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-5 mb-6 gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest mb-2 font-mono">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Menu Customizations & Add-Ons</span>
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight font-['Outfit']">
                Burger Upgrades & Extras
              </h3>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-zinc-800/80 border border-white/10 text-white/60 text-xs font-mono">
              * 5% will be added as per menu standard
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 1. Burger Upgrades (9 items) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 font-mono flex items-center space-x-1.5">
                <span>Burger Upgrades & Toppings</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {BURGER_UPGRADES.map((upgrade, idx) => (
                  <div 
                    key={idx} 
                    className="p-2.5 rounded-lg bg-zinc-950/60 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <span className="text-white/80 font-medium">{upgrade.name}</span>
                    <span className="text-red-500 font-black font-['Outfit'] text-sm">+{upgrade.price}৳</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Sauce & Spice Levels + Asian Extras */}
            <div className="space-y-4">
              {/* Asian Extras */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 font-mono mb-2">
                  Rice & Meal Extras
                </h4>
                <div className="space-y-2">
                  {ASIAN_EXTRAS.map((extra, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-zinc-950/60 border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-white/80 font-medium">{extra.name}</span>
                      <span className="text-red-500 font-black font-['Outfit'] text-sm">+{extra.price}৳</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sauce & Spice Options */}
              <div className="p-3 rounded-lg bg-zinc-950/40 border border-white/5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-white/50 font-mono uppercase text-[10px]">Sauce Level:</span>
                  <span className="text-white/80 font-semibold">Less • Regular • Extra</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50 font-mono uppercase text-[10px]">Spice Level:</span>
                  <span className="text-white/80 font-semibold">Regular • Spicy</span>
                </div>
              </div>

            </div>

          </div>

          {/* Quick CTA Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-white/70 text-xs">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>Dine-In, Takeaway, and Home Delivery available at Mirpur, Bashundhara, Dhanmondi, & Uttara.</span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <a
                href="#reservation"
                className="flex-1 sm:flex-none text-center px-4 py-2.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Book a Table</span>
              </a>
              {onOpenOnlineOrder && (
                <button
                  type="button"
                  onClick={onOpenOnlineOrder}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-red-950/80 flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Now</span>
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
