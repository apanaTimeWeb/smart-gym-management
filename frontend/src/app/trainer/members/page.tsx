// RESPONSIBILITY: Server component that handles initial SSR data fetching for the members module.
import TrainerMembersMain from '@/app/trainer/members/members_components/TrainerMembersMain/TrainerMembersMain';
import { ssrMembersApi } from '@/app/trainer/members/members_api/members_server_api';
import type { MembersInitialData } from '@/app/trainer/members/members_types/members_types';

export default async function MembersPage() {
  let initialData: MembersInitialData = {
    members: [],
    totalMembers: 0,
    stats: { total: 0, active: 0, pending: 0, expired: 0 }
  };
  
  try {
    const [membersRes, statsRes] = await Promise.all([
      ssrMembersApi.getAll({ limit: '10', page: '1' }),
      ssrMembersApi.getStats(),
    ]);
    initialData = {
      members: membersRes.data.members || [],
      totalMembers: membersRes.data.total || 0,
      stats: statsRes.data || { total: 0, active: 0, pending: 0, expired: 0 }
    };
  } catch (e: unknown) {
    console.error('[MembersPage SSR] Failed to fetch initial data:', e);
  }

  return <TrainerMembersMain initialData={initialData} />;
}
