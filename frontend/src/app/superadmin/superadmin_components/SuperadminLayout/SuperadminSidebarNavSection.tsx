// RESPONSIBILITY: Renders a labeled group of navigation items in the SuperadminSidebar.
'use client';
import type { LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SuperadminSidebarNavItem from '@/app/superadmin/superadmin_components/SuperadminLayout/SuperadminSidebarNavItem';
interface NavItem {
    name: string;
    href: string;
    icon: LucideIcon;
}
interface NavGroup {
    group: string;
    items: NavItem[];
}
interface SuperadminSidebarNavSectionProps {
    navGroups: NavGroup[];
    isCollapsed: boolean;
}
export default function SuperadminSidebarNavSection({ navGroups, isCollapsed }: SuperadminSidebarNavSectionProps) {
    const pathname = usePathname();
    if (navGroups.length === 0) {
        return (<div className="text-center py-4 text-sm text-secondary">
        No matches found
      </div>);
    }
    return (<>
      {navGroups.map((group) => (<div key={group.group}>
          {!isCollapsed && (<p className="text-xs font-semibold text-disabled mb-2 px-2 uppercase tracking-wider">
              {group.group}
            </p>)}
          <div className="space-y-0.5">
            {group.items.map((item) => (<SuperadminSidebarNavItem key={item.name} name={item.name} href={item.href} icon={item.icon} isActive={pathname.startsWith(item.href)} isCollapsed={isCollapsed}/>))}
          </div>
        </div>))}
    </>);
}
