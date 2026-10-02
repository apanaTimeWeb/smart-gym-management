'use client';
// DATA FLOW: URL state → useSuperadminGlobalAuditData → Main view; export uses feature-owned mutation.
// RESPONSIBILITY: Owns Global Audit route-level state, filter option derivation, pagination, and export lifecycle.
import { useUrlState } from '@/hooks/useUrlState';

import { SUPERADMIN_AUDIT_ACTOR_OPTIONS, SUPERADMIN_AUDIT_PAGE_SIZE, SUPERADMIN_AUDIT_SEVERITY_OPTIONS, SUPERADMIN_AUDIT_FILTER_ALL } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_constants/SuperadminGlobalAuditConstants';
import { useSuperadminGlobalAuditData } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_hooks/useSuperadminGlobalAuditData';
import { useSuperadminGlobalAuditExportMutation } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_hooks/useSuperadminGlobalAuditExportMutation';

import type { AuditActorFilter, AuditSeverityFilter } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_types/SuperadminGlobalAuditFilterTypes';



/**
 * @description Coordinates Global Audit URL filters, pagination, query data, and export controls for the route main view.
 * @dependencies Composes the Global Audit data hook, URL state helpers, and export mutation.
 * @edge-case Page changes always flow back through URL state so refresh/back navigation does not lose the current audit view.
 */
export function useSuperadminGlobalAuditMain() {
  const { getParam, setParam } = useUrlState();
  const search = getParam('search', '');
  const severityFilter = getParam('severityFilter', SUPERADMIN_AUDIT_FILTER_ALL) as AuditSeverityFilter;
  const actorTypeFilter = getParam('actorTypeFilter', SUPERADMIN_AUDIT_FILTER_ALL) as AuditActorFilter;
  const currentPage = Math.max(1, Number(getParam('page', '1')) || 1);
  const query = useSuperadminGlobalAuditData(search, severityFilter, actorTypeFilter, currentPage, SUPERADMIN_AUDIT_PAGE_SIZE);
  const { requestExport, isRequesting: isExporting } = useSuperadminGlobalAuditExportMutation();
  const setSearch = (value: string) => { setParam('search', value); setParam('page', '1'); };
  const setSeverityFilter = (value: AuditSeverityFilter) => { setParam('severityFilter', value); setParam('page', '1'); };
  const setActorTypeFilter = (value: AuditActorFilter) => { setParam('actorTypeFilter', value); setParam('page', '1'); };
  const setCurrentPage = (value: number) => setParam('page', String(value));
  return {
    search, severityFilter, actorTypeFilter, currentPage,
    severityOptions: SUPERADMIN_AUDIT_SEVERITY_OPTIONS.map((value) => ({ value, label: value === SUPERADMIN_AUDIT_FILTER_ALL ? 'All Severities' : value.charAt(0) + value.slice(1).toLowerCase() })),
    actorTypeOptions: SUPERADMIN_AUDIT_ACTOR_OPTIONS.map((value) => ({ value, label: value === SUPERADMIN_AUDIT_FILTER_ALL ? 'All Actors' : value === 'SUPERADMIN' ? 'Superadmin' : value === 'SYSTEM' ? 'System' : 'Gym' })),
    setSearch, setSeverityFilter, setActorTypeFilter, setCurrentPage,
    logs: query.logs, totalPages: query.totalPages, isPending: query.isPending, isFetching: query.isFetching, queryError: query.error, refetch: query.refetch,
    requestExport, isExporting,
  };
}
