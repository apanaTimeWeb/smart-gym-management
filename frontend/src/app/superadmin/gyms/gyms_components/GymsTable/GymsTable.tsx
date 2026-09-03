'use client';
// RESPONSIBILITY: Renders the table view of Gym tenants. Purely a view component that consumes useGymsTable hook.

import { useState } from 'react';
import { CheckCircle2, Ban, LogIn, PlayCircle, Edit2, Mail, Trash2, Loader2 } from 'lucide-react';
import { useGymsTable } from '@/app/superadmin/gyms/gyms_components/GymsTable/useGymsTable';
import GymEditModal from '@/app/superadmin/gyms/gyms_components/GymEditModal/GymEditModal';
import GymEmailModal from '@/app/superadmin/gyms/gyms_components/GymEmailModal/GymEmailModal';
import GymDeleteModal from '@/app/superadmin/gyms/gyms_components/GymDeleteModal/GymDeleteModal';
import GymsEmptyState from '@/app/superadmin/gyms/gyms_components/GymsEmptyState/GymsEmptyState';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';
import { GYMS_TABLE_PAGE_SIZE } from '@/app/superadmin/gyms/gyms_utils/GymsConstants';

export default function GymsTable() {
  const {
    filteredGyms,
    fetchState,
    actionLoadingId,
    handleRowClick,
    onGhostLoginClick,
    onSuspendClick,
    onDeleteClick,
    openEditModal,
    openEmailModal
  } = useGymsTable();

  const [currentPage, setCurrentPage] = useState(1);

  if (fetchState === 'loading') {
    return (
      <div className="p-4 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-card motion-safe:animate-pulse rounded-lg border border-border" />
        ))}
      </div>
    );
  }

  if (fetchState === 'error') {
    return <div className="p-8 text-center text-danger">Error loading gyms. Please try again.</div>;
  }

  const totalPages = Math.ceil(filteredGyms.length / GYMS_TABLE_PAGE_SIZE) || 1;
  const paginatedGyms = filteredGyms.slice((currentPage - 1) * GYMS_TABLE_PAGE_SIZE, currentPage * GYMS_TABLE_PAGE_SIZE);

  return (
    <div className="overflow-x-auto flex flex-col min-h-[400px]">
      <table className="w-full text-left border-collapse flex-1">
        <thead>
          <tr className="bg-primary/10 border-b border-border text-secondary text-sm">
            <th className="p-4 font-semibold uppercase text-xs tracking-wider w-48">Gym Name</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider min-w-40">Owner</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider w-32">Plan</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider text-right w-24">Members</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider text-right w-32">MRR</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider text-center w-32">Status</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider text-right w-40">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {paginatedGyms.map(gym => {
            const isActionLoading = actionLoadingId === gym.id;
            
            return (
              <tr 
                key={gym.id} 
                onClick={() => handleRowClick(gym)}
                className="hover:bg-card/50 transition-all duration-200 ease-in-out group cursor-pointer"
              >
                <td className="p-4 max-w-48">
                  <p className="font-semibold text-foreground truncate" title={gym.name}>{gym.name}</p>
                  <p className="text-xs text-disabled mt-1 truncate" title={gym.id}>{gym.id}</p>
                </td>
                <td className="p-4 max-w-40">
                  <p className="text-secondary truncate" title={gym.ownerName}>{gym.ownerName}</p>
                  <p className="text-xs text-disabled mt-1 truncate" title={gym.adminEmail}>{gym.adminEmail}</p>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide
                    ${
                      gym.plan?.toUpperCase() === 'ENTERPRISE' ? 'bg-purple-bg text-purple border border-purple' : 
                      gym.plan?.toUpperCase() === 'PRO' ? 'bg-primary-subtle text-primary border border-primary' : 
                      gym.plan?.toUpperCase() === 'STARTER' || gym.plan?.toUpperCase() === 'BASIC' ? 'bg-success-bg text-success border border-success' :
                      'bg-input text-secondary border border-border'
                    }
                  `}>
                    {gym.plan?.toUpperCase() || 'UNKNOWN'}
                  </span>
                </td>
                <td className="p-4 text-secondary font-medium text-right">
                  {gym.memberCount}
                </td>
                <td className="p-4 text-success font-medium text-right">
                  ${gym.monthlyRevenue}
                </td>
                <td className="p-4">
                  <div className="flex justify-center">
                    {gym.status === 'ACTIVE' ? (
                      <span className="flex items-center gap-1 text-success text-xs font-semibold bg-success-bg px-2.5 py-1 rounded-full border border-success/20">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    ) : gym.status === 'SUSPENDED' ? (
                      <span className="flex items-center gap-1 text-danger text-xs font-semibold bg-danger-bg px-2.5 py-1 rounded-full border border-destructive/20">
                        <Ban className="w-3 h-3" /> Suspended
                      </span>
                    ) : (
                      <span className="text-secondary text-xs font-semibold bg-input px-2.5 py-1 rounded-full border border-border">{gym.status}</span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    {isActionLoading ? (
                      <div className="p-2 text-primary">
                        <Loader2 className="w-4 h-4 motion-safe:animate-spin" />
                      </div>
                    ) : (
                      <>
                        <button 
                          onClick={(e) => onGhostLoginClick(e, gym.id, gym.name)}
                          className="p-1.5 text-primary hover:bg-primary-subtle rounded-lg transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page"
                          title="Ghost Login (Login As Admin)"
                          aria-label={`Ghost Login to ${gym.name}`}
                        >
                          <LogIn className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => onSuspendClick(e, gym.id, gym.name, gym.status)}
                          className={`p-1.5 rounded-lg transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page ${
                            gym.status === 'SUSPENDED' 
                              ? 'text-success hover:bg-success/10' 
                              : 'text-danger hover:bg-danger-bg/10'
                          }`}
                          title={gym.status === 'SUSPENDED' ? 'Activate Tenant' : 'Suspend Tenant'}
                          aria-label={gym.status === 'SUSPENDED' ? `Activate ${gym.name}` : `Suspend ${gym.name}`}
                        >
                          {gym.status === 'SUSPENDED' ? <PlayCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); openEmailModal(gym); }}
                          className="p-1.5 text-secondary hover:bg-info-bg hover:text-info rounded-lg transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page"
                          title="Email Owner"
                          aria-label={`Email owner of ${gym.name}`}
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); openEditModal(gym); }}
                          className="p-1.5 text-secondary hover:bg-primary-subtle hover:text-primary rounded-lg transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page"
                          title="Edit Gym"
                          aria-label={`Edit ${gym.name}`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => onDeleteClick(e, gym)}
                          className="p-1.5 text-secondary hover:bg-danger-bg/10 hover:text-danger rounded-lg transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page"
                          title="Delete Gym"
                          aria-label={`Delete ${gym.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
          
          {filteredGyms.length === 0 && (
            <tr>
              <td colSpan={7}><GymsEmptyState /></td>
            </tr>
          )}
        </tbody>
      </table>
      
      <SuperadminPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      
      <GymEditModal />
      <GymEmailModal />
      <GymDeleteModal />
    </div>
  );
}
