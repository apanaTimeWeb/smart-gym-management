"use client";
// RESPONSIBILITY: Owns the Members list/profile switch and the member-directed messaging modal; data/state remains in module queries and Zustand.
import TrainerMembersKPIs from '@/app/frontend_trainer/trainer_members/trainer_members_components/trainer_members_kpis/TrainerMembersKPIs';

import TrainerMembersMessageModal from '@/app/frontend_trainer/trainer_members/trainer_members_components/trainer_members_message_modal/TrainerMembersMessageModal';

import TrainerMembersProfile from '@/app/frontend_trainer/trainer_members/trainer_members_components/trainer_members_profile/TrainerMembersProfile';

import TrainerMembersTable from '@/app/frontend_trainer/trainer_members/trainer_members_components/trainer_members_table/TrainerMembersTable';

import TrainerMembersToolbar from '@/app/frontend_trainer/trainer_members/trainer_members_components/trainer_members_toolbar/TrainerMembersToolbar';

import { useTrainerMembersSelectedMember } from '@/app/frontend_trainer/trainer_members/trainer_members_hooks/useTrainerMembersSelectedMember';

import { useTrainerMembersStore } from '@/app/frontend_trainer/trainer_members/trainer_members_store/useTrainerMembersStore';









/**
 * @description Owns the Members list/profile switch and the member-directed messaging modal; data/state remains in module queries and Zustand.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the members feature UI responsibility represented by TrainerMembersContent, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerMembersContent() {
  const msgModal = useTrainerMembersStore((state) => state.msgModal);
  const closeMsg = useTrainerMembersStore((state) => state.closeMsg);
  const { member: selectedMember } = useTrainerMembersSelectedMember();

  return (
    <div className="min-h-full pb-10 print-hide">
      {!selectedMember ? (
        <div className="p-6 space-y-5">
          <TrainerMembersKPIs />
          <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
            <TrainerMembersToolbar />
            <TrainerMembersTable />
          </div>
        </div>
      ) : (
        <TrainerMembersProfile />
      )}

      {msgModal?.open && (
        <TrainerMembersMessageModal
          open={msgModal.open}
          type={msgModal.type}
          recipient={msgModal.recipient}
          message={msgModal.message}
          onClose={closeMsg}
          onSuccess={closeMsg}/>
      )}
    </div>
  );
}
