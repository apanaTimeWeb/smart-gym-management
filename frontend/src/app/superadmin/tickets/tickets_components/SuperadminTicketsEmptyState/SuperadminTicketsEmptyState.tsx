// RESPONSIBILITY: Renders the SuperadminTicketsEmptyState component.
import { MessageSquare } from 'lucide-react';
export default function SuperadminTicketsEmptyState() {
    return (<div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-primary-subtle p-4 rounded-full mb-4">
        <MessageSquare size={18} className="w-8 text-primary opacity-80"/>
      </div>
      <h3 className="text-lg font-bold text-primary mb-1">No support tickets found</h3>
      <p className="text-sm text-secondary max-w-sm">
        There are currently no support tickets from gym tenants. Check back later!
      </p>
    </div>);
}
