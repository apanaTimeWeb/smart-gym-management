// RESPONSIBILITY: Renders the active settings section content based on the selected nav tab.
'use client';

import { RefreshCw, Save, Settings } from 'lucide-react';
import { useSettingsContext } from '@/app/manager/settings/settings_context/SettingsContext';

export default function SettingsContent() {
 const { 
 activeTab, 
 form, handleChange, 
 saving, handleSave, fetchSettings 
 } = useSettingsContext();

 return (
 <div className="bg-card rounded-xl shadow-sm border border-border mt-6">
 <div className="px-6 py-4 border-b border-border flex items-center justify-between">
 <h2 className="font-bold text-foreground text-lg">{activeTab}</h2>
 <div className="flex gap-2">
 <button 
 onClick={fetchSettings} 
 className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary flex items-center gap-2 transition-colors"
 >
 <RefreshCw size={14} /> Reset
 </button>
 <button 
 onClick={handleSave} 
 disabled={saving} 
 className="px-4 py-2 text-sm text-white rounded-lg font-medium flex items-center gap-2 disabled:opacity-70 transition-colors" 
 style={{ background: 'var(--settings-highlight)' }}
 >
 <Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}
 </button>
 </div>
 </div>
 
 <div className="p-6">
 {activeTab === 'Gym Profile' && (
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
 {[
 { label: 'Gym Name', field: 'gymName' },
 { label: 'Owner Name', field: 'ownerName' },
 { label: 'Phone Number', field: 'phone' },
 { label: 'Email', field: 'email' },
 { label: 'City', field: 'city' },
 { label: 'GST Number', field: 'gstNumber' },
 ].map((f, i) => (
 <div key={i}>
 <label className="block text-sm font-medium text-secondary mb-1">{f.label}</label>
 <input 
 type="text" 
 value={(form as any)[f.field] || ''} 
 onChange={(e) => handleChange(f.field, e.target.value)}
 className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-warning bg-input text-foreground" 
 />
 </div>
 ))}
 </div>
 )}

 {activeTab !== 'Gym Profile' && (
 <div className="text-center py-10 text-secondary">
 <Settings size={48} className="mx-auto mb-3 opacity-30" />
 <p>Settings for <strong>{activeTab}</strong> are currently under development.</p>
 </div>
 )}
 </div>
 </div>
 );
}
