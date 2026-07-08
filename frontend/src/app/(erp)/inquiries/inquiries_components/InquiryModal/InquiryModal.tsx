"use client";

import { useInquiriesContext } from '@/app/(erp)/inquiries/inquiries_context/InquiriesContext';
import { INQUIRY_MODAL_FIELDS, INQUIRIES_STATUS_LABELS, INQUIRY_SOURCES } from '@/app/(erp)/inquiries/inquiries_utils/InquiriesSharedConstants';
import { X, Save } from 'lucide-react';

export default function InquiryModal() {
 const { showModal, setShowModal, editId, form, setForm, saveInquiry, saving } = useInquiriesContext();

 if (!showModal) return null;

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 inquiries-module" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
 <div className="rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--inquiries-bg-card)' }}>
 <div className="sticky top-0 px-6 py-4 border-b flex items-center justify-between" style={{ backgroundColor: 'var(--inquiries-bg-card)', borderColor: 'var(--inquiries-border)' }}>
 <h3 className="text-lg font-bold" style={{ color: 'var(--inquiries-text-primary)' }}>{editId ? 'Edit Inquiry' : 'New Inquiry'}</h3>
 <button 
 onClick={() => setShowModal(false)} 
 className="p-2 rounded-lg transition-colors hover:bg-[var(--primary-subtle)]"
 style={{ color: 'var(--inquiries-text-secondary)' }}
 >
 <X size={18} />
 </button>
 </div>
 <form onSubmit={saveInquiry} className="p-6 space-y-4">
 {INQUIRY_MODAL_FIELDS.map(f => (
 <div key={f.key}>
 <label className="block text-sm font-medium mb-1" style={{ color: 'var(--inquiries-text-secondary)' }}>{f.label}</label>
 <input 
 required={f.req !== false} 
 type={f.type} 
 placeholder={f.placeholder} 
 value={(form as any)[f.key]} 
 onChange={e => setForm({ ...form, [f.key]: e.target.value })} 
 className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--inquiries-highlight)]" 
 style={{ backgroundColor: 'var(--inquiries-bg-input)', borderColor: 'var(--inquiries-border)', color: 'var(--inquiries-text-primary)' }}
 />
 </div>
 ))}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium mb-1" style={{ color: 'var(--inquiries-text-secondary)' }}>Status</label>
 <select 
 value={form.status} 
 onChange={e => setForm({ ...form, status: e.target.value })} 
 className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--inquiries-highlight)]"
 style={{ backgroundColor: 'var(--inquiries-bg-input)', borderColor: 'var(--inquiries-border)', color: 'var(--inquiries-text-primary)' }}
 >
 {Object.entries(INQUIRIES_STATUS_LABELS).map(([val, label]) => (
 <option key={val} value={val}>{label}</option>
 ))}
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium mb-1" style={{ color: 'var(--inquiries-text-secondary)' }}>Source</label>
 <select 
 value={form.source} 
 onChange={e => setForm({ ...form, source: e.target.value })} 
 className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--inquiries-highlight)]"
 style={{ backgroundColor: 'var(--inquiries-bg-input)', borderColor: 'var(--inquiries-border)', color: 'var(--inquiries-text-primary)' }}
 >
 {INQUIRY_SOURCES.map(s => <option key={s}>{s}</option>)}
 </select>
 </div>
 </div>
 <div className="flex gap-3 pt-2">
 <button 
 type="button" 
 onClick={() => setShowModal(false)} 
 className="flex-1 py-2.5 border rounded-xl text-sm font-medium transition-colors hover:bg-[var(--primary-subtle)]"
 style={{ borderColor: 'var(--inquiries-border)', color: 'var(--inquiries-text-primary)' }}
 >
 Cancel
 </button>
 <button 
 type="submit" 
 disabled={saving} 
 className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-opacity" 
 style={{ backgroundColor: 'var(--inquiries-highlight)' }}
 >
 {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={15} />{editId ? 'Update' : 'Add Inquiry'}</>}
 </button>
 </div>
 </form>
 </div>
 </div>
 );
}
