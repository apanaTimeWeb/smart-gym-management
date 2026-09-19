"use client";
import { formatCurrency } from '@/lib/formatters';
// RESPONSIBILITY: Renders/orchestrates AdminHrAdvanceTable for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import { useState } from 'react';
import { useHrContext } from '@/app/admin/hr/hr_context/AdminHrContext';

export default function AdminHrAdvanceTable() {
  const { staff, giveAdvance, saving } = useHrContext();
  const [selectedStaffId, setSelectedStaffId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [paymentMode, setPaymentMode] = useState<string>('Bank Transfer');

  const selectedStaff = staff.find(s => String(s.id) === String(selectedStaffId));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaffId || !amount) return;
    await giveAdvance({ staffId: selectedStaffId, amount: Number(amount), notes, paymentMode });
    setAmount('');
    setNotes('');
  };

  return (
    <div className="max-w-2xl mx-auto bg-card p-6 rounded-xl border border-border">
      <h2 className="text-xl font-bold mb-6 text-primary">Give Advance Payment</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1 text-primary">Staff Member *</label>
          <select 
            required
            value={selectedStaffId}
            onChange={(e) => setSelectedStaffId(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-primary focus:ring-2 focus:ring-primary"
          >
            <option value="" disabled>Select Staff</option>
            {staff.map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.role}) - Balance: {formatCurrency(s.advanceSalary || 0)}</option>
            ))}
          </select>
        </div>

        {selectedStaff && (
          <div className="p-4 bg-surface-highlight rounded-lg border border-border text-sm">
            <p><strong>Current Advance Balance:</strong> {formatCurrency(selectedStaff.advanceSalary || 0)}</p>
            <p className="text-secondary text-xs mt-1">Advances are automatically deducted from the next payroll calculation.</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-primary">Amount (₹) *</label>
            <input 
              type="number" required min="1"
              value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-primary">Payment Mode</label>
            <select 
              value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-primary"
            >
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="UPI">UPI</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-primary">Notes / Reason</label>
          <textarea 
            value={notes} onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-primary min-h-20"
            placeholder="e.g. Festival advance, medical emergency..."
          />
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={saving || !selectedStaffId || !amount}
            className="px-6 py-2 bg-primary text-on-primary rounded-lg font-medium disabled:opacity-50"
          >
            {saving ? 'Processing...' : 'Give Advance'}
          </button>
        </div>
      </form>
    </div>
  );
}
