import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[500px] flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );
}
