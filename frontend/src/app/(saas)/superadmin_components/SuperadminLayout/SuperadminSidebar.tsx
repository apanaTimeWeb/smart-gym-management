'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Building2, ServerCog, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { SuperadminUrlConfig } from '@/app/(saas)/superadmin_url_config';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}

export default function SuperadminSidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: SuperadminUrlConfig.PAGES.DASHBOARD, icon: LayoutDashboard },
    { name: 'Tenants (Gyms)', href: SuperadminUrlConfig.PAGES.GYMS_LIST, icon: Building2 },
    { name: 'System & Audit', href: SuperadminUrlConfig.PAGES.SYSTEM_HEALTH, icon: ServerCog },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-gray-950 border-r border-gray-800 transition-all duration-300 ${
        isCollapsed ? 'w-[80px]' : 'w-64'
      }`}
    >
      <div className="flex h-20 items-center justify-between px-4 border-b border-gray-800">
        {!isCollapsed && (
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
            SaaS Master
          </span>
        )}
        {isCollapsed && (
          <span className="text-xl font-bold text-blue-500 mx-auto">SM</span>
        )}
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-4 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-colors ${
                isActive
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                  : 'text-gray-400 hover:bg-gray-900 hover:text-gray-100'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-400' : 'opacity-70'}`} />
              {!isCollapsed && <span className="font-medium text-sm">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 transition-colors mb-4"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
        
        <button className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-red-400 hover:bg-red-500/10 transition-colors ${isCollapsed ? 'justify-center' : ''}`}>
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="font-medium text-sm">Exit to ERP</span>}
        </button>
      </div>
    </aside>
  );
}
