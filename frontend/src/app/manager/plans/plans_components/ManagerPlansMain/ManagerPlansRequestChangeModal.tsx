// RESPONSIBILITY: Renders the modal to request a change to a plan.
import { useState } from 'react';
import { Send, X, Loader2 } from 'lucide-react';
import { usePlansContext } from '@/app/manager/plans/plans_context/ManagerPlansContext';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_utils/ManagerUnsavedChangesGuard';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';

export default function ManagerPlansRequestChangeModal() {
  const { requestModalPlan, closeRequestModal, submitChangeRequest, saving } = usePlansContext();
  const [note, setNote] = useState('');
  const { confirm } = useConfirm();

  const isDirty = note.trim().length > 0;
  useManagerUnsavedChangesGuard(isDirty);

  if (!requestModalPlan) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    await submitChangeRequest(note);
    setNote('');
  };

  const handleClose = async () => {
    if (isDirty) {
      const isConfirmed = await confirm({
        title: 'Discard Changes?',
        message: 'You have unsaved changes. Are you sure you want to close?',
        confirmText: 'Discard',
        type: 'danger'
      });
      if (!isConfirmed) return;
    }
    setNote('');
    closeRequestModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h3 className="text-base font-bold text-foreground">Request Plan Change</h3>
            <p className="text-xs text-secondary mt-0.5">{requestModalPlan.name} — {requestModalPlan.tier}</p>
          </div>
          <button onClick={handleClose} className="p-2 rounded-lg hover:bg-input text-secondary motion-safe:transition-colors">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
              Describe the change needed
            </label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={4}
              placeholder="e.g. Increase 1-month price to ₹1500, add sauna access feature..."
              className="w-full px-3 py-2.5 text-sm bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary resize-none"
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={handleClose}
              className="flex-1 py-2.5 text-sm font-medium rounded-xl border border-border text-secondary hover:text-foreground motion-safe:transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving || !note.trim()}
              className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 motion-safe:transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
              {saving ? <Loader2 size={15} className="motion-safe:animate-spin" /> : <Send size={15} />}
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
