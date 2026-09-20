// RESPONSIBILITY: Renders AdminCampaignsAudiencePicker for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
'use client';
import type { AdminCampaignsAudiencePickerProps } from '@/app/admin/campaigns/campaigns_types/AdminCampaignsTypes';

export default function AdminCampaignsAudiencePicker({ audiences, selectedAudienceId, onSelect }: AdminCampaignsAudiencePickerProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5" aria-labelledby="campaign-audience-heading">
      <h2 id="campaign-audience-heading" className="mb-4 text-sm font-semibold text-primary">1. Select Target Audience</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {audiences.map((audience) => {
          const isSelected = selectedAudienceId === audience.id;
          return (
            <button
              key={audience.id}
              type="button"
              onClick={() => onSelect(audience.id)}
              aria-pressed={isSelected}
              className={`flex flex-col items-start rounded-xl border p-4 text-left motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isSelected ? 'border-primary bg-primary-subtle ring-1 ring-primary' : 'border-border bg-input hover:border-primary'}`}
            >
              <span className="text-sm font-semibold text-primary">{audience.name}</span>
              <span className="mt-1 text-xs leading-relaxed text-secondary">{audience.description}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
