/**
 * RESPONSIBILITY: Manages the logic for the Gyms search toolbar, including search debouncing.
 * DATA FLOW: SuperadminGymsToolbar -> useSuperadminGymsToolbar -> useSuperadminGymsStore -> API
 */

import toast from 'react-hot-toast';
import { useSuperadminGymsStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymsStore';
import { gymsApi } from '@/app/superadmin/gyms/superadmin_gyms_api/superadmin_gyms_api';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';

export function useSuperadminGymsToolbar() {
  const { getParam, setParam } = useSuperadminUrlState();
  const search = getParam('search', '');
  const statusFilter = getParam('statusFilter', 'All');
  const planFilter = getParam('planFilter', 'All');

  const handleSearchChange = (value: string) => setParam('search', value);
  const setStatusFilter = (value: string) => setParam('statusFilter', value);
  const setPlanFilter = (value: string) => setParam('planFilter', value);

  const viewMode = useSuperadminGymsStore(state => state.viewMode);
  const setViewMode = useSuperadminGymsStore(state => state.setViewMode);

  const handleExportGyms = async () => {
    toast.loading('Exporting gyms...', { id: 'gyms-export' });
    try {
      const res = await gymsApi.exportGymsCSV();
      if (res.data?.downloadUrl) {
        window.open(res.data.downloadUrl, '_blank');
        toast.success('Export ready.', { id: 'gyms-export' });
      } else {
        toast.error(res.message || 'Export URL not found.', { id: 'gyms-export' });
      }
    } catch {
      toast.error('Failed to export gyms.', { id: 'gyms-export' });
    }
  };

  return {
    search,
    handleSearchChange,
    statusFilter,
    setStatusFilter,
    planFilter,
    setPlanFilter,
    viewMode,
    setViewMode,
    handleExportGyms,
  };
}
