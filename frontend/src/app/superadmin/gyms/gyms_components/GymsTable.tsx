'use client';

import React from 'react';
import { CheckCircle2, Ban, LogIn, PlayCircle, Edit2, Mail, Trash2 } from 'lucide-react';
import { useGymsContext } from '../gyms_context/GymsContext';
import GymEditModal from './GymEditModal';
import GymEmailModal from './GymEmailModal';
import toast from 'react-hot-toast';

export default function GymsTable() {
  const { filteredGyms, loading, error, handleGhostLogin, handleSuspend, handleDelete, openEditModal, openEmailModal } = useGymsContext();

  if (loading) return <div className="p-8 text-center text-disabled">Loading...</div>;
  if (error) return <div className="p-8 text-center text-destructive">Error loading data.</div>;

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
          <tr className="bg-card border-b border-border text-secondary text-sm">
            <th className="p-4 font-medium">Gym Name</th>
            <th className="p-4 font-medium">Owner</th>
            <th className="p-4 font-medium">Plan</th>
            <th className="p-4 font-medium">Members</th>
            <th className="p-4 font-medium">MRR</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {filteredGyms.map(gym => (
            <tr 
              key={gym.id} 
              onClick={() => handleRowClick(gym.name)}
              className="hover:bg-card/50 transition-colors group cursor-pointer"
            >
              <td className="p-4">
                <p className="font-semibold text-foreground">{gym.name}</p>
                <p className="text-xs text-disabled mt-1">{gym.id}</p>
              </td>
              <td className="p-4">
                <p className="text-secondary">{gym.ownerName}</p>
                <p className="text-xs text-disabled mt-1">{gym.adminEmail}</p>
              </td>
              <td className="px-5 py-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold tracking-wide
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
              <td className="p-4 text-secondary font-medium">
                {gym.memberCount}
              </td>
              <td className="p-4 text-success font-medium">
                ${gym.monthlyRevenue}
              </td>
              <td className="p-4">
                {gym.status === 'ACTIVE' ? (
                  <span className="flex items-center gap-1 text-success text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Active
                  </span>
                ) : gym.status === 'SUSPENDED' ? (
                  <span className="flex items-center gap-1 text-destructive text-sm font-medium">
                    <Ban className="w-4 h-4" /> Suspended
                  </span>
                ) : (
                  <span className="text-secondary text-sm font-medium">{gym.status}</span>
                )}
              </td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => handleGhostLoginClick(e, gym.id, gym.name)}
                    className="p-2 text-primary hover:bg-primary-subtle rounded-lg transition-colors"
                    title="Ghost Login (Login As Admin)"
                  >
                    <LogIn className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => handleSuspendClick(e, gym.id, gym.name, gym.status)}
                    className={`p-2 rounded-lg transition-colors ${
                      gym.status === 'SUSPENDED' 
                        ? 'text-success hover:bg-success/10' 
                        : 'text-destructive hover:bg-destructive/10'
                    }`}
                    title={gym.status === 'SUSPENDED' ? "Activate Tenant" : "Suspend Tenant"}
                  >
                    {gym.status === 'SUSPENDED' ? <PlayCircle className="w-5 h-5" /> : <Ban className="w-5 h-5" />}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); openEmailModal(gym); }}
                    className="p-2 text-secondary hover:bg-info-bg hover:text-info rounded-lg transition-colors"
                    title="Email Owner"
                  >
                    <Mail className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); openEditModal(gym); }}
                    className="p-2 text-secondary hover:bg-primary-subtle hover:text-primary rounded-lg transition-colors"
                    title="Edit Gym"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(gym.id, gym.name); }}
                    className="p-2 text-secondary hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
                    title="Delete Gym"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          
          {filteredGyms.length === 0 && (
            <tr>
              <td colSpan={7} className="p-8 text-center text-disabled">
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
