// RESPONSIBILITY: Server component that handles initial SSR data fetching for the members module.
import MembersMain from '@/app/erp/members/members_components/MembersMain/MembersMain';
import { ssrMembersApi, ssrPlansApi } from '@/lib/server-api';
import { MembersInitialData } from '@/app/erp/members/members_types/members_types';

export default async function MembersPage() {
  let initialData: MembersInitialData | null = null;
  
  try {
    const [membersRes, plansRes, statsRes] = await Promise.all([
      ssrMembersApi.getAll({ limit: '10', page: '1' }),
      ssrPlansApi.getAll(),
      ssrMembersApi.getStats(),
    ]);
    initialData = {
      members: membersRes.data.members || [],
      totalMembers: membersRes.data.total || 0,
      plans: plansRes.data || [],
      stats: statsRes.data || { total: 0, active: 0, pending: 0, expired: 0 }
    };
  } catch (e) {
    // console.error('Failed to fetch members initial data:', e);
  }

  return <MembersMain initialData={initialData} />;
}
