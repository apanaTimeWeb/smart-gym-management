/**
 * RESPONSIBILITY: Manages the logic for the Gyms search toolbar, including search debouncing.
 * DATA FLOW: SuperadminGymsToolbar -> useSuperadminGymsToolbar -> useSuperadminGymsStore -> API
 */

import toast from 'react-hot-toast';
import { useSuperadminGymsStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymsStore';
import { gymsApi } from '@/app/superadmin/gyms/superadmin_gyms_api/superadmin_gyms_api';

export function useSuperadminGymsToolbar() {
  const search = useSuperadminGymsStore(state => state.search);
  const setSearch = useSuperadminGymsStore(state => state.setSearch);
  const statusFilter = useSuperadminGymsStore(state => state.statusFilter);
  const setStatusFilter = useSuperadminGymsStore(state => state.setStatusFilter);
  const planFilter = useSuperadminGymsStore(state => state.planFilter);
  const setPlanFilter = useSuperadminGymsStore(state => state.setPlanFilter);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

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
    handleExportGyms,
  };
}
