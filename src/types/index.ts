export type Language = 'en' | 'ar';

export type AppView = 'website' | 'admin';

export type AdminTab = 'overview' | 'reservations' | 'calendar' | 'menu' | 'inquiries' | 'settings';

export type MenuCategory = 
  | 'Omani Classics'
  | 'Starters'
  | 'Mains'
  | 'Seafood'
  | 'Grills'
  | 'Desserts'
  | 'Drinks';

export interface MenuItem {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number; // in OMR
  category: MenuCategory;
  isChefsSpecial: boolean;
  isAvailable: boolean;
  image: string;
  dietaryTagsEn?: string[];
  dietaryTagsAr?: string[];
  calories?: number;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Reservation {
  id: string;
  referenceNo: string;
  customerName: string;
  phone: string;
  email: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  guests: number;
  status: ReservationStatus;
  specialRequests?: string;
  seatingArea?: 'main_dining' | 'royal_terrace' | 'private_majlis';
  createdAt: string;
  tableNumber?: string;
}

export type InquiryStatus = 'new' | 'contacted' | 'resolved';

export interface CustomerInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventType: string;
  guests: number;
  preferredDate: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  notes?: string;
}

export interface RestaurantSettings {
  nameEn: string;
  nameAr: string;
  taglineEn: string;
  taglineAr: string;
  phone: string;
  email: string;
  addressEn: string;
  addressAr: string;
  googleMapsUrl: string;
  openingHoursSatThu: string;
  openingHoursFri: string;
  openingHoursSatThuAr: string;
  openingHoursFriAr: string;
  maxGuestsPerReservation: number;
  reservationDurationMinutes: number;
  availableTimeSlots: string[];
  advanceBookingDaysMax: number;
  whatsappNumber: string;
  instagramHandle: string;
  facebookUrl: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}
