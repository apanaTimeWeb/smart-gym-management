// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Contains logic, types, or component definition for this module.
'use client';

import { MessageCircle, Mail } from 'lucide-react';
import { useMembersContext } from '@/app/trainer/members/members_context/MembersContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const progressData = [
  { month: 'Jan', weight: 82, bodyFat: 24 },
  { month: 'Feb', weight: 80, bodyFat: 22 },
  { month: 'Mar', weight: 79, bodyFat: 21 },
  { month: 'Apr', weight: 77, bodyFat: 19 },
  { month: 'May', weight: 76, bodyFat: 18 },
  { month: 'Jun', weight: 75, bodyFat: 17 },
];

export default function TrainerMembersProfileOverview() {
 const { selectedMember, openMsg } = useMembersContext();

 if (!selectedMember) return null;

 return (
 <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
 <div className="xl:col-span-2">
 <h3 className="font-semibold text-foreground mb-3">Physical Progress</h3>
 <div className="bg-card border border-border p-4 rounded-xl h-64">
   <ResponsiveContainer width="100%" height="100%">
     <LineChart data={progressData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
       <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--secondary)' }} dy={10} />
       <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--secondary)' }} dx={-10} />
       <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--secondary)' }} dx={10} />
       <Tooltip 
         contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
         itemStyle={{ fontSize: '14px' }}
       />
       <Line yAxisId="left" type="monotone" name="Weight (kg)" dataKey="weight" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
       <Line yAxisId="right" type="monotone" name="Body Fat (%)" dataKey="bodyFat" stroke="var(--warning)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
     </LineChart>
   </ResponsiveContainer>
 </div>
 </div>
 <div>
 <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
 <div className="flex flex-col gap-2">
 <button 
 onClick={() => openMsg(selectedMember, 'whatsapp')} 
 className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl justify-center motion-safe:transition-colors bg-green-500 hover:bg-green-600" 
 >
 <MessageCircle size={14} /> Send WhatsApp
 </button>
 <button 
 onClick={() => openMsg(selectedMember, 'email')} 
 className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl justify-center motion-safe:transition-colors bg-blue-500 hover:bg-blue-600" 
 >
 <Mail size={14} /> Send Email
 </button>
 </div>
 </div>
 </div>
 );
}

