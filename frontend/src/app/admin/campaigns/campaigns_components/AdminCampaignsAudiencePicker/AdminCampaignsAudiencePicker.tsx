'use client';
import { useState } from 'react';
import type { AdminCampaignsAudience } from '@/app/admin/campaigns/campaigns_types/AdminCampaignsTypes';

interface Props {
  audiences: AdminCampaignsAudience[];
  selectedAudienceId: string;
  onSelect: (id: string) => void;
}

export default function AdminCampaignsAudiencePicker({ audiences, selectedAudienceId, onSelect }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold text-primary mb-4">1. Select Target Audience</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {audiences.map((aud) => {
          const isSelected = selectedAudienceId === aud.id;
          return (
            <button
              key={aud.id}
              type="button"
              onClick={() => onSelect(aud.id)}
              className={`flex flex-col items-start p-4 rounded-xl border text-left transition-colors ${
                isSelected 
                  ? 'border-primary bg-primary-subtle ring-1 ring-primary' 
                  : 'border-border bg-input hover:border-primary hover:bg-input/80'
              }`}
            >
              <span className={`text-sm font-semibold ${isSelected ? 'text-primary' : 'text-primary'}`}>
                {aud.name}
              </span>
              <span className="mt-1 text-xs text-secondary leading-relaxed">
                {aud.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
