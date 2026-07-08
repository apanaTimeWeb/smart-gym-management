"use client";

import { useState } from 'react';
import { useHrContext } from '../../hr_context/HrContext';
import { HR_TABS } from '../../hr_utils/HrSharedConstants';
import { RefreshCw, Plus } from 'lucide-react';
import StaffTable from '../StaffTable/StaffTable';
import PayrollTable from '../PayrollTable/PayrollTable';

export default function HrTabs() {
 const [activeTab, setActiveTab] = useState(HR_TABS[0]);
 const { loadAll, openAdd, loading } = useHrContext();

 return (
 <div className="rounded-xl shadow-sm border overflow-hidden hr-module" style={{ backgroundColor: 'var(--hr-bg-card)', borderColor: 'var(--hr-border)' }}>
 <div className="border-b flex justify-between items-center" style={{ borderColor: 'var(--hr-border)' }}>
 <div className="flex">
 {HR_TABS.map(t => (
 <button 
 key={t} 
 onClick={() => setActiveTab(t)}
 className={`px-5 py-3.5 text-sm font-medium transition-colors border-b-2 ${activeTab === t ? '' : 'border-transparent hover:opacity-80'}`}
 style={{
 color: activeTab === t ? 'var(--hr-highlight)' : 'var(--hr-text-secondary)',
 borderBottomColor: activeTab === t ? 'var(--hr-highlight)' : 'transparent',
 backgroundColor: activeTab === t ? 'var(--hr-highlight-subtle)' : 'transparent'
 }}
 >
 {t}
 </button>
 ))}
 </div>
 <div className="px-4 flex gap-2">
 <button 
 onClick={loadAll} 
 className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:opacity-80 transition-opacity"
 style={{ borderColor: 'var(--hr-border)', color: 'var(--hr-text-secondary)' }}
 >
 <RefreshCw size={14} />
 </button>
 {activeTab === 'Staff' && (
 <button 
 onClick={openAdd} 
 className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity" 
 style={{ backgroundColor: 'var(--hr-highlight)' }}
 >
 <Plus size={14} /> Add Staff
 </button>
 )}
 </div>
 </div>

 <div className="p-5">
 {loading ? (
 <div className="flex justify-center py-10">
 <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--hr-highlight)', borderTopColor: 'transparent' }} />
 </div>
 ) : activeTab === 'Staff' ? (
 <StaffTable />
 ) : (
 <PayrollTable />
 )}
 </div>
 </div>
 );
}
