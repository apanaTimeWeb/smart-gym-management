'use client';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { formatCurrencyFromMinorUnits } from '@/lib/formatters';
// RESPONSIBILITY: Renders a detailed view of a selected member's profile.
import { Edit, MessageCircle, Mail } from 'lucide-react';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { displayValue, formatDate } from '@/lib/formatters';
import { useManagerMembersLogic } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersLogic';

import { MEMBERS_STATUS_COLORS, MEMBERS_CYCLE_LABELS, PROFILE_TABS } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import ManagerProfileOverview from '@/app/manager/members/members_components/MemberProfile/ManagerProfileOverview';
import ManagerProfileAttendance from '@/app/manager/members/members_components/MemberProfile/ManagerProfileAttendance';
import ManagerProfilePayments from '@/app/manager/members/members_components/MemberProfile/ManagerProfilePayments';
import ManagerProfileWorkout from '@/app/manager/members/members_components/MemberProfile/ManagerProfileWorkout';
import ManagerProfileDiet from '@/app/manager/members/members_components/MemberProfile/ManagerProfileDiet';

export default function ManagerMemberProfile() {
  const { selectedMember, setSelectedMember, profileTab, setProfileTab, openEdit, openMsg, setShowRenewModal } = useManagerMembersLogic();


  if (!selectedMember) return null;

  const statusStyle = MEMBERS_STATUS_COLORS[selectedMember.status] || { bg: 'bg-input', text: 'text-secondary' };

  return (
    <div className="min-h-full">
      <ManagerHeader title="Member Profile" subtitle={`Viewing profile of ${selectedMember.name}`} />
      <div className="p-6 space-y-5">
        <button
          onClick={() => setSelectedMember(null)}
          className="text-sm text-secondary hover:text-primary flex items-center gap-1.5 motion-safe:transition-all motion-safe:duration-200"
        >
          â† Back to Members
        </button>

        {/* Profile Card */}
        <div className="bg-card rounded-xl shadow-card border border-border p-6">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-primary bg-primary-subtle shrink-0">
                {(selectedMember.name || '?').charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">{displayValue(selectedMember.name)}</h2>
                <p className="text-secondary text-sm">{selectedMember.email} Â· {selectedMember.phone}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                    {selectedMember.status}
                  </span>
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-info text-info">
                    {selectedMember.plan?.name || ''}
                  </span>
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-bg text-purple">
                    {MEMBERS_CYCLE_LABELS[selectedMember.billingCycle] || selectedMember.billingCycle}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => openEdit(selectedMember)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-border rounded-xl hover:bg-primary-subtle text-primary motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95"
              >
                <Edit size={18} /> Edit
              </button>
              <button
                onClick={() => setShowRenewModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-border rounded-xl hover:bg-primary/10 text-primary motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95 bg-primary/5"
              >
                Renew Plan
              </button>
              <button
                onClick={() => openMsg(selectedMember, 'whatsapp')}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-success text-on-success rounded-xl hover:opacity-90 motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95"
              >
                <MessageCircle size={18} /> WhatsApp
              </button>
              <button
                onClick={() => openMsg(selectedMember, 'email')}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-info text-on-info rounded-xl hover:opacity-90 motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95"
              >
                <Mail size={18} /> Email
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Member ID', value: selectedMember.id },
              { label: 'Branch', value: selectedMember.branch },
              { label: 'Gender', value: selectedMember.gender },
              { label: 'Aadhaar Card', value: selectedMember.aadhaar || 'N/A' },
              { label: 'Join Date', value: formatDate(selectedMember.joinDate) },
              { label: 'Expiry Date', value: formatDate(selectedMember.expiryDate) },
              { label: 'Address', value: selectedMember.address || 'N/A' },
              { label: 'Total Paid', value: formatCurrencyFromMinorUnits(selectedMember.paidAmount, ManagerEnvConfig.currencyCode) },
              { label: 'Pending', value: formatCurrencyFromMinorUnits(selectedMember.pendingAmount, ManagerEnvConfig.currencyCode) },
            ].map((f, i) => (
              <div key={`member-summary-stat-${f.label.replace(/\s+/g, '-')}`} className="bg-input rounded-lg p-3">
                <p className="text-xs text-secondary mb-0.5">{f.label}</p>
                <p className="text-sm font-semibold text-primary">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sub Tabs */}
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="flex border-b border-border">
            {PROFILE_TABS.map(({ id: t, label }) => (
              <button
                key={t}
                onClick={() => { setProfileTab(t as any); }}
                className={`px-5 py-3.5 text-sm font-medium motion-safe:transition-all motion-safe:duration-200 border-b-2 ${profileTab === t
                    ? 'text-primary bg-primary-subtle border-primary'
                    : 'border-transparent text-secondary hover:text-primary'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-5">
            {profileTab === 'overview' && <ManagerProfileOverview />}
            {profileTab === 'attendance' && <ManagerProfileAttendance />}
            {profileTab === 'payments' && <ManagerProfilePayments />}
            {profileTab === 'workout' && <ManagerProfileWorkout />}
            {profileTab === 'diet' && <ManagerProfileDiet />}
          </div>
        </div>
      </div>
    </div>
  );
}

