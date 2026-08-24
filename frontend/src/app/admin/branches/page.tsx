'use client';

import { useState } from 'react';
import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import { Building2, Plus, Edit, Trash2 } from 'lucide-react';
import { useAdminGlobalStore, Branch } from '@/app/admin/admin_store/useAdminGlobalStore';
import toast from 'react-hot-toast';

export default function AdminBranchesPage() {
  const { branches, setBranches } = useAdminGlobalStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBranchName, setNewBranchName] = useState('');
  const [newBranchLocation, setNewBranchLocation] = useState('');
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);

  const handleAddBranch = () => {
    if (!newBranchName || !newBranchLocation) {
      toast.error('Name and location are required');
      return;
    }
    if (editingBranchId) {
      setBranches(branches.map(b => b.id === editingBranchId ? { ...b, name: newBranchName, location: newBranchLocation } : b));
      toast.success('Branch updated successfully!');
      setEditingBranchId(null);
    } else {
      const newBranch = {
        id: `b${Date.now()}`,
        name: newBranchName,
        location: newBranchLocation,
        status: 'active' as const,
      };
      setBranches([...branches, newBranch]);
      toast.success('Branch created successfully!');
    }
    setIsModalOpen(false);
    setNewBranchName('');
    setNewBranchLocation('');
  };

  const handleEdit = (branch: Branch) => {
    setEditingBranchId(branch.id);
    setNewBranchName(branch.name);
    setNewBranchLocation(branch.location);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setBranches(branches.filter(b => b.id !== id));
    toast.success('Branch deleted');
  };

  return (
    <div className="min-h-full pb-10">
      <AdminHeader title="Gym Branches" subtitle="Manage your gym locations and branches" />
      
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Building2 size={20} className="text-primary" />
            Active Locations ({branches.length})
          </h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            Add Branch
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map(branch => (
            <div key={branch.id} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(branch)}
                  className="p-1.5 text-secondary hover:text-primary bg-background rounded-lg border border-border shadow-sm"
                >
                  <Edit size={14} />
                </button>
                <button 
                  onClick={() => handleDelete(branch.id)}
                  className="p-1.5 text-secondary hover:text-danger bg-background rounded-lg border border-border shadow-sm"
                >
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">{editingBranchId ? 'Edit Branch' : 'Add New Branch'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Branch Name</label>
                <input 
                  type="text" 
                  value={newBranchName}
                  onChange={(e) => setNewBranchName(e.target.value)}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                  placeholder="e.g. Southside Studio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Location</label>
                <input 
                  type="text" 
                  value={newBranchLocation}
                  onChange={(e) => setNewBranchLocation(e.target.value)}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                  placeholder="e.g. 123 Main St, City"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingBranchId(null);
                  setNewBranchName('');
                  setNewBranchLocation('');
                }}
                className="px-4 py-2 bg-input border border-border text-foreground rounded-lg text-sm font-medium hover:bg-border transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddBranch}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {editingBranchId ? 'Save Changes' : 'Create Branch'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
