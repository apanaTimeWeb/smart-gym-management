// RESPONSIBILITY: LandingBooking.tsx handles the logic and UI for its corresponding feature.
"use client";

import { CheckCircle, Ticket, CreditCard, Calendar, ArrowRight } from 'lucide-react';
import { useLandingContext } from '@/app/landing/landing_context/LandingContext';

export default function LandingBooking() {
 const { bookingSuccess, isBooking, bookingData, setBookingData, handleBooking } = useLandingContext();

 return (
 <section id="booking" className="py-24 px-4 bg-gradient-to-br from-background to-[#1a1a1a]">
 <div className="max-w-4xl mx-auto relative">
 <div className="text-center mb-16">
 <div className="inline-block text-xs font-bold tracking-widest uppercase text-warning bg-warning/10 border border-warning/20 rounded-full px-4 py-2 mb-5">
 Quick Action
 </div>
 <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
 Online <span style={{ background: 'var(--landing-text-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Booking</span>
 </h2>
 <p className="text-secondary max-w-xl mx-auto">
 Book your trial, buy membership, or reserve a slot online in seconds.
 </p>
 </div>
 
 <div className="bg-black border border-border rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
 {bookingSuccess ? (
 <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
 <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mb-6">
 <CheckCircle className="text-success" size={40} />
 </div>
 <h3 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h3>
 <p className="text-secondary">
 Thank you for choosing GymSmart. Our team will contact you shortly to confirm the details.
 </p>
 </div>
 ) : (
 <form className="space-y-6" onSubmit={handleBooking}>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
 <label className="cursor-pointer">
 <input type="radio" name="booking_type" value="trial" checked={bookingData.type === 'trial'} onChange={e => setBookingData({...bookingData, type: e.target.value})} className="peer sr-only" />
 <div className="bg-card border border-border rounded-xl p-4 text-center peer-checked:border-warning peer-checked:bg-warning/10 transition-all">
 <Ticket className="mx-auto mb-2 text-warning" size={24} />
 <span className="font-semibold text-white">Book Trial</span>
 </div>
 </label>
 <label className="cursor-pointer">
 <input type="radio" name="booking_type" value="membership" checked={bookingData.type === 'membership'} onChange={e => setBookingData({...bookingData, type: e.target.value})} className="peer sr-only" />
 <div className="bg-card border border-border rounded-xl p-4 text-center peer-checked:border-warning peer-checked:bg-warning/10 transition-all">
 <CreditCard className="mx-auto mb-2 text-warning" size={24} />
 <span className="font-semibold text-white">Buy Membership</span>
 </div>
 </label>
 <label className="cursor-pointer">
 <input type="radio" name="booking_type" value="class" checked={bookingData.type === 'class'} onChange={e => setBookingData({...bookingData, type: e.target.value})} className="peer sr-only" />
 <div className="bg-card border border-border rounded-xl p-4 text-center peer-checked:border-warning peer-checked:bg-warning/10 transition-all">
 <Calendar className="mx-auto mb-2 text-warning" size={24} />
 <span className="font-semibold text-white">Reserve Class Slot</span>
 </div>
 </label>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div>
 <label className="text-xs font-medium text-secondary block mb-2">Full Name <span className="text-destructive">*</span></label>
 <input 
 type="text" 
 required 
 value={bookingData.name} 
 onChange={e => setBookingData({...bookingData, name: e.target.value})} 
 placeholder="John Doe" 
 className="w-full bg-card border border-border rounded-xl px-4 py-3 text-white placeholder-muted-foreground focus:outline-none focus:border-warning transition-colors" 
 />
 </div>
 <div>
 <label className="text-xs font-medium text-secondary block mb-2">Phone / WhatsApp <span className="text-destructive">*</span></label>
 <input 
 type="tel" 
 required 
 value={bookingData.phone} 
 onChange={e => setBookingData({...bookingData, phone: e.target.value})} 
 placeholder="+91 XXXXX XXXXX" 
 className="w-full bg-card border border-border rounded-xl px-4 py-3 text-white placeholder-muted-foreground focus:outline-none focus:border-warning transition-colors" 
 />
 </div>
 </div>

 <div>
 <label className="text-xs font-medium text-secondary block mb-2">Preferred Date <span className="text-destructive">*</span></label>
 <input 
 type="date" 
 required 
 value={bookingData.date} 
 onChange={e => setBookingData({...bookingData, date: e.target.value})} 
 className="w-full bg-card border border-border rounded-xl px-4 py-3 text-white placeholder-muted-foreground focus:outline-none focus:border-warning transition-colors [&::-webkit-calendar-picker-indicator]:filter-invert" 
 />
 </div>

 <button 
 type="submit" 
 disabled={isBooking} 
 className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-[1.02] hover:shadow-2xl mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100" 
 style={{ background: 'var(--landing-highlight-gradient)' }}
 >
 {isBooking ? 'Processing...' : (
 <>Proceed to Book <ArrowRight size={18} /></>
 )}
 </button>
 </form>
 )}
 </div>
 </div>
 </section>
 );
}

