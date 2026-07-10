'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, MoreVertical, LogIn, Ban, CheckCircle2 } from 'lucide-react';
import { DUMMY_TENANTS } from '@/app/(saas)/superadmin_utils/SuperadminSharedConstants';
import { SuperadminUrlConfig } from '@/app/(saas)/superadmin_url_config';
import toast from 'react-hot-toast';

export default function GymsList() {
  const [search, setSearch] = useState('');
  
  const filteredGyms = DUMMY_TENANTS.filter(g => 
    g.name.toLowerCase().includes(search.toLowerCase()) || 
    g.ownerName.toLowerCase().includes(search.toLowerCase())
  );

  const handleGhostLogin = (gymName: string) => {
    toast.success(`Ghost login initiated for ${gymName}. Redirecting to ERP...`);
  };

  const handleSuspend = (gymName: string) => {
    toast.error(`${gymName} has been suspended.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Tenants (Gyms)</h1>
          <p className="text-gray-400 mt-1">Manage your SaaS clients, subscriptions, and access.</p>
        </div>
        <Link 
          href={SuperadminUrlConfig.PAGES.GYM_ADD}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-5 h-5" />
          Onboard New Gym
        </Link>
      </div>

      <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-800 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search gyms by name or owner..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-gray-100 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900 border-b border-gray-800 text-gray-400 text-sm">
                <th className="p-4 font-medium">Gym Name</th>
                <th className="p-4 font-medium">Owner</th>
                <th className="p-4 font-medium">Plan</th>
                <th className="p-4 font-medium">Members</th>
                <th className="p-4 font-medium">MRR</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredGyms.map(gym => (
                <tr key={gym.id} className="hover:bg-gray-900/50 transition-colors group">
                  <td className="p-4">
                    <p className="font-semibold text-gray-100">{gym.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{gym.id}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-300">{gym.ownerName}</p>
                    <p className="text-xs text-gray-500 mt-1">{gym.adminEmail}</p>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      gym.plan === 'ENTERPRISE' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                      gym.plan === 'PRO' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                      'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                    }`}>
                      {gym.plan}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300 font-medium">
                    {gym.memberCount}
                  </td>
                  <td className="p-4 text-emerald-400 font-medium">
                    ${gym.monthlyRevenue}
                  </td>
                  <td className="p-4">
                    {gym.status === 'ACTIVE' ? (
                      <span className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4" /> Active
                      </span>
                    ) : gym.status === 'SUSPENDED' ? (
                      <span className="flex items-center gap-1 text-red-400 text-sm font-medium">
                        <Ban className="w-4 h-4" /> Suspended
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm font-medium">{gym.status}</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleGhostLogin(gym.name)}
                        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Ghost Login (Login As Admin)"
                      >
                        <LogIn className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleSuspend(gym.name)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Suspend Tenant"
                      >
                        <Ban className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredGyms.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    No gyms found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
