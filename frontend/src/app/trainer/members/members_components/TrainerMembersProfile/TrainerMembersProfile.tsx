'use client';
// RESPONSIBILITY: Renders a detailed view of a selected member's profile.
import { MessageCircle, Mail } from 'lucide-react';
import { useTrainerMembersStore } from '@/app/trainer/members/members_store/useTrainerMembersStore';
import { useTrainerSelectedMember } from '@/app/trainer/members/members_queries/useTrainerSelectedMember';
import { MEMBERS_STATUS_COLORS, PROFILE_TABS } from '@/app/trainer/members/members_utils/TrainerMembersSharedConstants';
import TrainerMembersProfileOverview from '@/app/trainer/members/members_components/TrainerMembersProfile/TrainerMembersProfileOverview';
import TrainerMembersProfileAttendance from '@/app/trainer/members/members_components/TrainerMembersProfile/TrainerMembersProfileAttendance';
import TrainerMembersProfileFitness from '@/app/trainer/members/members_components/TrainerMembersProfile/TrainerMembersProfileFitness';
import TrainerMembersProfileProgress from '@/app/trainer/members/members_components/TrainerMembersProfile/TrainerMembersProfileProgress';
import TrainerMembersProfileWorkout from '@/app/trainer/members/members_components/TrainerMembersProfile/TrainerMembersProfileWorkout';
import TrainerMembersProfileDiet from '@/app/trainer/members/members_components/TrainerMembersProfile/TrainerMembersProfileDiet';
import TrainerMembersProfileAssessment from '@/app/trainer/members/members_components/TrainerMembersProfile/TrainerMembersProfileAssessment';
import TrainerMembersProfileNotes from '@/app/trainer/members/members_components/TrainerMembersProfile/TrainerMembersProfileNotes';
import { maskSensitiveData, displayValue } from '@/lib/formatters';
import type { TrainerProfileTab } from '@/app/trainer/members/members_utils/TrainerMembersSharedConstants';

export default function TrainerMembersProfile() {
  const { member: selectedMember } = useTrainerSelectedMember();
  const setSelectedMember = useTrainerMembersStore(s => s.setSelectedMember);
  const profileTab = useTrainerMembersStore(s => s.profileTab);
  const setProfileTab = useTrainerMembersStore(s => s.setProfileTab);
  const openMsg = useTrainerMembersStore(s => s.openMsg);

  if (!selectedMember) return null;

  const statusStyle = MEMBERS_STATUS_COLORS[selectedMember.status] || { bg: 'bg-input', text: 'text-secondary' };

  return (
    <div className="min-h-full">
            <div className="p-6 space-y-5">
        <button type="button"
          onClick={() => setSelectedMember(null)}
          className="text-sm text-secondary hover:text-primary flex items-center gap-1.5 motion-safe:transition-all motion-safe:duration-base"
        >
          â† Back to Members
        </button>

        {/* Profile Card */}
        <div className="bg-card rounded-xl shadow-card border border-border p-6">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-primary bg-primary-subtle">
                {selectedMember.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">{selectedMember.name}</h2>
                <p className="text-secondary text-sm">{selectedMember.email} Â· {maskSensitiveData(selectedMember.phone, 'phone')}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                    {selectedMember.status}
                  </span>
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-info-bg text-info">
                    {displayValue(selectedMember.plan?.name)}
                  </span>
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-bg text-purple">
                    {selectedMember.billingCycle}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button type="button"
                onClick={() => openMsg({ name: selectedMember.name, email: selectedMember.email, phone: selectedMember.phone }, 'whatsapp', '')}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-success text-on-success rounded-xl hover:opacity-90 motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95"
              >
                <MessageCircle size={14} /> WhatsApp
              </button>
              <button type="button"
                onClick={() => openMsg({ name: selectedMember.name, email: selectedMember.email, phone: selectedMember.phone }, 'email', '')}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-info text-on-info rounded-xl hover:opacity-90 motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95"
              >
                <Mail size={14} /> Email
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Member ID', value: selectedMember.membershipNumber ?? selectedMember.id },
              { label: 'Age', value: displayValue(selectedMember.age, '0') + ' yrs' },
              { label: 'Gender', value: displayValue(selectedMember.gender) },
              { label: 'Height', value: selectedMember.heightCm == null ? 'â€”' : `${displayValue(selectedMember.heightCm)} cm` },
              { label: 'Weight', value: selectedMember.weightKg == null ? 'â€”' : `${displayValue(selectedMember.weightKg)} kg` },
              { label: 'Join Date', value: displayValue(selectedMember.joinDate) },
              { label: 'Expiry Date', value: displayValue(selectedMember.expiryDate) },
              { label: 'Fitness Goal', value: displayValue(selectedMember.fitnessGoal) },
              { label: 'Address', value: displayValue(selectedMember.address) },
            ].map((f) => (
              <div key={f.label} className="bg-input rounded-lg p-3">
                <p className="text-xs text-secondary mb-0.5">{f.label}</p>
                <p className="text-sm font-semibold text-primary">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sub Tabs */}
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="flex border-b border-border overflow-x-auto custom-scrollbar">
            {PROFILE_TABS.map(({ id: t, label }) => (
              <button type="button"
                key={t}
                onClick={() => { setProfileTab(t as TrainerProfileTab); }}
                className={`whitespace-nowrap px-5 py-3.5 text-sm font-medium motion-safe:transition-all motion-safe:duration-base border-b-2 ${
                  profileTab === t
                    ? 'text-primary bg-primary-subtle border-primary'
                    : 'border-transparent text-secondary hover:text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-5 min-h-64">
            {profileTab === 'overview' && <TrainerMembersProfileOverview />}
            {profileTab === 'attendance' && <TrainerMembersProfileAttendance />}
            {profileTab === 'fitness' && <TrainerMembersProfileFitness />}
            {profileTab === 'assessment' && <TrainerMembersProfileAssessment />}
            {profileTab === 'progress' && <TrainerMembersProfileProgress />}
            {profileTab === 'workout' && <TrainerMembersProfileWorkout />}
            {profileTab === 'diet' && <TrainerMembersProfileDiet />}
            {profileTab === 'notes' && <TrainerMembersProfileNotes />}
          </div>
        </div>
      </div>
    </div>
  );
}


