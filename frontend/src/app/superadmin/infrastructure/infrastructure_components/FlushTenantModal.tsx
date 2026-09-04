'use client';
import React, { useState, useEffect } from 'react';
import { X, Loader2, Search } from 'lucide-react';
import { useGymsStore } from '@/app/superadmin/gyms/gyms_store/useGymsStore';

interface FlushTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFlush: (tenantId: string) => Promise<void>;
}

export default function FlushTenantModal({ isOpen, onClose, onFlush }: FlushTenantModalProps) {
  const { gyms, fetchState, fetchGyms } = useGymsStore();
  const [search, setSearch] = useState('');
  const [selectedTenantId, setSelectedTenantId] = useState<string>('');
  const [isFlushing, setIsFlushing] = useState(false);

  useEffect(() => {
    if (isOpen && (!gyms || gyms.length === 0)) {
      fetchGyms();
    }
  }, [isOpen, gyms, fetchGyms]);

  useEffect(() => {
    if (!isOpen) {
      setSearch('');
      setSelectedTenantId('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredGyms = gyms?.filter(g => g.name.toLowerCase().includes(search.toLowerCase()) || g.id.includes(search)) || [];

  const handleFlush = async () => {
    if (!selectedTenantId) return;
    setIsFlushing(true);
    try {
      await onFlush(selectedTenantId);
      onClose();
    } finally {
      setIsFlushing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm motion-safe:animate-in fade-in">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col motion-safe:animate-in zoom-in-95">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">Flush Specific Tenant</h2>
            <p className="text-sm text-secondary">Select a tenant to clear its Redis cache.</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-secondary hover:text-foreground hover:bg-input rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text"
              placeholder="Search by gym name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-border-focus transition-colors"
            />
          </div>

          <div className="border border-border rounded-lg overflow-hidden flex flex-col h-64 bg-background">
            {fetchState === 'loading' ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="w-6 h-6 motion-safe:animate-spin text-primary" />
              </div>
            ) : filteredGyms.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-sm text-secondary">
                No tenants found.
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                {filteredGyms.map(gym => (
                  <button
                    key={gym.id}
                    onClick={() => setSelectedTenantId(gym.id)}
                    className={`w-full text-left px-4 py-3 rounded-md text-sm transition-colors flex items-center justify-between ${selectedTenantId === gym.id ? 'bg-primary/10 border-primary text-primary font-semibold' : 'hover:bg-input text-foreground border-transparent'} border`}
                  >
                    <span>{gym.name}</span>
                    <span className={`text-xs ${selectedTenantId === gym.id ? 'text-primary' : 'text-secondary'}`}>ID: {gym.id}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-5 border-t border-border flex justify-end gap-3 bg-sidebar/50">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-transparent border border-border hover:bg-input text-foreground font-medium rounded-lg transition-colors text-sm"
          >
            Cancel
          </button>
          <button 
            onClick={handleFlush}
            disabled={!selectedTenantId || isFlushing}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-medium rounded-lg transition-colors text-sm disabled:cursor-not-allowed"
          >
            {isFlushing && <Loader2 className="w-4 h-4 motion-safe:animate-spin" />}
            Flush Tenant Cache
          </button>
        </div>
      </div>
    </div>
  );
}
