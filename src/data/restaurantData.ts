import { Category, Branch, OpeningHourSchedule, FeatureHighlight } from '../types';

export const RESTAURANT_INFO = {
  name: 'Burger Lab',
  tagline: 'Burgers Made with Consistency in Every Bite',
  subHeadline: 'Dhaka’s premier casual dining destination dedicated to crafting consistently high-quality burgers, loaded fries, sides, rice bowls, soups, and drinks at affordable to moderate prices.',
  brandColor: '#dc2626', // Vibrant Red
  brandValue: 'Consistency in Quality',
  pricing: 'Affordable to Moderate',
  email: 'burgerlabbd@gmail.com',
  facebookUrl: 'https://www.facebook.com/Burgerlabbd',
  facebookHandle: '@Burgerlabbd',
  totalBranches: 4,
  city: 'Dhaka, Bangladesh',
};

export const MENU_CATEGORIES: Category[] = [
  {
    id: 'burgers',
    name: 'Burgers',
    icon: '🍔',
    tagline: 'The Signature Main Attraction',
    description: 'The centerpiece of Burger Lab. Crafted with unwavering commitment to consistency, freshness, and bold flavor profiles in every single bite.',
    badge: 'Main Specialty',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop',
    highlights: [
      'Freshly prepared buns & juicy patties',
      'Consistent culinary standards across all branches',
      'Balanced savory seasonings & house sauces',
      'Our signature crowd favorite'
    ]
  },
  {
    id: 'loaded-fries',
    name: 'Loaded Fries',
    icon: '🍟',
    tagline: 'Flavor-Packed Crispy Indulgence',
    description: 'Golden crispy fries generously layered with savory toppings, melted cheese blends, and tantalizing sauces crafted for sharing.',
    badge: 'Popular Favorite',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1000&auto=format&fit=crop',
    highlights: [
      'Crispy golden potato fries',
      'Rich melted cheese & savory drizzles',
      'Generous layered portion sizes',
      'Perfect accompaniment to our burgers'
    ]
  },
  {
    id: 'sides',
    name: 'Sides',
    icon: '🍗',
    tagline: 'Crisp, Savory & Satisfying',
    description: 'A mouthwatering variety of crunchy and flavorful side dishes thoughtfully prepared to complement your main meal.',
    badge: 'Must Try',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1000&auto=format&fit=crop',
    highlights: [
      'Golden crispy textures',
      'Flavorful dips and seasoned breading',
      'Ideal for sharing with friends and family',
      'Always served hot and fresh'
    ]
  },
  {
    id: 'rice-bowls',
    name: 'Rice Bowls',
    icon: '🍚',
    tagline: 'Hearty, Warm & Fulfilling',
    description: 'Convenient, balanced, and deeply satisfying rice bowls packed with seasoned proteins and delicious flavor combinations.',
    badge: 'Comfort Dining',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop',
    highlights: [
      'Steaming fragrant seasoned rice base',
      'Satisfying and wholesome meal option',
      'Balanced proteins and savory pan glazes',
      'Quick and hearty lunch or dinner'
    ]
  },
  {
    id: 'soup',
    name: 'Soup',
    icon: '🍲',
    tagline: 'Warm, Rich & Comforting',
    description: 'Warm and comforting bowls of flavorful soup, prepared with aromatic broths to soothe your palate before or alongside your burger.',
    badge: 'Warm & Fresh',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop',
    highlights: [
      'Simmered aromatic broths',
      'Rich, velvety consistency',
      'Great starter for every season',
      'Comforting and soothing flavors'
    ]
  },
  {
    id: 'drinks',
    name: 'Drinks',
    icon: '🥤',
    tagline: 'Chilled & Thirst-Quenching',
    description: 'A vibrant selection of chilled, refreshing beverages curated to balance savory burger spices and keep you energized.',
    badge: 'Refreshing',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1000&auto=format&fit=crop',
    highlights: [
      'Ice-cold carbonated & specialty refreshers',
      'Crisp citrus and sweet notes',
      'The ultimate thirst quencher with loaded meals',
      'Served refreshingly chilled'
    ]
  }
];

export const BRANCHES: Branch[] = [
  {
    id: 'mirpur',
    name: 'Mirpur Branch',
    area: 'Mirpur-01,2',
    address: 'Mirpur-01,2, 2 Zoo Road, Dhaka 1216',
    contactNumber: '01815008065',
    displayPhone: '01815-008065',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Burger+Lab+Mirpur+Zoo+Road+Dhaka',
    googleQuery: 'Burger Lab, Zoo Road, Mirpur, Dhaka',
    landmark: 'Near Zoo Road intersection, Mirpur-1/2',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'bashundhara',
    name: 'Bashundhara Branch',
    area: 'Bashundhara R/A Gate',
    address: 'Ka-11, 2 Bashundhara Rd, Dhaka 1229',
    contactNumber: '01704040370',
    displayPhone: '01704-040370',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Burger+Lab+Bashundhara+Road+Dhaka',
    googleQuery: 'Burger Lab, Bashundhara Road, Dhaka',
    landmark: 'Bashundhara Main Gate Road, Ka-11',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dhanmondi',
    name: 'Dhanmondi Branch',
    area: 'Satmasjid Road',
    address: 'House 81, Green Taj Center, Satmasjid Road, Dhanmondi, Dhaka 1209',
    contactNumber: '01719038591',
    displayPhone: '01719-038591',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Green+Taj+Center+Satmasjid+Road+Dhanmondi+Burger+Lab',
    googleQuery: 'Green Taj Center, Satmasjid Road, Dhanmondi, Dhaka',
    landmark: 'Green Taj Center (House 81), Satmasjid Road',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'uttara',
    name: 'Uttara Branch',
    area: 'Gareeb-e-Nawaz Ave',
    address: 'House-16, Gareeb-e-Nawaz Ave, Uttara, Dhaka 1230',
    contactNumber: '01782570989',
    displayPhone: '01782-570989',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Burger+Lab+Gareeb-e-Nawaz+Avenue+Uttara+Dhaka',
    googleQuery: 'House-16 Gareeb-e-Nawaz Ave, Sector 11/13, Uttara, Dhaka',
    landmark: 'Gareeb-e-Nawaz Avenue, Sector Hub',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop'
  }
];

export const SCHEDULE_DETAILS: OpeningHourSchedule[] = [
  {
    dayGroup: 'Sunday to Thursday',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    serviceHours: '11:30 AM – 11:00 PM',
    notes: 'Continuous full-menu kitchen service all day long.'
  },
  {
    dayGroup: 'Friday',
    days: ['Friday'],
    serviceHours: '11:30 AM – 11:00 PM',
    breakPeriod: '3:00 AM – 11:00 AM',
    notes: 'Morning maintenance & rest break (3:00 AM – 11:00 AM). Service commences fresh from 11:30 AM until 11:00 PM.',
    isSpecial: true
  },
  {
    dayGroup: 'Saturday',
    days: ['Saturday'],
    serviceHours: '11:30 AM – 11:00 PM',
    notes: 'Weekend dining open throughout the day until late night.'
  }
];

export const WHY_CHOOSE_ITEMS: FeatureHighlight[] = [
  {
    id: 'consistency',
    title: 'Consistency in Quality',
    description: 'Our core brand value. Every burger patty, bun, sauce, and fry is prepared adhering to strict standards so your favorite tastes identical across all visits.',
    iconName: 'ShieldCheck',
    stat: '100% Quality Focus'
  },
  {
    id: 'burger-specialty',
    title: 'Burger-Focused Experience',
    description: 'Burgers are our main specialty and passion. We obsess over the perfect ratio of succulent patties, toasted buns, melted cheese, and signature dressings.',
    iconName: 'Flame',
    stat: 'Main Attraction'
  },
  {
    id: 'variety',
    title: 'Variety Beyond Burgers',
    description: 'From crispy loaded fries and savory sides to hearty rice bowls, soothing hot soup, and chilled drinks — there is a satisfying choice for everyone.',
    iconName: 'UtensilsCrossed',
    stat: '6 Food Categories'
  },
  {
    id: 'pricing',
    title: 'Affordable to Moderate Pricing',
    description: 'Exceptional casual dining accessible to students, professionals, and families alike. High culinary standards without premium price friction.',
    iconName: 'BadgePercent',
    stat: 'Honest Value'
  },
  {
    id: 'locations',
    title: 'Multiple Convenient Locations',
    description: 'Strategically located across Dhaka in Mirpur, Bashundhara, Dhanmondi, and Uttara for easy dine-in, takeaway, and neighborhood reach.',
    iconName: 'MapPin',
    stat: '4 Dhaka Branches'
  }
];
