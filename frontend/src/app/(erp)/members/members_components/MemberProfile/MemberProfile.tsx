"use client";

import { Edit, MessageCircle, Mail } from 'lucide-react';
import ErpHeader from '@/app/(erp)/erp_components/ErpLayout/ErpHeader';
import { useMembersContext } from '@/app/(erp)/members/members_context/MembersContext';
import { MEMBERS_STATUS_COLORS, MEMBERS_CYCLE_LABELS, formatCurrency } from '@/app/(erp)/members/members_utils/MembersSharedConstants';
import ProfileOverview from '@/app/(erp)/members/members_components/MemberProfile/ProfileOverview';
import ProfileAttendance from '@/app/(erp)/members/members_components/MemberProfile/ProfileAttendance';
import ProfilePayments from '@/app/(erp)/members/members_components/MemberProfile/ProfilePayments';

export default function MemberProfile() {
 const { selectedMember, setSelectedMember, profileTab, setProfileTab, loadMemberProfile, openEdit, openMsg } = useMembersContext();

 if (!selectedMember) return null;

 return (
 <div className="min-h-full">
 <ErpHeader title="Member Profile" subtitle={`Viewing profile of ${selectedMember.name}`} />
 <div className="p-6 space-y-5">
 <button 
 onClick={() => setSelectedMember(null)} 
 className="text-sm text-[var(--members-text-secondary)] hover:text-[var(--members-text-primary)] flex items-center gap-1.5 transition-colors"
 >
 ← Back to Members
 </button>

 {/* Profile Card */}
 <div className="bg-[var(--members-bg-card)] rounded-xl shadow-sm border border-[var(--members-border)] p-6">
 <div className="flex flex-wrap items-center justify-between gap-5 mb-6">
 <div className="flex items-center gap-5">
 <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-[var(--members-highlight)]" style={{ background: 'var(--members-highlight-subtle)' }}>
 {selectedMember.name.charAt(0)}
 </div>
 <div>
 <h2 className="text-xl font-bold text-[var(--members-text-primary)]">{selectedMember.name}</h2>
 <p className="text-[var(--members-text-secondary)] text-sm">{selectedMember.email} · {selectedMember.phone}</p>
 <div className="flex gap-2 mt-2">
 <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: MEMBERS_STATUS_COLORS[selectedMember.status]?.split(' ')[0] || '#f3f4f6', color: MEMBERS_STATUS_COLORS[selectedMember.status]?.split(' ')[1] || '#374151' }}>
 {selectedMember.status}
 </span>
 <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--info-bg)] text-[var(--info)] dark:bg-[var(--info-bg)] dark:text-[var(--info)]">
 {selectedMember.plan?.name || ''}
 </span>
 <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
 {MEMBERS_CYCLE_LABELS[selectedMember.billingCycle] || selectedMember.billingCycle}
 </span>
 </div>
 </div>
 </div>
 <div className="flex gap-2 flex-wrap">
 <button 
 onClick={() => openEdit(selectedMember)} 
 className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-[var(--members-border)] rounded-xl hover:bg-[var(--members-hover-bg)] text-[var(--members-text-primary)] transition-colors"
 >
 <Edit size={14} /> Edit
 </button>
 <button 
 onClick={() => openMsg(selectedMember, 'whatsapp')} 
 className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-opacity hover:opacity-90" 
 style={{ background: '#25D366' }}
 >
 <MessageCircle size={14} /> WhatsApp
 </button>
 <button 
 onClick={() => openMsg(selectedMember, 'email')} 
 className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-opacity hover:opacity-90" 
 style={{ background: 'hsl(217 91% 60%)' }}
 >
 <Mail size={14} /> Email
 </button>
 </div>
 </div>

 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {[
 { label: 'Member ID', value: `GS${String(selectedMember.id).padStart(4, '0')}` },
 { label: 'Branch', value: selectedMember.branch },
 { label: 'Gender', value: selectedMember.gender },
 { label: 'Join Date', value: new Date(selectedMember.joinDate).toLocaleDateString('en-IN') },
 { label: 'Expiry Date', value: new Date(selectedMember.expiryDate).toLocaleDateString('en-IN') },
 { label: 'Address', value: selectedMember.address || 'N/A' },
 { label: 'Total Paid', value: formatCurrency(selectedMember.paidAmount) },
 { label: 'Pending', value: formatCurrency(selectedMember.pendingAmount) },
 ].map((f, i) => (
 <div key={i} className="bg-[var(--members-bg-input)] rounded-lg p-3">
 <p className="text-xs text-[var(--members-text-secondary)] mb-0.5">{f.label}</p>
 <p className="text-sm font-semibold text-[var(--members-text-primary)]">{f.value}</p>
 </div>
 ))}
 </div>
 </div>

 {/* Sub Tabs */}
 <div className="bg-[var(--members-bg-card)] rounded-xl shadow-sm border border-[var(--members-border)] overflow-hidden">
 <div className="flex border-b border-[var(--members-border)]">
 {([['overview', 'Overview'], ['attendance', 'Attendance'], ['payments', 'Payment History']] as [typeof profileTab, string][]).map(([t, label]) => (
 <button 
 key={t} 
 onClick={() => { setProfileTab(t); if (t === 'payments') loadMemberProfile(selectedMember.id); }}
 className={`px-5 py-3.5 text-sm font-medium transition-colors border-b-2 ${
 profileTab === t 
 ? 'text-[var(--members-highlight)] bg-[var(--members-highlight-subtle)]' 
 : 'border-transparent text-[var(--members-text-secondary)] hover:text-[var(--members-text-primary)]'
 }`}
 style={profileTab === t ? { borderBottomColor: 'var(--members-highlight)' } : {}}
 >
 {label}
 </button>
 ))}
 </div>

 <div className="p-5">
 {profileTab === 'overview' && <ProfileOverview />}
 {profileTab === 'attendance' && <ProfileAttendance />}
 {profileTab === 'payments' && <ProfilePayments />}
 </div>
 </div>
 </div>
 </div>
 );
}
