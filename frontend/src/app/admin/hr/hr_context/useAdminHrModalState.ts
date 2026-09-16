"use client";
// DATA FLOW: UI actions → useAdminHrModalState → Admin HR view props.
import { useState } from 'react';
import type { Staff } from '@/app/admin/hr/hr_types/AdminHrTypes';

/** Owns only private modal/draft UI state for the Admin HR module. Server data remains elsewhere. */
export function useAdminHrModalState() {
  const [showModal, setShowModal] = useState(false);
  const [showPayrollModal, setShowPayrollModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState<{ payrollId: string; staffName: string; pendingAmount: number } | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Staff> | null>(null);
  const [viewProfileData, setViewProfileData] = useState<Staff | null>(null);
  const [saving, setSaving] = useState(false);
  return { showModal, setShowModal, showPayrollModal, setShowPayrollModal, showProfileModal, setShowProfileModal, paymentModal, setPaymentModal, editId, setEditId, editData, setEditData, viewProfileData, setViewProfileData, saving, setSaving };
}
