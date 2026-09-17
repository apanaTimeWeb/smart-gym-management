// RESPONSIBILITY: Renders the loading route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-96 flex items-center justify-center">
      <Loader2 className="w-10 h-10 motion-safe:animate-spin text-primary" />
    </div>
  );
}
