'use client';

import { useState, useEffect } from 'react';
import { User, Lock, Clock, Award, Save } from 'lucide-react';
import TrainerHeader from '@/app/trainer/trainer_components/TrainerLayout/TrainerHeader';
import { getUser } from '@/lib/api';

export default function TrainerProfileMain() {
  const [activeTab, setActiveTab] = useState<'personal' | 'security' | 'schedule'>('personal');
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  const user = mounted ? getUser() : null;
  const displayName = user?.name || 'Trainer';
  const displayEmail = user?.email || '';
  const displayInitial = displayName.charAt(0).toUpperCase();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg('');
    // TODO: Wire to real update profile API when backend is ready
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setSaveMsg('Profile updated successfully!');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  return (
    <div className="min-h-full pb-10">
      <TrainerHeader title="My Profile" subtitle="Manage your personal information and availability" />
      
      <div className="p-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-2">
            {[
              { id: 'personal', label: 'Personal Info', icon: User },
              { id: 'security', label: 'Security', icon: Lock },
              { id: 'schedule', label: 'Availability', icon: Clock },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm motion-safe:transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-card text-secondary hover:bg-input hover:text-foreground border border-transparent hover:border-border'
                }`}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <div className="bg-card rounded-2xl shadow-sm border border-border p-6 md:p-8">
              
              {activeTab === 'personal' && (
                <form onSubmit={handleSave} className="space-y-6 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300">
                  <div className="flex items-center gap-5 pb-6 border-b border-border">
                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center text-3xl font-bold">
                      {mounted ? displayInitial : '?'}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{mounted ? displayName : '...'}</h2>
                      <p className="text-sm text-secondary">{user?.role || 'TRAINER'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-1">Full Name</label>
                      <input type="text" defaultValue={mounted ? displayName : ''} className="w-full px-4 py-2.5 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-1">Email Address</label>
                      <input type="email" defaultValue={mounted ? displayEmail : ''} className="w-full px-4 py-2.5 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-1">Phone Number</label>
                      <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-2.5 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-1">Specialization</label>
                      <input type="text" placeholder="e.g. Strength & Conditioning" className="w-full px-4 py-2.5 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2 flex items-center gap-2"><Award size={16} /> Certifications</label>
                    <textarea rows={3} placeholder="e.g. ACE Certified Personal Trainer" className="w-full px-4 py-2.5 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
                  </div>
                  
                  {saveMsg && (
                    <p className="text-sm font-medium text-success bg-success-bg px-4 py-2 rounded-lg">{saveMsg}</p>
                  )}
                  
                  <div className="pt-2 flex justify-end">
                    <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:opacity-90 motion-safe:transition-opacity disabled:opacity-70">
                      {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full motion-safe:animate-spin" /> : <Save size={18} />}
                      Save Changes
                    </button>
                  </div>
                </form>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300">
                  <h3 className="text-lg font-bold text-foreground border-b border-border pb-4 mb-6">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-1">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-1">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-1">Confirm New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:opacity-90 motion-safe:transition-opacity">
                      Update Password
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300">
                  <h3 className="text-lg font-bold text-foreground border-b border-border pb-4 mb-6">Working Hours</h3>
                  
                  <div className="space-y-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                      <div key={day} className="flex items-center justify-between p-4 bg-input rounded-xl border border-border">
                        <span className="font-medium text-foreground w-28">{day}</span>
                        <div className="flex items-center gap-3">
                          <input type="time" defaultValue="06:00" className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                          <span className="text-secondary text-sm">to</span>
                          <input type="time" defaultValue="14:00" className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between p-4 bg-danger-bg/50 rounded-xl border border-danger/20">
                      <span className="font-medium text-danger w-28">Sunday</span>
                      <span className="text-danger text-sm font-semibold px-4">Off Day</span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:opacity-90 motion-safe:transition-opacity">
                      <Save size={18} /> Save Schedule
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
