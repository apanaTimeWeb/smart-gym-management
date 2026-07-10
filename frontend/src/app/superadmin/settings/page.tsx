import { Settings, Shield, BellRing, Database } from 'lucide-react';

export const metadata = {
  title: 'Platform Settings | SaaS Master',
  description: 'Global SaaS platform configurations',
};

export default function SuperadminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Platform Settings</h1>
        <p className="text-[var(--text-secondary)] mt-1">Configure global SaaS limits, master credentials, and system defaults.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-[var(--border)] pb-4">
              <Shield className="w-5 h-5 text-[var(--primary)]" />
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Global Security</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-[var(--text-primary)]">Enforce 2FA for all Gym Admins</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Require Two-Factor Authentication for all tenant owners.</p>
                </div>
                <div className="w-12 h-6 bg-[var(--primary)] rounded-full relative cursor-pointer opacity-50 cursor-not-allowed">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-[var(--border)] pb-4">
              <Database className="w-5 h-5 text-[var(--primary)]" />
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Database Provisioning Limits</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[var(--text-secondary)]">Max Concurrent Migrations</label>
                <input 
                  type="number" 
                  disabled
                  value={10}
                  className="w-full mt-1 bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-disabled)] rounded-lg px-4 py-2 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-[var(--border)] pb-4">
              <BellRing className="w-5 h-5 text-[var(--warning)]" />
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Global Broadcast</h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-4">Send a push notification to all Admins across all 50+ gyms.</p>
            <textarea 
              disabled
              placeholder="e.g. System maintenance at 2AM EST..."
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-disabled)] rounded-lg px-4 py-2 h-24 resize-none cursor-not-allowed"
            ></textarea>
            <button disabled className="mt-2 w-full bg-[var(--primary)]/50 text-white font-medium py-2 rounded-lg cursor-not-allowed">
              Broadcast Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
