// RESPONSIBILITY: Renders the empty state for cross-gym blacklist records.

import { Ban } from 'lucide-react';

export default function AdminBlacklistCrossGymEmptyState() {
  return <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
    <Ban size={32} aria-hidden="true" className="text-secondary" />
    <h3 className="text-base font-semibold text-primary">No gym-specific bans</h3>
    <p className="text-sm text-secondary">No blacklisted members are currently assigned to the selected gyms.</p>
  </div>;
}
