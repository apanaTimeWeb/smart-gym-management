'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface SuperadminTicketsReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string | null;
}

export default function SuperadminTicketsReplyModal({ isOpen, onClose, ticketId }: SuperadminTicketsReplyModalProps) {
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !ticketId) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) {
      toast.error('Please enter a reply message.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success('Reply sent successfully!');
      setReplyText('');
      onClose();
    } catch (err) {
      toast.error('Failed to send reply.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm motion-safe:animate-in fade-in duration-200">
      <div className="bg-card border border-border w-full max-w-lg rounded-xl shadow-lg p-6 relative motion-safe:animate-in zoom-in-95 duration-200">
        <h2 className="text-xl font-bold text-foreground mb-4">Reply to Ticket #{ticketId}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Your Message</label>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary min-h-[120px]"
              placeholder="Type your reply here..."
              disabled={isSubmitting}
            />
          </div>
          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg font-medium border border-border text-foreground hover:bg-card-hover motion-safe:transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !replyText.trim()}
              className="px-4 py-2 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 motion-safe:transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? 'Sending...' : 'Send Reply'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
