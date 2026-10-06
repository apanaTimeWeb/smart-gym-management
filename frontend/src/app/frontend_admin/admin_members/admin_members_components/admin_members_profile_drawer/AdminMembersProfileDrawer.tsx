"use client";
// RESPONSIBILITY: Renders the slide-in profile drawer for a selected member showing full details.
import { useLocale, useTranslations } from 'next-intl';
import { MEMBER_STATUS_LABEL_KEYS } from '@/app/frontend_admin/admin_members/admin_members_constants/AdminMembersConstants';
import { formatDate } from '@/app/frontend_admin/admin_members/admin_members_utils/AdminMembersFormatters';

import { X, Phone, Mail, Building2, Calendar, IndianRupee, User } from 'lucide-react';
import type { AdminMembersProfileDrawerProps } from '@/app/frontend_admin/admin_members/admin_members_types/AdminMembersProfileDrawerTypes';
import { AdminMembersFormatCurrency } from '@/app/frontend_admin/admin_members/admin_members_utils/AdminMembersFormatCurrency';

import { displayValue } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutDisplayValue';
import type { AdminMember } from '@/app/frontend_admin/admin_members/admin_members_types/AdminMembersTypes';

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-success text-on-success',
  expired: 'bg-danger text-on-danger',
  pending: 'bg-warning-bg text-warning',
  frozen: 'bg-info text-on-info',
};



/**
 * AdminMembersProfileDrawer renders the admin members profile drawer UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersProfileDrawer: Renders the slide-in profile drawer for a selected member showing full details.
 * @dependencies Consumes AdminMembersFormatters, AdminMembersProfileDrawerTypes, AdminMembersFormatCurrency, AdminLayoutDisplayValue, AdminMembersTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminMembersProfileDrawer({ member, onClose }: AdminMembersProfileDrawerProps) {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <>
      <div aria-hidden="true" className="fixed inset-0 bg-overlay backdrop-blur-sm z-40" onClick={onClose}  data-testid="admin_members-admin_members-profile-drawer-control"/>
      <div data-admin-dialog="true" role="dialog" aria-modal="true" tabIndex={-1} className="fixed right-0 top-0 h-full w-full max-w-md bg-overlay border-l border-border z-40 flex flex-col shadow-dialog" data-testid="admin_members-admin_members-profile-drawer-control-2">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-bold text-primary text-lg">{t('members.admin_members_profile_drawer.text_75caff26c6')}</h2>
          <button type="button"
            onClick={onClose}
            className="min-h-11 min-w-11 w-8 h-8 rounded-lg bg-input hover:bg-surface-hover flex items-center justify-center motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95"
            aria-label={t('members.admin_members_profile_drawer.text_c32c06424e')}
           data-testid="admin_members-admin_members-profile-drawer-control-3">
            <X size={18} className="text-secondary"  strokeWidth={2}/>
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
                {MEMBER_STATUS_LABEL_KEYS[member.status] ? t(MEMBER_STATUS_LABEL_KEYS[member.status] as string) : member.status}
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-input rounded-xl border border-border p-4 space-y-3">
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider">{t('members.admin_members_profile_drawer.text_e873f4db37')}</p>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-secondary flex-shrink-0"  strokeWidth={2}/>
              <span className="text-sm text-primary">{displayValue(member.phone)}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-secondary flex-shrink-0"  strokeWidth={2}/>
              <span className="text-sm text-primary truncate">{displayValue(member.email)}</span>
            </div>
            <div className="flex items-center gap-3">
              <User size={18} className="text-secondary flex-shrink-0"  strokeWidth={2}/>
              <span className="text-sm text-primary">{member.gender}</span>
            </div>
          </div>

          {/* Membership */}
          <div className="bg-input rounded-xl border border-border p-4 space-y-3">
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider">{t('members.admin_members_profile_drawer.text_53bc9670e7')}</p>
            <div className="flex items-center gap-3">
              <Building2 size={18} className="text-secondary flex-shrink-0"  strokeWidth={2}/>
              <span className="text-sm text-primary">{member.branchName}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-secondary flex-shrink-0"  strokeWidth={2}/>
              <div>
                <span className="text-sm text-primary">{member.planName}</span>
                <p className="text-xs text-secondary mt-0.5">
                  {formatDate(member.joinDate, locale)} → {formatDate(member.expiryDate, locale)}
                </p>
              </div>
            </div>
            {member.pendingAmount > 0 && (
              <div className="flex items-center gap-3">
                <IndianRupee size={18} className="text-danger flex-shrink-0"  strokeWidth={2}/>
                <span className="text-sm font-bold text-danger">{t('members.admin_members_profile_drawer.text_02fc962d8c')}{AdminMembersFormatCurrency(member.pendingAmount, undefined, locale)}</span>
              </div>
            )}
          </div>

          {/* Role boundary: renewal/payment/freeze actions belong to Manager workflows per the Admin feature contract. */}
        </div>
      </div>
    </>
  );
}
