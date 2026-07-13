// RESPONSIBILITY: landing_types.ts handles the logic and UI for its corresponding feature.
import React from 'react';
import { EMPTY_BOOKING_FORM, EMPTY_CONTACT_FORM } from '@/app/landing/landing_utils/LandingSharedConstants';

export interface BmiResult {
 value: string;
 status: string;
 color: string;
}

export interface LandingContextType {
 // Navbar state
 menuOpen: boolean;
 setMenuOpen: (open: boolean) => void;
 scrolled: boolean;
 
 // BMI state
 weight: string;
 setWeight: (w: string) => void;
 height: string;
 setHeight: (h: string) => void;
 bmiResult: BmiResult | null;
 calculateBMI: (e: React.FormEvent) => void;

 // Booking state
 isBooking: boolean;
 bookingSuccess: boolean;
 bookingData: typeof EMPTY_BOOKING_FORM;
 setBookingData: React.Dispatch<React.SetStateAction<typeof EMPTY_BOOKING_FORM>>;
 handleBooking: (e: React.FormEvent) => void;

 // Contact state
 isSending: boolean;
 contactSuccess: boolean;
 contactData: typeof EMPTY_CONTACT_FORM;
 setContactData: React.Dispatch<React.SetStateAction<typeof EMPTY_CONTACT_FORM>>;
 handleContact: (e: React.FormEvent) => void;
}

