"use client";

import { useInquiriesContext } from '../../inquiries_context/InquiriesContext';
import { MessageSquare, Plus, Clock, CheckCircle } from 'lucide-react';

export default function InquiriesKPIs() {
 const { stats } = useInquiriesContext();
 if (!stats) return null;

 const statCards = [
 { label: 'Total Inquiries', value: stats.total, icon: MessageSquare, color: 'var(--inquiries-kpi-blue-text)', bg: 'var(--inquiries-kpi-blue-bg)' },
 { label: 'New', value: stats.new, icon: Plus, color: 'var(--inquiries-kpi-yellow-text)', bg: 'var(--inquiries-kpi-yellow-bg)' },
 { label: 'Follow Up', value: stats.followUp, icon: Clock, color: 'var(--inquiries-kpi-orange-text)', bg: 'var(--inquiries-kpi-orange-bg)' },
 { label: 'Converted', value: stats.converted, icon: CheckCircle, color: 'var(--inquiries-kpi-green-text)', bg: 'var(--inquiries-kpi-green-bg)' },
 ];

 return (
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 inquiries-module">
 {statCards.map((s, i) => (
 <div key={i} className="rounded-xl p-4 shadow-sm border flex items-center gap-3" style={{ backgroundColor: 'var(--inquiries-bg-card)', borderColor: 'var(--inquiries-border)' }}>
 <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.bg }}>
 <s.icon size={19} style={{ color: s.color }} />
 </div>
 <div>
 <p className="text-xs font-medium" style={{ color: 'var(--inquiries-text-secondary)' }}>{s.label}</p>
 <p className="text-xl font-bold" style={{ color: 'var(--inquiries-text-primary)' }}>{s.value}</p>
 </div>
 </div>
 ))}
 </div>
 );
}
