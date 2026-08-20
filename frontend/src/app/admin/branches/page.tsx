import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import { Building2, Plus, Edit, Trash2 } from 'lucide-react';
import { MOCK_BRANCHES } from '@/app/admin/admin_store/useAdminGlobalStore';

export default function AdminBranchesPage() {
  return (
    <div className="min-h-full pb-10">
      <AdminHeader title="Gym Branches" subtitle="Manage your gym locations and branches" />
      
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Building2 size={20} className="text-primary" />
            Active Locations ({MOCK_BRANCHES.length})
          </h2>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Plus size={16} />
            Add Branch
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_BRANCHES.map(branch => (
            <div key={branch.id} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-secondary hover:text-primary bg-background rounded-lg border border-border shadow-sm">
                  <Edit size={14} />
                </button>
                <button className="p-1.5 text-secondary hover:text-danger bg-background rounded-lg border border-border shadow-sm">
                  <Trash2 size={14} />
                </button>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg leading-tight">{branch.name}</h3>
                  <p className="text-sm text-secondary mt-1">{branch.location}</p>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                  branch.status === 'active' ? 'bg-success-bg text-success' : 'bg-secondary/10 text-secondary'
                }`}>
                  {branch.status}
                </span>
                <span className="text-xs text-secondary font-medium">ID: {branch.id.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
