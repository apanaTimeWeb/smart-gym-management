// RESPONSIBILITY: Renders the Manager Members entity-specific empty state and selects search/filter messaging for the owning table.
'use client';
import { Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerEmptyState from '@/components/ui/manager_empty_state/ManagerEmptyState';
import { MANAGER_MEMBERS_STATUS_VALUES } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersConstants';
import { useManagerMembersLogic } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersLogic';

/** @description Empty-state presentation for the Members entity list, including filtered-versus-unfiltered copy. */
/**
 * @description Renders ManagerMembersEmptyState, the manager members UI responsibility owned by this module.
 * @dependencies Consumes module-owned hooks/state and approved zero-business UI primitives; no business behavior is delegated to global components.
 * @edge-case Handles the documented loading, empty, error, disabled, keyboard, responsive, and recovery states without introducing cross-feature ownership.
 */
export default function ManagerMembersEmptyState() {
  const t = useTranslations('MANAGER_MEMBERS');
  const { search, statusFilter } = useManagerMembersLogic();
  const filtered = Boolean(search || statusFilter !== MANAGER_MEMBERS_STATUS_VALUES.ALL_STATUS_FILTER);
  return (
    <ManagerEmptyState
      dataTestId="manager_members-members-empty-state"
      icon={<Users size={18} strokeWidth={2} />}
      title={filtered ? t('COPY_NO_MEMBERS_FOUND') : t('COPY_NO_MEMBERS_YET')}
      subtitle={filtered ? t('COPY_TRY_ADJUSTING_FILTERS') : t('COPY_ADD_FIRST_MEMBER_GET_STARTED')}
    />
  );
}
