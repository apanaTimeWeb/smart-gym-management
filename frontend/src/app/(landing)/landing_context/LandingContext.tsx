"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { EMPTY_BOOKING_FORM, EMPTY_CONTACT_FORM } from '../landing_utils/LandingSharedConstants';

interface BmiResult {
  value: string;
  status: string;
  color: string;
}

interface LandingContextType {
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

const LandingContext = createContext<LandingContextType | undefined>(undefined);

export function LandingProvider({ children }: { children: React.ReactNode }) {
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
    if (bmi < 18.5) { status = 'Underweight'; color = 'text-blue-400'; }
    else if (bmi >= 18.5 && bmi < 24.9) { status = 'Normal Weight'; color = 'text-green-400'; }
    else if (bmi >= 25 && bmi < 29.9) { status = 'Overweight'; color = 'text-yellow-400'; }
    else { status = 'Obese'; color = 'text-red-400'; }
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

  const value = useMemo(() => ({
    menuOpen, setMenuOpen, scrolled,
    weight, setWeight, height, setHeight, bmiResult, calculateBMI,
    isBooking, bookingSuccess, bookingData, setBookingData, handleBooking,
    isSending, contactSuccess, contactData, setContactData, handleContact
  }), [
    menuOpen, scrolled,
    weight, height, bmiResult, calculateBMI,
    isBooking, bookingSuccess, bookingData, handleBooking,
    isSending, contactSuccess, contactData, handleContact
  ]);

  return (
    <LandingContext.Provider value={value}>
      {children}
    </LandingContext.Provider>
  );
}

export function useLandingContext() {
  const context = useContext(LandingContext);
  if (context === undefined) {
    throw new Error('useLandingContext must be used within a LandingProvider');
  }
  return context;
}
