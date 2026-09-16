'use client';
// RESPONSIBILITY: SuperadminSidebar.tsx renders the collapsible sidebar navigation for the SaaS Master Control Panel.
// Active state: gold left border + bg-primary-subtle + gold glow (Design §3).
// Sidebar footer: logout button per standard ERP shell layout.
// Includes a local search filter for quick navigation.

import { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  Building2,
  ServerCog,
  LogOut,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Ticket,
  Activity,
  HardDrive,
  DatabaseBackup,
  Receipt,
  ToggleLeft,
  DatabaseZap,
  Megaphone,
  Tag,
  Users,
  BarChart2,
  BarChart3,
  Gauge,
  Settings,
  History,
  UserPlus,
  MessageSquare,
  FileBarChart,
  TrendingDown,
  UserCircle,
  Send,
  Search,
  Dumbbell,
  Server,
} from 'lucide-react';

import { AffiliatesUrlConfig } from '@/app/superadmin/affiliates/superadmin_affiliates_url_config';
import { AnalyticsUrlConfig } from '@/app/superadmin/analytics/superadmin_analytics_url_config';
import { BranchesUrlConfig } from '@/app/superadmin/branches/superadmin_branches_url_config';
import { CancellationsUrlConfig } from '@/app/superadmin/cancellations/superadmin_cancellations_url_config';
import { CouponsUrlConfig } from '@/app/superadmin/coupons/superadmin_coupons_url_config';
import { FeaturesUrlConfig } from '@/app/superadmin/features/superadmin_features_url_config';
import { FranchisesUrlConfig } from '@/app/superadmin/franchises/superadmin_franchises_url_config';
import { InvoicesUrlConfig } from '@/app/superadmin/invoices/superadmin_invoices_url_config';
import { MessagingUrlConfig } from '@/app/superadmin/messaging/superadmin_messaging_url_config';
import { OnboardingUrlConfig } from '@/app/superadmin/onboarding/superadmin_onboarding_url_config';
import { ReportsUrlConfig } from '@/app/superadmin/reports/superadmin_reports_url_config';
import { BackupsUrlConfig } from '@/app/superadmin/backups/superadmin_backups_url_config';
import { SystemUrlConfig } from '@/app/superadmin/system/superadmin_system_url_config';
import { PlansUrlConfig } from '@/app/superadmin/plans/superadmin_plans_url_config';
import { ProfileUrlConfig } from '@/app/superadmin/profile/superadmin_profile_url_config';
import { SettingsUrlConfig } from '@/app/superadmin/settings/superadmin_settings_url_config';
import { GlobalAuditUrlConfig } from '@/app/superadmin/global-audit/superadmin_global_audit_url_config';
import { BroadcastsUrlConfig } from '@/app/superadmin/broadcasts/superadmin_broadcasts_url_config';
import { DashboardUrlConfig } from '@/app/superadmin/dashboard/superadmin_dashboard_url_config';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
import { InfrastructureUrlConfig } from '@/app/superadmin/infrastructure/superadmin_infrastructure_url_config';
import { MigrationsUrlConfig } from '@/app/superadmin/migrations/superadmin_migrations_url_config';
import { JobsUrlConfig } from '@/app/superadmin/jobs/superadmin_jobs_url_config';
import { TicketsUrlConfig } from '@/app/superadmin/tickets/superadmin_tickets_url_config';
import { UsageMetersUrlConfig } from '@/app/superadmin/usage-meters/superadmin_usage_meters_url_config';
import { logout } from '@/lib/api';
import SuperadminSidebarNavSection from '@/app/superadmin/superadmin_components/SuperadminLayout/SuperadminSidebarNavSection';

interface SuperadminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}

const ALL_NAV_GROUPS = [
  {
    group: 'Overview',
    items: [
      { name: 'Dashboard', href: DashboardUrlConfig.PAGES.MAIN, icon: LayoutDashboard },
    ]
  },
  {
    group: 'Gyms & Plans',
    items: [
      { name: 'Gyms & Tenants', href: GymsUrlConfig.PAGES.MAIN, icon: Building2 },
      { name: 'Gym Branches', href: BranchesUrlConfig.PAGES.MAIN, icon: ServerCog },
      { name: 'Gym Franchises', href: FranchisesUrlConfig.PAGES.MAIN, icon: Building2 },
      { name: 'Onboarding', href: OnboardingUrlConfig.PAGES.MAIN, icon: UserPlus },
      { name: 'Subscription Plans', href: PlansUrlConfig.PAGES.MAIN, icon: CreditCard },
    ]
  },
  {
    group: 'Billing & Revenue',
    items: [
      { name: 'Revenue Analytics', href: AnalyticsUrlConfig.PAGES.MAIN, icon: BarChart2 },
      { name: 'SaaS Invoices', href: InvoicesUrlConfig.PAGES.MAIN, icon: Receipt },
      { name: 'Promotional Coupons', href: CouponsUrlConfig.PAGES.MAIN, icon: Tag },
    ]
  },
  {
    group: 'Communication & Support',
    items: [
      { name: 'Support Tickets', href: TicketsUrlConfig.PAGES.MAIN, icon: Ticket },
      { name: 'Gym Messaging', href: MessagingUrlConfig.PAGES.MAIN, icon: MessageSquare },
      { name: 'Broadcast Messages', href: BroadcastsUrlConfig.PAGES.MAIN, icon: Send },
    ]
  },
  {
    group: 'Insights & Reports',
    items: [
      { name: 'Members About to Leave', href: CancellationsUrlConfig.PAGES.MAIN, icon: TrendingDown },
      { name: 'Usage Meters', href: UsageMetersUrlConfig.PAGES.MAIN, icon: BarChart3 },
      { name: 'Reports & Exports', href: ReportsUrlConfig.PAGES.MAIN, icon: FileBarChart },
    ]
  },
  {
    group: 'Platform Management',
    items: [
      { name: 'Feature Flags', href: FeaturesUrlConfig.PAGES.MAIN, icon: ToggleLeft },
      { name: 'Affiliate Partners', href: AffiliatesUrlConfig.PAGES.MAIN, icon: Users },
    ]
  },
  {
    group: 'System & Infra',
    items: [
      { name: 'Infrastructure', href: InfrastructureUrlConfig.PAGES.MAIN, icon: Server },
      { name: 'Schema Rollouts', href: MigrationsUrlConfig.PAGES.MAIN, icon: DatabaseZap },
      { name: 'Background Jobs', href: JobsUrlConfig.PAGES.MAIN, icon: Activity },
      { name: 'Database Backups', href: BackupsUrlConfig.PAGES.MAIN, icon: DatabaseBackup },
      { name: 'System Health', href: SystemUrlConfig.PAGES.MAIN, icon: ServerCog },
      { name: 'Global Audit Logs', href: GlobalAuditUrlConfig.PAGES.MAIN, icon: History },
      { name: 'Global Settings', href: SettingsUrlConfig.PAGES.MAIN, icon: Settings },
    ]
  },
  {
    group: 'Account',
    items: [
      { name: 'My Profile', href: ProfileUrlConfig.PAGES.MAIN, icon: UserCircle },
    ]
  }
];

export default function SuperadminSidebar({ isCollapsed, setIsCollapsed }: SuperadminSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Closes the mobile drawer whenever the route changes to avoid stale open state.
  useEffect(() => {
    Promise.resolve().then(() => setIsMobileOpen(false));
  }, []);

  const filteredNavGroups = useMemo(() => {
    if (!searchQuery.trim()) return ALL_NAV_GROUPS;
    const lowerQuery = searchQuery.toLowerCase();
    return ALL_NAV_GROUPS
      .map(group => ({
        ...group,
        items: group.items.filter(item => item.name.toLowerCase().includes(lowerQuery))
      }))
      .filter(group => group.items.length > 0);
  }, [searchQuery]);

  async function handleLogout() {
    await logout();
  }

  return (
    <>
      {/* Mobile Backdrop — closes sidebar when tapping outside */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden motion-safe:transition-opacity"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 flex flex-col bg-sidebar border-r border-border motion-safe:transition-all motion-safe:duration-300 ${isCollapsed ? 'lg:w-16' : 'lg:w-60'
          } ${isMobileOpen ? 'w-60 translate-x-0' : 'w-60 -translate-x-full lg:translate-x-0'
          }`}
      >
        {/* Logo / Branding Header */}
        <div className="flex h-20 items-center justify-between px-4 border-b border-border shrink-0">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <Gauge className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-base font-bold text-foreground leading-tight block">GymSmart 360</span>
                <span className="text-xs text-secondary leading-none">SuperAdmin</span>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
              <Gauge className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Collapse Toggle Button */}
        <div className="hidden lg:flex items-center justify-end px-4 py-2 border-b border-border">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="p-1.5 rounded-lg text-secondary hover:text-foreground hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Search Box */}
        {!isCollapsed ? (
          <div className="px-4 py-3 border-b border-border shrink-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-secondary" />
              </div>
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-9 pr-3 py-2 border border-border rounded-lg leading-5 bg-input text-foreground placeholder-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary sm:text-sm motion-safe:transition-colors"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center px-4 py-3 border-b border-border shrink-0">
            <button
              onClick={() => setIsCollapsed(false)}
              aria-label="Search menu"
              className="p-2 rounded-lg text-secondary hover:text-foreground hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Navigation Groups */}
        <nav className="flex-1 space-y-4 overflow-y-auto p-3 custom-scrollbar" aria-label="Sidebar navigation">
          <SuperadminSidebarNavSection navGroups={filteredNavGroups} isCollapsed={isCollapsed} />
        </nav>

        {/* Sidebar Footer — Logout */}
        <div className="shrink-0 border-t border-border p-3">
          <button
            onClick={handleLogout}
            aria-label="Logout from SaaS Panel"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:text-danger hover:bg-danger-bg motion-safe:transition-all motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger ${isCollapsed ? 'justify-center' : ''
              }`}
          >
            <LogOut className="w-5 h-5 shrink-0" strokeWidth={2} />
            {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
