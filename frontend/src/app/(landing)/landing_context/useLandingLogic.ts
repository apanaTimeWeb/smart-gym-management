import { useState, useEffect, useCallback } from 'react';
import type { LandingContextType, BmiResult } from '@/app/(landing)/landing_types/landing_types';
import { EMPTY_BOOKING_FORM, EMPTY_CONTACT_FORM } from '@/app/(landing)/landing_utils/LandingSharedConstants';

export function useLandingLogic(): LandingContextType {
 // Navbar state
 const [menuOpen, setMenuOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);
 
 // BMI Calculator State
 const [weight, setWeight] = useState('');
 const [height, setHeight] = useState('');
 const [bmiResult, setBmiResult] = useState<BmiResult | null>(null);

 // Booking Form State
 const [isBooking, setIsBooking] = useState(false);
 const [bookingSuccess, setBookingSuccess] = useState(false);
 const [bookingData, setBookingData] = useState(EMPTY_BOOKING_FORM);

 // Contact Form State
 const [isSending, setIsSending] = useState(false);
 const [contactSuccess, setContactSuccess] = useState(false);
 const [contactData, setContactData] = useState(EMPTY_CONTACT_FORM);

 // Scroll effect
 useEffect(() => {
 const handler = () => setScrolled(window.scrollY > 50);
 window.addEventListener('scroll', handler);
 return () => window.removeEventListener('scroll', handler);
 }, []);

 // BMI Logic
 const calculateBMI = useCallback((e: React.FormEvent) => {
 e.preventDefault();
 if (!weight || !height) return;
 const h = parseFloat(height) / 100;
 const w = parseFloat(weight);
 const bmi = w / (h * h);
 let status = '';
 let color = '';
 if (bmi < 18.5) { status = 'Underweight'; color = 'var(--info)'; }
 else if (bmi >= 18.5 && bmi < 24.9) { status = 'Normal Weight'; color = 'var(--success)'; }
 else if (bmi >= 25 && bmi < 29.9) { status = 'Overweight'; color = 'var(--warning)'; }
 else { status = 'Obese'; color = 'var(--danger)'; }
 setBmiResult({ value: bmi.toFixed(1), status, color });
 }, [weight, height]);

 // Booking Logic
 const handleBooking = useCallback((e: React.FormEvent) => {
 e.preventDefault();
 if (!bookingData.name || !bookingData.phone || !bookingData.date) return;
 setIsBooking(true);
 setTimeout(() => {
 setIsBooking(false);
 setBookingSuccess(true);
 setBookingData(EMPTY_BOOKING_FORM);
 setTimeout(() => setBookingSuccess(false), 5000);
 }, 1500);
 }, [bookingData]);

 // Contact Logic
 const handleContact = useCallback((e: React.FormEvent) => {
 e.preventDefault();
 if (!contactData.name || !contactData.email || !contactData.message) return;
 setIsSending(true);
 setTimeout(() => {
 setIsSending(false);
 setContactSuccess(true);
 setContactData(EMPTY_CONTACT_FORM);
 setTimeout(() => setContactSuccess(false), 5000);
 }, 1500);
 }, [contactData]);

 return {
 menuOpen, setMenuOpen, scrolled,
 weight, setWeight, height, setHeight, bmiResult, calculateBMI,
 isBooking, bookingSuccess, bookingData, setBookingData, handleBooking,
 isSending, contactSuccess, contactData, setContactData, handleContact
 };
}
