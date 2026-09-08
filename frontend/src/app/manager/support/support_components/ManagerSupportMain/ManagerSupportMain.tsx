'use client';
// RESPONSIBILITY: Root client component for Manager Support page.
// DATA FLOW: useManagerSupportLogic → ManagerSupportMain
// Rule 20: SearchableDropdown replaces native <select>.
// Rule 9b: lucide-react icons only — no raw SVG.

import { useEffect } from 'react';
import { Send, Loader2, LifeBuoy } from 'lucide-react';
import { useManagerSupportLogic } from '@/app/manager/support/support_context/useManagerSupportLogic';
import {
  SUPPORT_ISSUE_CATEGORIES,
  SUPPORT_TICKET_STATUS_STYLES,
} from '@/app/manager/support/support_types/ManagerSupportTypes';
import { SearchableDropdown } from '@/app/manager/manager_components/ManagerShared/SearchableDropdown';

export default function ManagerSupportMain() {
  const {
    category, setCategory,
    subject, setSubject,
    message, setMessage,
    submitting,
    tickets,
    fetchState,
    loadTickets,
    handleSubmit,
  } = useManagerSupportLogic();

  useEffect(() => {
    loadTickets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Help &amp; Support</h1>
        <p className="text-secondary mt-1 text-sm">Contact the Admin for any issues or queries.</p>
      </div>

      {/* Submit Ticket Form */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-5 border-b border-border pb-4">
          <LifeBuoy size={18} className="text-primary" strokeWidth={2} />
          <h2 className="text-base font-semibold text-foreground">Send Message to Admin</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          {/* Issue Category — Rule 20: SearchableDropdown */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-1.5">
              Issue Category <span className="text-danger">*</span>
            </label>
            <SearchableDropdown
              options={SUPPORT_ISSUE_CATEGORIES.map((o) => ({ value: o.value, label: o.label }))}
              value={category}
              onChange={(val) => setCategory(val as typeof category)}
              placeholder="Select issue category"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-1.5">
              Subject <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Briefly describe the problem..."
              required
              className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-1.5">
              Message Details <span className="text-danger">*</span>
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Explain your issue in detail so the admin can help you quickly..."
              required
              className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg text-sm motion-safe:transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {submitting
              ? <Loader2 size={16} strokeWidth={2} className="motion-safe:animate-spin" />
              : <Send size={16} strokeWidth={2} />}
            Send to Admin
          </button>
        </form>
      </div>

      {/* Previous Tickets */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">Previous Tickets</h2>
        </div>

        {fetchState === 'loading' && (
          <div className="p-8 flex justify-center">
            <Loader2 size={24} className="text-primary motion-safe:animate-spin" />
          </div>
        )}

        {fetchState !== 'loading' && tickets.length === 0 && (
          <div className="p-10 text-center">
            <LifeBuoy size={36} className="mx-auto text-secondary opacity-40 mb-3" />
            <p className="text-sm text-secondary">No tickets submitted yet.</p>
          </div>
        )}

        {tickets.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5 border-b border-border">
                  {['Ticket ID', 'Subject', 'Category', 'Date', 'Status'].map((h) => (
                    <th key={h} className="py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-primary/5 motion-safe:transition-colors">
                    <td className="py-3 px-4 text-sm font-mono text-secondary">{ticket.ticketRef}</td>
                    <td className="py-3 px-4 text-sm text-foreground max-w-xs truncate" title={ticket.subject}>{ticket.subject}</td>
                    <td className="py-3 px-4 text-sm text-secondary capitalize">{ticket.category.replace('_', ' ')}</td>
                    <td className="py-3 px-4 text-sm text-secondary whitespace-nowrap">
                      {new Date(ticket.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${SUPPORT_TICKET_STATUS_STYLES[ticket.status]}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
