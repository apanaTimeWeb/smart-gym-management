// RESPONSIBILITY: Renders the Plans module tabs and their respective mock panels.
import { usePlansContext } from '@/app/manager/plans/plans_context/ManagerPlansContext';
import ManagerPlansToolbar from '@/app/manager/plans/plans_components/ManagerPlansMain/ManagerPlansToolbar';
import ManagerPlansGrid from '@/app/manager/plans/plans_components/ManagerPlansMain/ManagerPlansGrid';

export default function ManagerPlansTabs() {
  const { plans, activeTab, setActiveTab } = usePlansContext();

  const PLANS_TABS = ['View Plans', 'Membership Activate', 'Membership Renew', 'Membership Freeze', 'Expiry Check'];

  return (
    <>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 bg-card border border-border p-1 rounded-xl w-fit">
        {PLANS_TABS.map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg motion-safe:transition-colors ${
              activeTab === t ? 'bg-primary text-primary-foreground shadow' : 'text-secondary hover:text-foreground hover:bg-accent'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'Membership Activate' && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Activate New Membership</h3>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-1">Select Member</label>
              <select className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary">
                <option>Select a member...</option>
                <option>Rahul Kumar (9876543210)</option>
                <option>Priya Singh (8765432109)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select Plan</label>
              <select className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary">
                <option>Select a plan...</option>
                {plans.map(p => <option key={p.id}>{p.name} - {p.tier}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input type="date" className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
            </div>
            <button className="w-full py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 motion-safe:transition-opacity">
              Activate Membership
            </button>
          </div>
        </div>
      )}

      {activeTab === 'Membership Renew' && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Renew Memberships</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 px-4 text-sm font-medium text-secondary">Member Name</th>
                  <th className="py-3 px-4 text-sm font-medium text-secondary">Current Plan</th>
                  <th className="py-3 px-4 text-sm font-medium text-secondary">Expiry Date</th>
                  <th className="py-3 px-4 text-sm font-medium text-secondary text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-3 px-4 text-sm text-foreground">Amit Sharma</td>
                  <td className="py-3 px-4 text-sm text-secondary">Basic Monthly</td>
                  <td className="py-3 px-4 text-sm text-danger font-medium">Tomorrow</td>
                  <td className="py-3 px-4 text-right">
                    <button className="px-3 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 motion-safe:transition-opacity">Renew Now</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Membership Freeze' && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Freeze Membership</h3>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-1">Select Active Member</label>
              <select className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary">
                <option>Select a member...</option>
                <option>Neha Verma</option>
              </select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Freeze From</label>
                <input type="date" className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Freeze Until</label>
                <input type="date" className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
            </div>
            <button className="w-full py-2 bg-info text-info-foreground font-semibold rounded-lg hover:opacity-90 motion-safe:transition-opacity">
              Apply Freeze
            </button>
          </div>
        </div>
      )}

      {activeTab === 'Expiry Check' && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Expiring in next 30 days</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 px-4 text-sm font-medium text-secondary">Member Name</th>
                  <th className="py-3 px-4 text-sm font-medium text-secondary">Phone</th>
                  <th className="py-3 px-4 text-sm font-medium text-secondary">Plan</th>
                  <th className="py-3 px-4 text-sm font-medium text-secondary">Expires On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-3 px-4 text-sm text-foreground">Amit Sharma</td>
                  <td className="py-3 px-4 text-sm text-secondary">9876543210</td>
                  <td className="py-3 px-4 text-sm text-secondary">Basic Monthly</td>
                  <td className="py-3 px-4 text-sm text-danger font-medium">10 Sept 2026</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-foreground">Priya Singh</td>
                  <td className="py-3 px-4 text-sm text-secondary">8765432109</td>
                  <td className="py-3 px-4 text-sm text-secondary">Gold Yearly</td>
                  <td className="py-3 px-4 text-sm text-warning font-medium">25 Sept 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'View Plans' && (
        <>
          {/* KPI Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Total Plans',    value: plans.length,                          colorClass: 'text-primary' },
              { label: 'Active Plans',   value: plans.filter(p => p.isActive).length,  colorClass: 'text-success' },
              { label: 'Inactive Plans', value: plans.filter(p => !p.isActive).length, colorClass: 'text-danger'  },
            ].map(stat => (
              <div key={stat.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
                style={{ background: 'linear-gradient(180deg, rgba(250,204,21,0.06), rgba(255,255,255,0.01))' }}>
                <p className="text-sm text-secondary">{stat.label}</p>
                <p className={`text-2xl font-bold ml-auto ${stat.colorClass}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          <ManagerPlansToolbar />
          <ManagerPlansGrid />
        </>
      )}
    </>
  );
}
