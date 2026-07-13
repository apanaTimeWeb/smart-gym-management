// RESPONSIBILITY: LandingContact.tsx handles the logic and UI for its corresponding feature.
"use client";

import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { useLandingContext } from '@/app/(landing)/landing_context/LandingContext';

export default function LandingContact() {
 const { contactSuccess, isSending, contactData, setContactData, handleContact } = useLandingContext();

 return (
 <section id="contact" className="py-24 px-4 bg-background">
 <div className="max-w-7xl mx-auto">
 <div className="text-center mb-16">
 <div className="inline-block text-xs font-bold tracking-widest uppercase text-warning bg-warning/10 border border-warning/20 rounded-full px-4 py-2 mb-5">
 Get in Touch
 </div>
 <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
 Contact <span style={{ background: 'var(--landing-text-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Us</span>
 </h2>
 </div>
 
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
 <div>
 <h3 className="text-2xl font-bold text-white mb-6">We&apos;re here to help you!</h3>
 <p className="text-secondary mb-8">
 Have questions about our memberships, facilities, or personal training? Fill out the form or reach out directly.
 </p>
 
 <div className="space-y-6 mb-8">
 <div className="flex items-start gap-4">
 <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
 <MapPin className="text-warning" />
 </div>
 <div>
 <h4 className="font-bold text-white text-lg">Location</h4>
 <p className="text-secondary">123 Fitness Avenue, Bandra West, Mumbai 400050</p>
 </div>
 </div>
 <div className="flex items-start gap-4">
 <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
 <Phone className="text-warning" />
 </div>
 <div>
 <h4 className="font-bold text-white text-lg">Phone</h4>
 <p className="text-secondary">+91 98765 43210</p>
 </div>
 </div>
 <div className="flex items-start gap-4">
 <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
 <Mail className="text-warning" />
 </div>
 <div>
 <h4 className="font-bold text-white text-lg">Email</h4>
 <p className="text-secondary">hello@gymsmart.com</p>
 </div>
 </div>
 </div>
 
 <div className="rounded-2xl overflow-hidden h-64 relative border border-border">
 <div className="absolute inset-0 bg-white/5 flex items-center justify-center flex-col">
 <MapPin size={40} className="text-warning mb-2 opacity-50" />
 <p className="text-secondary font-medium">Interactive Map Integration</p>
 <p className="text-sm text-muted-foreground">(Google Maps Embed goes here)</p>
 </div>
 </div>
 </div>

 <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
 <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
 
 {contactSuccess ? (
 <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in">
 <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
 <CheckCircle className="text-success" size={32} />
 </div>
 <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
 <p className="text-secondary">We&apos;ll get back to you within 24 hours.</p>
 </div>
 ) : (
 <form className="space-y-4" onSubmit={handleContact}>
 <div>
 <label className="text-xs font-medium text-secondary block mb-2">Name</label>
 <input 
 type="text" 
 required 
 value={contactData.name} 
 onChange={e => setContactData({...contactData, name: e.target.value})} 
 placeholder="Your Name" 
 className="w-full bg-input border border-border rounded-xl px-4 py-3 text-white placeholder-muted-foreground focus:outline-none focus:border-warning transition-colors" 
 />
 </div>
 <div>
 <label className="text-xs font-medium text-secondary block mb-2">Email Address</label>
 <input 
 type="email" 
 required 
 value={contactData.email} 
 onChange={e => setContactData({...contactData, email: e.target.value})} 
 placeholder="you@example.com" 
 className="w-full bg-input border border-border rounded-xl px-4 py-3 text-white placeholder-muted-foreground focus:outline-none focus:border-warning transition-colors" 
 />
 </div>
 <div>
 <label className="text-xs font-medium text-secondary block mb-2">Message</label>
 <textarea 
 required 
 rows={4} 
 value={contactData.message} 
 onChange={e => setContactData({...contactData, message: e.target.value})} 
 placeholder="How can we help you?" 
 className="w-full bg-input border border-border rounded-xl px-4 py-3 text-white placeholder-muted-foreground focus:outline-none focus:border-warning transition-colors resize-none" 
 />
 </div>
 <button 
 type="submit" 
 disabled={isSending} 
 className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:bg-warning mt-2 border border-warning/50 disabled:opacity-70" 
 style={{ background: 'var(--landing-highlight-orange)' }}
 >
 {isSending ? 'Sending...' : 'Send Message'}
 </button>
 </form>
 )}
 </div>
 </div>
 </div>
 </section>
 );
}
