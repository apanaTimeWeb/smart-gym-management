'use client';
// RESPONSIBILITY: SuperadminSidebar.tsx renders the main sidebar navigation for the SaaS Master Control Panel.

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Building2, ServerCog, LogOut, ChevronLeft, ChevronRight, CreditCard, Ticket, Activity, HardDrive, DatabaseBackup, Receipt, ToggleLeft, DatabaseZap, ShieldAlert, Megaphone, Tag, Users, BarChart2 } from 'lucide-react';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { logout } from '@/lib/api';

interface SuperadminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}

export default function SuperadminSidebar({ isCollapsed, setIsCollapsed }: SuperadminSidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Listens for the global 'toggle-sidebar' event dispatched by SuperadminHeader's hamburger button.
  useEffect(() => {
    const handleToggle = () => {
      if (window.innerWidth < 1024) {
        setIsMobileOpen(v => !v);
      } else {
        setIsCollapsed(!isCollapsed);
      }
    };
    window.addEventListener('toggle-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-sidebar', handleToggle);
  }, [isCollapsed, setIsCollapsed]);

  // Closes the mobile drawer whenever the route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const navGroups = [
    {
      group: 'SaaS Business',
      items: [
        { name: 'Dashboard', href: SuperadminUrlConfig.PAGES.DASHBOARD, icon: LayoutDashboard },
        { name: 'Revenue Analytics', href: SuperadminUrlConfig.PAGES.ANALYTICS, icon: BarChart2 },
        { name: 'Subscription Plans', href: SuperadminUrlConfig.PAGES.PLANS, icon: CreditCard },
        { name: 'Promotional Coupons', href: SuperadminUrlConfig.PAGES.COUPONS, icon: Tag },
        { name: 'Affiliate Partners', href: SuperadminUrlConfig.PAGES.AFFILIATES, icon: Users },
        { name: 'Tenants (Gyms)', href: SuperadminUrlConfig.PAGES.GYMS_LIST, icon: Building2 },
        { name: 'SaaS Invoices', href: SuperadminUrlConfig.PAGES.INVOICES, icon: Receipt },
        { name: 'Support Tickets', href: SuperadminUrlConfig.PAGES.TICKETS, icon: Ticket },
        { name: 'Usage Meters', href: SuperadminUrlConfig.PAGES.USAGE_METERS, icon: BarChart2 },
      ]
    },
    {
      group: 'Communication',
      items: [
        { name: 'Announcements', href: SuperadminUrlConfig.PAGES.BROADCASTS, icon: Megaphone },
      ]
    },
    {
      group: 'Product',
      items: [
        { name: 'Feature Flags', href: SuperadminUrlConfig.PAGES.FEATURES, icon: ToggleLeft },
      ]
    },
    {
      group: 'System & Infra',
      items: [
        { name: 'Infrastructure', href: SuperadminUrlConfig.PAGES.INFRASTRUCTURE, icon: HardDrive },
        { name: 'Schema Rollouts', href: SuperadminUrlConfig.PAGES.MIGRATIONS, icon: DatabaseZap },
        { name: 'Background Jobs', href: SuperadminUrlConfig.PAGES.JOBS, icon: Activity },
        { name: 'Database Backups', href: SuperadminUrlConfig.PAGES.BACKUPS, icon: DatabaseBackup },
        { name: 'System Health', href: SuperadminUrlConfig.PAGES.SYSTEM_HEALTH, icon: ServerCog },
        { name: 'Global Audit Logs', href: SuperadminUrlConfig.PAGES.AUDIT_LOGS, icon: ShieldAlert },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden motion-safe:transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-background border-r border-border motion-safe:transition-all motion-safe:duration-300 ${
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        } ${
          isMobileOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0'
        }`}
      >
      <div className="flex h-20 items-center justify-between px-4 border-b border-border">
        {!isCollapsed && (
          <span className="text-2xl font-bold text-primary">
            SaaS Master
          </span>
        )}
        {isCollapsed && (
          <span className="text-xl font-bold text-primary mx-auto">SM</span>
        )}
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto p-4 custom-scrollbar">
        {navGroups.map((group) => (
          <div key={group.group}>
            {!isCollapsed && <p className="text-xs font-semibold text-disabled mb-2 uppercase tracking-wider">{group.group}</p>}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    title={isCollapsed ? item.name : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 motion-safe:transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-secondary hover:bg-card hover:text-foreground border border-transparent'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : 'opacity-70'}`} />
                    {!isCollapsed && <span className="font-medium text-sm">{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      </aside>
    </>
  );
}




