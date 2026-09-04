// RESPONSIBILITY: Renders a detailed view of a selected member's profile.
'use client';

import { Edit, MessageCircle, Mail } from 'lucide-react';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { useMembersContext } from '@/app/manager/members/members_context/MembersContext';
import { useMembersStore } from '@/app/manager/members/members_store/useMembersStore';
import { MEMBERS_STATUS_COLORS, MEMBERS_CYCLE_LABELS, formatCurrency, PROFILE_TABS } from '@/app/manager/members/members_utils/MembersSharedConstants';
import ProfileOverview from '@/app/manager/members/members_components/MemberProfile/ProfileOverview';
import ProfileAttendance from '@/app/manager/members/members_components/MemberProfile/ProfileAttendance';
import ProfilePayments from '@/app/manager/members/members_components/MemberProfile/ProfilePayments';
import ProfileWorkout from '@/app/manager/members/members_components/MemberProfile/ProfileWorkout';
import ProfileDiet from '@/app/manager/members/members_components/MemberProfile/ProfileDiet';

export default function MemberProfile() {
  const { selectedMember, setSelectedMember, profileTab, setProfileTab, openEdit, openMsg } = useMembersContext();
  const loadMemberProfile = useMembersStore(s => s.loadMemberProfile);

  if (!selectedMember) return null;

  const statusStyle = MEMBERS_STATUS_COLORS[selectedMember.status] || { bg: 'bg-input', text: 'text-secondary' };

  return (
    <div className="min-h-full">
      <ManagerHeader title="Member Profile" subtitle={`Viewing profile of ${selectedMember.name}`} />
      <div className="p-6 space-y-5">
        <button
          onClick={() => setSelectedMember(null)}
          className="text-sm text-secondary hover:text-primary flex items-center gap-1.5 transition-all duration-200"
        >
          ← Back to Members
        </button>

        {/* Profile Card */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-primary bg-primary-subtle shrink-0">
                {(selectedMember.name || '?').charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">{selectedMember.name || 'Unknown Member'}</h2>
                <p className="text-secondary text-sm">{selectedMember.email} · {selectedMember.phone}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                    {selectedMember.status}
                  </span>
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-info-bg text-info">
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
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-border rounded-xl hover:bg-primary-subtle text-primary transition-all duration-200 active:scale-95"
              >
                <Edit size={14} /> Edit
              </button>
              <button
                onClick={() => openEdit({ ...selectedMember, status: 'ACTIVE' })}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-border rounded-xl hover:bg-primary/10 text-primary transition-all duration-200 active:scale-95 bg-primary/5"
              >
                Renew Plan
              </button>
              <button
                onClick={() => openMsg(selectedMember, 'whatsapp')}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-success text-white rounded-xl hover:opacity-90 transition-all duration-200 active:scale-95"
              >
                <MessageCircle size={14} /> WhatsApp
              </button>
              <button
                onClick={() => openMsg(selectedMember, 'email')}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-info text-white rounded-xl hover:opacity-90 transition-all duration-200 active:scale-95"
              >
                <Mail size={14} /> Email
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Member ID', value: selectedMember.id },
              { label: 'Branch', value: selectedMember.branch },
              { label: 'Gender', value: selectedMember.gender },
              { label: 'Aadhaar Card', value: selectedMember.aadhaar || 'N/A' },
              { label: 'Join Date', value: new Date(selectedMember.joinDate).toLocaleDateString('en-IN') },
              { label: 'Expiry Date', value: new Date(selectedMember.expiryDate).toLocaleDateString('en-IN') },
              { label: 'Address', value: selectedMember.address || 'N/A' },
              { label: 'Total Paid', value: formatCurrency(selectedMember.paidAmount) },
              { label: 'Pending', value: formatCurrency(selectedMember.pendingAmount) },
            ].map((f, i) => (
              <div key={i} className="bg-input rounded-lg p-3">
                <p className="text-xs text-secondary mb-0.5">{f.label}</p>
                <p className="text-sm font-semibold text-primary">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sub Tabs */}
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="flex border-b border-border">
            {PROFILE_TABS.map(({ id: t, label }) => (
              <button
                key={t}
                onClick={() => { setProfileTab(t as "overview" | "attendance" | "payments" | "workout" | "diet"); if (t === 'payments') loadMemberProfile(selectedMember.id); }}
                className={`px-5 py-3.5 text-sm font-medium transition-all duration-200 border-b-2 ${
                  profileTab === t
                    ? 'text-primary bg-primary-subtle border-primary'
                    : 'border-transparent text-secondary hover:text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-5">
            {profileTab === 'overview' && <ProfileOverview />}
            {profileTab === 'attendance' && <ProfileAttendance />}
            {profileTab === 'payments' && <ProfilePayments />}
            {profileTab === 'workout' && <ProfileWorkout />}
            {profileTab === 'diet' && <ProfileDiet />}
          </div>
        </div>
      </div>
    </div>
  );
}
