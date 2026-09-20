// RESPONSIBILITY: Entry point component for the members module that sets up hook-based state facades and layout.
'use client';
import { ManagerMembersContent } from '@/app/manager/members/members_components/ManagerMembersMain/ManagerMembersContent/ManagerMembersContent';
import type { MembersInitialData } from '@/app/manager/members/members_types/ManagerMembersTypes';

export default function ManagerMembersMain({ initialData }: { initialData?: MembersInitialData | null }) {
  return <ManagerMembersContent />;
}
