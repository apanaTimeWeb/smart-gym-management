'use client';
// DATA FLOW: Route gymId → detail query/action hooks → route-level UI state → Gym Detail Main view.
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useSuperadminGymsGymDetail } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymDetail';
import { useSuperadminGymsGymDetailActions } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymDetailActions';
import { useState } from 'react';

// RESPONSIBILITY: Owns Gym Detail route orchestration without JSX, API calls in components, or derived UI calculations.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config';

import type { SuperadminGymsGymDetailViewTab } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsGymDetailMainTypes';
import type { SuperadminGymDetailStatus } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsGymDetailTypes';



/**
 * @description Orchestrates Gym Detail route state, selected tab, back navigation, and ghost-login action wiring.
 * @dependencies Uses the route gym identifier, detail query/actions, locale, and feature URL configuration.
 * @edge-case Ghost Login is never invoked without a loaded gym record; missing detail data leaves the user on a recoverable loading/error surface.
 */
export function useSuperadminGymsGymDetailMain(gymId: string) {
  const locale = useLocale();
  const router = useRouter();
  const query = useSuperadminGymsGymDetail(gymId);
  const gym = query.data?.data;
  const { startGhostLogin, isStartingGhostLogin } = useSuperadminGymsGymDetailActions();
  const [activeTab, setActiveTab] = useState<SuperadminGymsGymDetailViewTab>('overview');
  const status: SuperadminGymDetailStatus | undefined = gym?.status;
  const gymForGhostLogin = gym ? { id: gym.gymId, name: gym.gymName, plan: gym.plan, adminEmail: gym.adminEmail } : null;
  const goBackToGyms = () => router.push(MODULE_URLS.PAGES.MAIN);
  const handleGhostLogin = () => { if (gymForGhostLogin) return startGhostLogin(gymForGhostLogin); return Promise.resolve(); };
  return { locale, router, query, gym, status, activeTab, setActiveTab, isStartingGhostLogin, handleGhostLogin, goBackToGyms, billingRoute: MODULE_URLS.PAGES.BILLING_PLANS };
}
