"use client";

import { useState } from 'react';
import { useFinanceContext } from '@/app/erp/finance/finance_context/FinanceContext';
import { FINANCE_PAYMENT_METHODS } from '@/app/erp/finance/finance_utils/FinanceSharedConstants';
import { X } from 'lucide-react';
import { financeApi } from '@/lib/api';

export default function AddPaymentModal() {
 const { showModal, setShowModal, showToast, loadAll } = useFinanceContext();
 const [form, setForm] = useState({ memberId: '', amount: '', method: 'UPI', notes: '' });
 const [saving, setSaving] = useState(false);

 if (!showModal) return null;

 const handleAddPayment = async (e: React.FormEvent) => {
 e.preventDefault();
 setSaving(true);
 try {
 const res = await financeApi.createPayment({ 
 memberId: Number(form.memberId), 
 amount: Number(form.amount), 
 method: form.method, 
 notes: form.notes 
 });
 showToast((res as any).message, 'success');
 setShowModal(false);
 setForm({ memberId: '', amount: '', method: 'UPI', notes: '' });
 await loadAll();
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 } finally { 
 setSaving(false); 
 }
 };

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 finance-module" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
 <div className="rounded-2xl shadow-xl w-full max-w-md" style={{ backgroundColor: 'var(--finance-bg-card)' }}>
 <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--finance-border)' }}>
 <h3 className="text-lg font-bold" style={{ color: 'var(--finance-text-primary)' }}>Record Payment</h3>
 <button 
 onClick={() => setShowModal(false)} 
 className="p-2 rounded-lg transition-colors hover:bg-[var(--primary-subtle)]"
 style={{ color: 'var(--finance-text-secondary)' }}
 >
 <X size={18} />
 </button>
 </div>
 <form onSubmit={handleAddPayment} className="p-6 space-y-4">
 <div>
 <label className="block text-sm font-medium mb-1" style={{ color: 'var(--finance-text-secondary)' }}>Member ID</label>
 <input 
 required 
 type="number" 
 placeholder="Enter Member ID" 
 value={form.memberId} 
 onChange={e => setForm({ ...form, memberId: e.target.value })} 
 className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--finance-highlight)]" 
 style={{ backgroundColor: 'var(--finance-bg-input)', borderColor: 'var(--finance-border)', color: 'var(--finance-text-primary)' }}
 />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1" style={{ color: 'var(--finance-text-secondary)' }}>Amount (₹)</label>
 <input 
 required 
 type="number" 
 placeholder="2500" 
 value={form.amount} 
 onChange={e => setForm({ ...form, amount: e.target.value })} 
 className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--finance-highlight)]" 
 style={{ backgroundColor: 'var(--finance-bg-input)', borderColor: 'var(--finance-border)', color: 'var(--finance-text-primary)' }}
 />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1" style={{ color: 'var(--finance-text-secondary)' }}>Payment Method</label>
 <select 
 value={form.method} 
 onChange={e => setForm({ ...form, method: e.target.value })} 
 className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--finance-highlight)]"
 style={{ backgroundColor: 'var(--finance-bg-input)', borderColor: 'var(--finance-border)', color: 'var(--finance-text-primary)' }}
 >
 {FINANCE_PAYMENT_METHODS.map(m => <option key={m}>{m}</option>)}
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium mb-1" style={{ color: 'var(--finance-text-secondary)' }}>Notes (optional)</label>
 <input 
 type="text" 
 placeholder="Any notes..." 
 value={form.notes} 
 onChange={e => setForm({ ...form, notes: e.target.value })} 
 className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--finance-highlight)]" 
 style={{ backgroundColor: 'var(--finance-bg-input)', borderColor: 'var(--finance-border)', color: 'var(--finance-text-primary)' }}
 />
 </div>
 <div className="flex gap-3 pt-2">
 <button 
 type="button" 
 onClick={() => setShowModal(false)} 
 className="flex-1 py-2.5 border rounded-xl text-sm font-medium transition-colors hover:bg-[var(--primary-subtle)]"
 style={{ borderColor: 'var(--finance-border)', color: 'var(--finance-text-primary)' }}
 >
 Cancel
 </button>
 <button 
 type="submit" 
 disabled={saving} 
 className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-opacity" 
 style={{ backgroundColor: 'var(--finance-highlight)' }}
 >
 {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Record Payment'}
 </button>
 </div>
 </form>
 </div>
 </div>
 );
}
