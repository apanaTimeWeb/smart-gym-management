// RESPONSIBILITY: Renders AdminCampaignsComposer for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
'use client';
import { Variable } from 'lucide-react';
import type { AdminCampaignsComposerProps } from '@/app/admin/campaigns/campaigns_types/AdminCampaignsTypes';

export default function AdminCampaignsComposer({ body, onChange }: AdminCampaignsComposerProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5" aria-labelledby="campaign-message-heading">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="campaign-message-heading" className="text-sm font-semibold text-primary">3. Edit Message</h2>
        <button
          type="button"
          onClick={() => onChange(`${body}${body && !body.endsWith(' ') ? ' ' : ''}{name}`)}
          className="flex items-center gap-1.5 rounded-lg bg-input px-3 py-1.5 text-xs font-medium text-primary motion-safe:transition-colors motion-safe:duration-base hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Variable size={18} aria-hidden="true" />
          Insert {'{name}'}
        </button>
      </div>
      <textarea
        value={body}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Campaign message"
        className="h-40 w-full resize-none rounded-lg border border-border bg-input p-4 text-sm text-primary focus-visible:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        placeholder="Type your message here..."
      />
      <p className="mt-3 text-xs leading-relaxed text-secondary">The {'{name}'} variable will automatically be replaced with each member's actual name when generating the WhatsApp link.</p>
    </section>
  );
}
