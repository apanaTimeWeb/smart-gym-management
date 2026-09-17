"use client";
import { formatCurrency } from '@/lib/formatters';
import { displayValue } from '@/app/admin/admin_utils/AdminDisplayValue';
// RESPONSIBILITY: Read-only profile view for Staff/Managers, showing details and assigned branches.

import React, { useMemo, useState } from 'react';
import type { Staff } from '@/app/admin/hr/hr_types/AdminHrTypes';
import { useHrContext } from '@/app/admin/hr/hr_context/AdminHrContext';
import { useAdminHrStaffProfileBranches } from '@/app/admin/hr/hr_context/useAdminHrStaffProfileBranches';
import { ChevronDown, ChevronUp, X, Building2, User, Phone, Mail, MapPin, Calendar, Activity, CheckCircle2, Ban, Edit2, IndianRupee, Hash } from 'lucide-react';

export default function AdminHrStaffProfileModal() {
  const { showProfileModal, setShowProfileModal, editData, openEdit } = useHrContext();

  const isManager = editData?.role === 'Manager';

  const branchQuery = useAdminHrStaffProfileBranches(Boolean(showProfileModal && editData));
  const [branchSortDirection, setBranchSortDirection] = useState<'asc' | 'desc'>('asc');
  const branchesById = useMemo(() => new Map((branchQuery.data ?? []).map((branch) => [branch.id, branch])), [branchQuery.data]);
  const branchesToRender = useMemo(() => {
    if (!editData) return [];
    const values = isManager && editData.assignedBranches?.length ? editData.assignedBranches : [editData.branch || ''];
    return [...values].filter(Boolean).sort((left, right) => {
      const leftName = branchesById.get(left)?.name ?? left;
      const rightName = branchesById.get(right)?.name ?? right;
      const result = leftName.localeCompare(rightName);
      return branchSortDirection === 'asc' ? result : -result;
    });
  }, [branchSortDirection, branchesById, editData, isManager]);

  if (!showProfileModal || !editData) return null;

  return (
    <div data-admin-dialog="true" role="dialog" aria-modal="true" tabIndex={-1} className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay backdrop-blur-sm">
      <div className="bg-card w-full max-w-3xl rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-input/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-xl">
              <User size={20} />
            </div>
            <h2 className="text-lg font-bold text-foreground">Staff Profile</h2>
          </div>
          <button 
            onClick={() => setShowProfileModal(false)}
            className="p-2 rounded-full hover:bg-input motion-safe:transition-colors text-secondary hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          
          {/* Top Profile Section */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-primary/10 border-2 border-primary/20 flex flex-col items-center justify-center flex-shrink-0 text-primary">
              <span className="text-3xl font-bold uppercase">{(editData.name || '?').charAt(0)}</span>
            </div>
            <div className="flex-1 space-y-4 w-full">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground leading-tight">{editData.name}</h1>
                  <p className="text-sm font-medium text-primary mt-1">{editData.role} • ID: {editData.id?.toUpperCase()}</p>
                </div>
                {isManager && (
                  <button
                    onClick={() => openEdit(editData as Staff)}
                    className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-sm rounded-xl motion-safe:transition-colors flex items-center gap-2"
                  >
                    <Edit2 size={14} />
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-input/50 p-3 rounded-xl border border-border/50">
                  <Phone size={16} className="text-secondary" />
                  <span className="text-sm font-medium text-foreground">{displayValue(editData.phone)}</span>
                </div>
                <div className="flex items-center gap-3 bg-input/50 p-3 rounded-xl border border-border/50">
                  <Mail size={16} className="text-secondary" />
                  <span className="text-sm font-medium text-foreground truncate">{displayValue(editData.email)}</span>
                </div>
                <div className="flex items-center gap-3 bg-input/50 p-3 rounded-xl border border-border/50">
                  <Calendar size={16} className="text-secondary" />
                  <span className="text-sm font-medium text-foreground">
                    Joined: {editData.joinDate ? new Date(editData.joinDate).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-input/50 p-3 rounded-xl border border-border/50">
                  <Activity size={16} className="text-secondary" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm text-secondary">Status:</span>
                    {editData.isActive !== false ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded-md uppercase tracking-wide">
                        <CheckCircle2 size={12} /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-danger bg-danger/10 px-2 py-0.5 rounded-md uppercase tracking-wide">
                        <Ban size={12} /> Suspended
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-input/50 p-3 rounded-xl border border-border/50">
                  <IndianRupee size={16} className="text-secondary" />
                  <span className="text-sm font-medium text-foreground">
                    Salary: {formatCurrency(editData.salary || 0)}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-input/50 p-3 rounded-xl border border-danger/50">
                  <IndianRupee size={16} className="text-danger" />
                  <span className="text-sm font-medium text-danger">
                    Advance: {formatCurrency(editData.advanceSalary || 0)}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-input/50 p-3 rounded-xl border border-warning/50">
                  <IndianRupee size={16} className="text-warning" />
                  <span className="text-sm font-medium text-warning">
                    Due: {formatCurrency(editData.currentDue || 0)}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-input/50 p-3 rounded-xl border border-border/50">
                  <Hash size={16} className="text-secondary" />
                  <span className="text-sm font-medium text-foreground">
                    Aadhaar: {displayValue(editData.aadhaar)}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-input/50 p-3 rounded-xl border border-border/50">
                  <span className="text-xs font-bold border border-secondary text-secondary rounded px-1">UPI</span>
                  <span className="text-sm font-medium text-foreground truncate max-w-40" title={editData.upiId}>
                    {displayValue(editData.upiId)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Branches Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 size={18} className="text-primary" />
              <h3 className="text-base font-bold text-foreground">Assigned {isManager ? 'Branches' : 'Branch'}</h3>
            </div>
            
            <div className="border border-border rounded-xl overflow-hidden">
              <table data-admin-responsive-table className="w-full text-left border-collapse">
                <thead className="bg-input/50">
                  <tr>
                    <th role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click(); } }}  onClick={() => setBranchSortDirection((current) => current === 'asc' ? 'desc' : 'asc')} className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider cursor-pointer select-none" aria-sort={branchSortDirection === 'asc' ? 'ascending' : 'descending'}><div className="flex items-center gap-1.5">Branch {branchSortDirection === 'asc' ? <ChevronUp size={13} className="text-primary"/> : <ChevronDown size={13} className="text-primary"/>}</div></th>
                    <th className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Location</th>
                    {isManager && <th className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider text-right">Badge</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {branchesToRender.map((bId) => {
                    if (!bId) return null;
                    const info = branchesById.get(bId);
                    if (!info) return null;
                    const isPrimary = editData.primaryBranchId === bId || (!editData.primaryBranchId && bId === editData.branch);
                    
                    return (
                      <tr key={bId} className="bg-card hover:bg-input/30 motion-safe:transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">
                          {info.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-secondary">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={12} />
                            {info.location}
                          </div>
                        </td>
                        {isManager && (
                          <td className="px-4 py-3 text-right">
                            {isPrimary ? (
                              <span className="inline-block text-xs font-bold text-warning bg-warning/10 border border-warning/20 px-2 py-1 rounded-md uppercase">
                                Primary Branch
                              </span>
                            ) : (
                              <span className="inline-block text-xs font-bold text-secondary bg-input px-2 py-1 rounded-md uppercase">
                                Assigned
                              </span>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                  {branchQuery.status === 'pending' && (
                    <tr><td colSpan={3} className="px-4 py-8 text-center text-secondary text-sm">Loading branch assignments…</td></tr>
                  )}
                  {branchQuery.status === 'error' && (
                    <tr><td colSpan={3} className="px-4 py-8 text-center text-secondary text-sm">Branch assignment data could not be loaded.</td></tr>
                  )}
                  {!branchesToRender.length && branchQuery.status === 'success' && (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-secondary text-sm">
                        No branches assigned.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {isManager && (
              <p className="text-xs text-secondary/70 italic flex items-center gap-1 mt-2">
                Note: This manager has access to data strictly limited to the above listed branches.
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
