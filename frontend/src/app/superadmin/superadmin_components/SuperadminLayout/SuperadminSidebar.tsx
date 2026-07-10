'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Building2, ServerCog, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';

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
      className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[var(--bg-page)] border-r border-[var(--border)] transition-all duration-300 ${
        isCollapsed ? 'w-[80px]' : 'w-64'
      }`}
    >
      <div className="flex h-20 items-center justify-between px-4 border-b border-[var(--border)]">
        {!isCollapsed && (
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
            SaaS Master
          </span>
        )}
        {isCollapsed && (
          <span className="text-xl font-bold text-[var(--primary)] mx-auto">SM</span>
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
                  ? 'bg-[var(--primary)]/10 text-[var(--primary)] border border-blue-500/20'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[var(--primary)]' : 'opacity-70'}`} />
              {!isCollapsed && <span className="font-medium text-sm">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[var(--border)]">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--bg-card)] p-2 text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors mb-4"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
        
        <button className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-[var(--danger)] hover:bg-[var(--danger)]/10 transition-colors ${isCollapsed ? 'justify-center' : ''}`}>
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="font-medium text-sm">Exit to ERP</span>}
        </button>
      </div>
    </aside>
  );
}




