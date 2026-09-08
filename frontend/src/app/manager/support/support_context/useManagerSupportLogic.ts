// RESPONSIBILITY: Logic hook for Manager Support page — ticket form state, submit, and ticket list fetch.
// DATA FLOW: managerSupportApi → useManagerSupportLogic → ManagerSupportMain
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { managerSupportApi } from '@/app/manager/support/support_api/ManagerSupportApi';
import type { SupportIssueCategory, ManagerSupportTicket } from '@/app/manager/support/support_types/ManagerSupportTypes';

export function useManagerSupportLogic() {
  const [category, setCategory] = useState<SupportIssueCategory>('BILLING');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [tickets, setTickets] = useState<ManagerSupportTicket[]>([]);
  const [fetchState, setFetchState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function loadTickets() {
    setFetchState('loading');
    try {
      const res = await managerSupportApi.fetchTickets();
      setTickets(res.data ?? []);
      setFetchState('success');
    } catch {
      setFetchState('error');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await managerSupportApi.createTicket({ category, subject, message });
      toast.success(res.message || 'Ticket submitted successfully.');
      setSubject('');
      setMessage('');
      setCategory('BILLING');
      if (res.data) setTickets(prev => [res.data!, ...prev]);
    } catch {
      toast.error('Failed to submit ticket. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return {
    category, setCategory,
    subject, setSubject,
    message, setMessage,
    submitting,
    tickets,
    fetchState,
    loadTickets,
    handleSubmit,
  };
}
