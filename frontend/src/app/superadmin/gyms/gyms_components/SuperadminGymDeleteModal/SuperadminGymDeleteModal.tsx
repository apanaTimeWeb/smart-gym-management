// RESPONSIBILITY: Renders the confirmation modal for deleting a gym. Requires the user to type "DELETE".
'use client';
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useSuperadminGymDeleteModal } from '@/app/superadmin/gyms/gyms_components/SuperadminGymDeleteModal/useSuperadminGymDeleteModal';
export default function SuperadminGymDeleteModal() {
    const { isDeleteModalOpen, closeDeleteModal, gymToDelete, confirmText, setConfirmText, handleConfirmDelete, actionLoadingId } = useSuperadminGymDeleteModal();
    if (!isDeleteModalOpen || !gymToDelete)
        return null;
    const isDeleteEnabled = confirmText === 'DELETE' && actionLoadingId !== gymToDelete.id;
    const isDeleting = actionLoadingId === gymToDelete.id;
    return (<div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 p-4" role="dialog" aria-modal="true">
      <div className="bg-overlay rounded-2xl p-7 max-w-md w-full border border-danger shadow-dialog relative">
        <button onClick={closeDeleteModal} className="absolute top-5 right-5 text-secondary hover:text-primary motion-safe:transition-colors" disabled={isDeleting}>
          <X size={18}/>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="bg-danger-bg p-2 rounded-full">
            <AlertTriangle className="w-6 h-6 text-danger"/>
          </div>
          <h2 className="text-lg font-bold text-primary">Delete Gym</h2>
        </div>
        
        <p className="text-sm text-secondary mb-4">
          You are about to permanently delete <strong>{gymToDelete.name}</strong> and all associated data. This action cannot be undone.
        </p>

        <div className="bg-danger-bg/20 border border-danger/30 rounded-lg p-4 mb-6">
          <label className="block text-sm font-bold text-secondary mb-2">
            Please type <span className="text-primary font-mono select-none">DELETE</span> to confirm.
          </label>
          <input type="text" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:border-danger focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors" placeholder="Type DELETE" disabled={isDeleting}/>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={closeDeleteModal} className="px-5 py-2.5 rounded-lg text-sm font-medium text-primary border border-border hover:bg-page motion-safe:transition-colors" disabled={isDeleting}>
            Cancel
          </button>
          <button type="button" onClick={handleConfirmDelete} className="px-5 py-2.5 rounded-lg text-sm font-medium text-on-danger bg-danger-bg hover:bg-danger-bg/90 motion-safe:transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!isDeleteEnabled}>
            {isDeleting ? 'Deleting...' : 'Confirm Delete'}
          </button>
        </div>
      </div>
    </div>);
}
