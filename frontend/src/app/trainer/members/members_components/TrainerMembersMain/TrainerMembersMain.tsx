'use client';
// RESPONSIBILITY: Minimal Members route composition boundary. It delegates the complete view to the feature-owned content component.
import TrainerMembersContent from '@/app/trainer/members/members_components/TrainerMembersContent/TrainerMembersContent';

export default function TrainerMembersMain() {
  return <TrainerMembersContent />;
}
