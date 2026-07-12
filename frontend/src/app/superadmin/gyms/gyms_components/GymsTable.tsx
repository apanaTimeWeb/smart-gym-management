'use client';

import React from 'react';
import { CheckCircle2, Ban, LogIn, PlayCircle } from 'lucide-react';
import { useGymsContext } from '../gyms_context/GymsContext';
import GymActionDropdown from './GymActionDropdown';
import GymEditModal from './GymEditModal';
import GymEmailModal from './GymEmailModal';
import toast from 'react-hot-toast';

export default function GymsTable() {
  const { filteredGyms, loading, error, handleGhostLogin, handleSuspend, handleDelete, openEditModal, openEmailModal } = useGymsContext();

  if (loading) return <div className="p-8 text-center text-[var(--text-disabled)]">Loading...</div>;
  if (error) return <div className="p-8 text-center text-[var(--danger)]">Error loading data.</div>;

  const handleRowClick = (gymName: string) => {
    // This is where we would open a modal or redirect to details
    toast(`Opening details for ${gymName}`, { icon: 'ℹ️' });
  };

  const handleGhostLoginClick = (e: React.MouseEvent, gymId: string, gymName: string) => {
    e.stopPropagation();
    handleGhostLogin(gymId, gymName);
  };

  const handleSuspendClick = (e: React.MouseEvent, gymId: string, gymName: string, status: string) => {
    e.stopPropagation();
    handleSuspend(gymId, gymName, status);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[var(--bg-card)] border-b border-[var(--border)] text-[var(--text-secondary)] text-sm">
            <th className="p-4 font-medium">Gym Name</th>
            <th className="p-4 font-medium">Owner</th>
            <th className="p-4 font-medium">Plan</th>
            <th className="p-4 font-medium">Members</th>
            <th className="p-4 font-medium">MRR</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {filteredGyms.map(gym => (
            <tr 
              key={gym.id} 
              onClick={() => handleRowClick(gym.name)}
              className="hover:bg-[var(--bg-card)]/50 transition-colors group cursor-pointer"
            >
              <td className="p-4">
                <p className="font-semibold text-[var(--text-primary)]">{gym.name}</p>
                <p className="text-xs text-[var(--text-disabled)] mt-1">{gym.id}</p>
              </td>
              <td className="p-4">
                <p className="text-[var(--text-secondary)]">{gym.ownerName}</p>
                <p className="text-xs text-[var(--text-disabled)] mt-1">{gym.adminEmail}</p>
              </td>
              <td className="px-5 py-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold tracking-wide
                  ${
                    gym.plan?.toUpperCase() === 'ENTERPRISE' ? 'bg-[var(--purple-bg)] text-[var(--purple)] border border-[var(--purple)]' : 
                    gym.plan?.toUpperCase() === 'PRO' ? 'bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]' : 
                    gym.plan?.toUpperCase() === 'STARTER' || gym.plan?.toUpperCase() === 'BASIC' ? 'bg-[var(--success-bg)] text-[var(--success)] border border-[var(--success)]' :
                    'bg-[var(--bg-input)] text-[var(--text-secondary)] border border-[var(--border)]'
                  }
                `}>
                  {gym.plan?.toUpperCase() || 'UNKNOWN'}
                </span>
              </td>
              <td className="p-4 text-[var(--text-secondary)] font-medium">
                {gym.memberCount}
              </td>
              <td className="p-4 text-[var(--success)] font-medium">
                ${gym.monthlyRevenue}
              </td>
              <td className="p-4">
                {gym.status === 'ACTIVE' ? (
                  <span className="flex items-center gap-1 text-[var(--success)] text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Active
                  </span>
                ) : gym.status === 'SUSPENDED' ? (
                  <span className="flex items-center gap-1 text-[var(--danger)] text-sm font-medium">
                    <Ban className="w-4 h-4" /> Suspended
                  </span>
                ) : (
                  <span className="text-[var(--text-secondary)] text-sm font-medium">{gym.status}</span>
                )}
              </td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => handleGhostLoginClick(e, gym.id, gym.name)}
                    className="p-2 text-[var(--primary)] hover:bg-[var(--primary-subtle)] rounded-lg transition-colors"
                    title="Ghost Login (Login As Admin)"
                  >
                    <LogIn className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => handleSuspendClick(e, gym.id, gym.name, gym.status)}
                    className={`p-2 rounded-lg transition-colors ${
                      gym.status === 'SUSPENDED' 
                        ? 'text-[var(--success)] hover:bg-[var(--success)]/10' 
                        : 'text-[var(--danger)] hover:bg-[var(--danger)]/10'
                    }`}
                    title={gym.status === 'SUSPENDED' ? "Activate Tenant" : "Suspend Tenant"}
                  >
                    {gym.status === 'SUSPENDED' ? <PlayCircle className="w-5 h-5" /> : <Ban className="w-5 h-5" />}
                  </button>
                  <GymActionDropdown 
                    gymName={gym.name} 
                    onEdit={() => openEditModal(gym)}
                    onEmail={() => openEmailModal(gym)}
                    onDelete={() => handleDelete(gym.id, gym.name)}
                  />
                </div>
              </td>
            </tr>
          ))}
          
          {filteredGyms.length === 0 && (
            <tr>
              <td colSpan={7} className="p-8 text-center text-[var(--text-disabled)]">
                No gyms found matching your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <GymEditModal />
      <GymEmailModal />
    </div>
  );
}
