"use client";
import { format } from 'date-fns';
// RESPONSIBILITY: Renders the slide-in profile drawer for a selected member showing full details.

import { X, Phone, Mail, Building2, Calendar, IndianRupee, User } from 'lucide-react';
import type { AdminMembersProfileDrawerProps } from '@/app/admin/members/members_types/AdminMembersProfileDrawerTypes';
import { formatCurrency } from '@/app/admin/admin_layout/admin_utils/AdminFormatCurrency';

import { displayValue } from '@/app/admin/admin_layout/admin_utils/AdminDisplayValue';
import type { AdminMember } from '@/app/admin/members/members_types/AdminMembersTypes';

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-success text-on-success',
  expired: 'bg-danger text-on-danger',
  pending: 'bg-warning-bg text-warning',
  frozen: 'bg-info text-on-info',
};



export default function AdminMembersProfileDrawer({ member, onClose }: AdminMembersProfileDrawerProps) {
  return (
    <>
      <div aria-hidden="true" className="fixed inset-0 bg-overlay backdrop-blur-sm z-40" onClick={onClose} />
      <div data-admin-dialog="true" role="dialog" aria-modal="true" tabIndex={-1} className="fixed right-0 top-0 h-full w-full max-w-md bg-overlay border-l border-border z-40 flex flex-col shadow-dialog">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-bold text-primary text-lg">Member Profile</h2>
          <button
            onClick={onClose}
            className="min-h-11 min-w-11 w-8 h-8 rounded-lg bg-input hover:bg-surface-hover flex items-center justify-center motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            aria-label="Close profile"
          >
            <X size={16} className="text-secondary" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-subtle flex items-center justify-center text-primary text-2xl font-bold border border-border">
              {member.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary">{member.name}</h3>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${STATUS_STYLES[member.status] ?? 'bg-input text-secondary'}`}>
                {member.status}
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-input rounded-xl border border-border p-4 space-y-3">
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Contact Info</p>
            <div className="flex items-center gap-3">
              <Phone size={15} className="text-secondary flex-shrink-0" />
              <span className="text-sm text-primary">{displayValue(member.phone)}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={15} className="text-secondary flex-shrink-0" />
              <span className="text-sm text-primary truncate">{displayValue(member.email)}</span>
            </div>
            <div className="flex items-center gap-3">
              <User size={15} className="text-secondary flex-shrink-0" />
              <span className="text-sm text-primary">{member.gender}</span>
            </div>
          </div>

          {/* Membership */}
          <div className="bg-input rounded-xl border border-border p-4 space-y-3">
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Membership</p>
            <div className="flex items-center gap-3">
              <Building2 size={15} className="text-secondary flex-shrink-0" />
              <span className="text-sm text-primary">{member.branchName}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={15} className="text-secondary flex-shrink-0" />
              <div>
                <span className="text-sm text-primary">{member.planName}</span>
                <p className="text-xs text-secondary mt-0.5">
                  {format(new Date(member.joinDate), 'dd MMM yyyy')} → {format(new Date(member.expiryDate), 'dd MMM yyyy')}
                </p>
              </div>
            </div>
            {member.pendingAmount > 0 && (
              <div className="flex items-center gap-3">
                <IndianRupee size={15} className="text-danger flex-shrink-0" />
                <span className="text-sm font-bold text-danger">Outstanding: {formatCurrency(member.pendingAmount)}</span>
              </div>
            )}
          </div>

          {/* Role boundary: renewal/payment/freeze actions belong to Manager workflows per the Admin feature contract. */}
        </div>
      </div>
    </>
  );
}
