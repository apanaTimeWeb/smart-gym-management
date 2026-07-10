'use client';

import { useState } from 'react';
import { Database, ShieldAlert, Activity, Filter, RefreshCcw, Search } from 'lucide-react';
import { DUMMY_TENANTS, DUMMY_AUDIT_LOGS } from '@/app/saas/superadmin_utils/SuperadminSharedConstants';

export default function SystemHealthPage() {
  const [logSearch, setLogSearch] = useState('');
  
  const filteredLogs = DUMMY_AUDIT_LOGS.filter(log => 
    log.tenantName.toLowerCase().includes(logSearch.toLowerCase()) || 
    log.action.toLowerCase().includes(logSearch.toLowerCase()) ||
    log.actorEmail.toLowerCase().includes(logSearch.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">System & Audit</h1>
        <p className="text-gray-400 mt-1">Global database migration health and cross-tenant audit logs.</p>
      </div>

      {/* Database Migration Health */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-bold text-gray-100">Migration Health</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUMMY_TENANTS.map(tenant => {
            const isOutdated = tenant.databaseVersion !== 'v2.4.1';
            return (
              <div key={tenant.id} className={`border rounded-xl p-6 ${isOutdated ? 'bg-orange-500/5 border-orange-500/20' : 'bg-gray-950 border-gray-800'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-100">{tenant.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">DB: gym_{tenant.id.replace('-', '_')}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-mono font-medium ${isOutdated ? 'bg-orange-500/20 text-orange-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    {tenant.databaseVersion}
                  </span>
                </div>
                
                {isOutdated ? (
                  <button className="w-full flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                    <RefreshCcw className="w-4 h-4" /> Run Migrations
                  </button>
                ) : (
                  <button disabled className="w-full flex justify-center items-center gap-2 bg-gray-800 text-gray-500 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                    <Activity className="w-4 h-4" /> Fully Synced
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Master Audit Log */}
      <div className="pt-8 border-t border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-gray-100">Global Audit Log</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search logs..." 
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-gray-100 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button className="p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 hover:text-gray-100 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900 border-b border-gray-800 text-gray-400 text-sm">
                <th className="p-4 font-medium">Timestamp</th>
                <th className="p-4 font-medium">Tenant</th>
                <th className="p-4 font-medium">Actor</th>
                <th className="p-4 font-medium">Action</th>
                <th className="p-4 font-medium">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-gray-900/50 transition-colors text-sm">
                  <td className="p-4 text-gray-400 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="p-4 text-indigo-400 font-medium">
                    {log.tenantName}
                  </td>
                  <td className="p-4">
                    <p className="text-gray-200">{log.actorEmail}</p>
                    <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded mt-1 inline-block">{log.actorRole}</span>
                  </td>
                  <td className="p-4 font-mono text-xs text-orange-300">
                    {log.action}
                  </td>
                  <td className="p-4 text-gray-400 max-w-md truncate" title={log.details}>
                    {log.details}
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No logs found.
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

