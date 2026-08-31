export interface DeliveryArea {
  id: string;
  name: string;
  charge: number; // in BDT (৳)
  estimatedTime: string;
  zone: string;
}

export const DELIVERY_AREAS: DeliveryArea[] = [
  {
    id: 'mirpur',
    name: 'Mirpur (All Sections 1-14)',
    charge: 50,
    estimatedTime: '25-35 mins',
    zone: 'Zone 1 - Near Branch',
  },
  {
    id: 'bashundhara',
    name: 'Bashundhara R/A & Kuril',
    charge: 50,
    estimatedTime: '25-35 mins',
    zone: 'Zone 1 - Near Branch',
  },
  {
    id: 'dhanmondi',
    name: 'Dhanmondi, Kalabagan & Shankar',
    charge: 50,
    estimatedTime: '25-35 mins',
    zone: 'Zone 1 - Near Branch',
  },
  {
    id: 'uttara',
    name: 'Uttara (All Sectors 1-18)',
    charge: 50,
    estimatedTime: '25-35 mins',
    zone: 'Zone 1 - Near Branch',
  },
  {
    id: 'gulshan-banani',
    name: 'Gulshan 1-2 & Banani',
    charge: 70,
    estimatedTime: '35-45 mins',
    zone: 'Zone 2 - Express Delivery',
  },
  {
    id: 'mohammadpur',
    name: 'Mohammadpur & Lalmatia',
    charge: 60,
    estimatedTime: '30-40 mins',
    zone: 'Zone 2 - Express Delivery',
  },
  {
    id: 'mohakhali-niketan',
    name: 'Mohakhali & Niketan',
    charge: 60,
    estimatedTime: '30-40 mins',
    zone: 'Zone 2 - Express Delivery',
  },
  {
    id: 'khilgaon-malibagh',
    name: 'Khilgaon, Malibagh & Shantinagar',
    charge: 70,
    estimatedTime: '35-45 mins',
    zone: 'Zone 2 - Express Delivery',
  },
  {
    id: 'badda-rampura',
    name: 'Badda, Rampura & Aftabnagar',
    charge: 70,
    estimatedTime: '35-45 mins',
    zone: 'Zone 2 - Express Delivery',
  },
  {
    id: 'old-dhaka',
    name: 'Old Dhaka & Lalbagh',
    charge: 90,
    estimatedTime: '45-55 mins',
    zone: 'Zone 3 - Standard Delivery',
  },
  {
    id: 'kallyanpur-shyamoli',
    name: 'Kallyanpur & Shyamoli',
    charge: 55,
    estimatedTime: '25-35 mins',
    zone: 'Zone 1 - Near Branch',
  },
  {
    id: 'baridhara-dohs',
    name: 'Baridhara & DOHS Areas',
    charge: 70,
    estimatedTime: '35-45 mins',
    zone: 'Zone 2 - Express Delivery',
  },
];
