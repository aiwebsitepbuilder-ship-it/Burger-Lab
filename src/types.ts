export interface CartItem {
  id: string; // unique ID including variant (e.g. "cb-2" or "blc-1-beef")
  menuItemId: string;
  name: string;
  category: string;
  variantLabel?: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

export interface DeliveryAddressData {
  areaId: string;
  areaName: string;
  city: string;
  address: string;
  postcode?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price?: number;
  prices?: {
    label: string;
    price: number;
  }[];
  isSpicy?: boolean;
  isPopular?: boolean;
  isSpecialty?: boolean;
  badge?: string;
}

export interface MenuUpgrade {
  name: string;
  price: number;
}

export interface DetailedMenuCategory {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  description: string;
  badge?: string;
  items: MenuItem[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  badge?: string;
  image: string;
  highlights: string[];
}

export interface Branch {
  id: string;
  name: string;
  area: string;
  address: string;
  contactNumber: string;
  displayPhone: string;
  mapUrl: string;
  googleQuery: string;
  landmark: string;
  image: string;
}

export interface OpeningHourSchedule {
  dayGroup: string;
  days: string[];
  serviceHours: string;
  breakPeriod?: string;
  notes?: string;
  isSpecial?: boolean;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  preferredBranch?: string;
  message: string;
}

export interface ReservationFormData {
  name: string;
  phone: string;
  email: string;
  branchId: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingPreference: string;
  occasion: string;
  specialRequests?: string;
}

export interface ConfirmedReservation extends ReservationFormData {
  bookingId: string;
  createdAt: string;
  branchName: string;
  branchAddress: string;
  branchPhone: string;
}

export interface FeatureHighlight {
  id: string;
  title: string;
  description: string;
  iconName: string;
  stat?: string;
}
