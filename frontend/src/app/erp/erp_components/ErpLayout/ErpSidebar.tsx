'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getUser } from '@/lib/api';
import { ERP_NAV_ITEMS } from '@/app/erp/erp_utils/ErpSharedConstants';

interface ErpSidebarProps {
 isCollapsed: boolean;
 setIsCollapsed: (v: boolean) => void;
}

export default function ErpSidebar({ isCollapsed, setIsCollapsed }: ErpSidebarProps) {
 const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const user = getUser();

  useEffect(() => {
    setMounted(true);
  }, []);

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

 // Close mobile sidebar on route change
 useEffect(() => {
 setIsMobileOpen(false);
 }, [pathname]);

 return (
 <>
 {/* Mobile Backdrop */}
 {isMobileOpen && (
 <div 
 className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity" 
 onClick={() => setIsMobileOpen(false)} 
 />
 )}

 <aside className={`fixed left-0 top-0 h-full bg-sidebar border-r border-border z-50 flex flex-col transition-all duration-300 ${
 isCollapsed ? 'lg:w-[92px]' : 'lg:w-64'
 } ${
 isMobileOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0'
 }`}>
 
 {/* Logo & Toggle */}
 <div className="flex items-center justify-center px-4 py-5 border-b border-border">
 <div className="flex items-center gap-3 overflow-hidden">
 <Image src="/logo.png" alt="GymSmart ERP" width={44} height={44} className="object-contain min-w-[44px] rounded-lg" />
 {(!isCollapsed || isMobileOpen) && (
 <div className="whitespace-nowrap transition-opacity duration-300 flex flex-col">
 <span className="text-foreground font-bold text-lg leading-tight tracking-tight">GymSmart</span>
 <span className="text-[10px] text-warning font-bold uppercase tracking-wider -mt-0.5">ERP System</span>
 </div>
 )}
 </div>
 </div>

 {/* Nav */}
 <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
 {ERP_NAV_ITEMS.map((item) => {
 const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
 const Icon = item.icon;
 // On mobile, it's always full width (not collapsed layout)
 const showLabel = !isCollapsed || isMobileOpen;
 
 return (
 <Link key={item.href} href={item.href} title={!showLabel ? item.label : ''}
 className={`flex items-center gap-3 py-2.5 rounded-xl font-medium transition-all duration-200 group cursor-pointer ${
 !showLabel ? 'justify-center px-0' : 'px-3.5'
 } ${
 active
 ? 'text-white border border-transparent shadow-lg'
 : 'text-secondary hover:text-primary hover:bg-primary-subtle'
 }`} style={active ? { background: 'var(--primary)' } : {}}>
 <Icon size={22} className={active ? 'text-white' : 'text-secondary group-hover:text-primary transition-colors'} />
 {showLabel && <span className="text-sm whitespace-nowrap">{item.label}</span>}
 </Link>
 );
 })}
 </nav>

 {/* User */}
 <div className={`px-4 py-4 border-t border-border bg-header flex items-center ${(!isCollapsed || isMobileOpen) ? 'gap-3' : 'justify-center'}`}>
        <div className="w-10 h-10 min-w-[40px] rounded-full flex items-center justify-center text-white text-sm font-bold border border-white/10" style={{ background: 'var(--primary)' }}>
          {mounted ? (user?.name?.charAt(0)?.toUpperCase() || 'A') : 'A'}
        </div>
        {(!isCollapsed || isMobileOpen) && (
          <div className="whitespace-nowrap overflow-hidden flex-1">
            <div className="text-foreground text-sm font-bold truncate">{mounted ? (user?.name || 'Admin User') : 'Admin User'}</div>
            <div className="text-secondary text-xs truncate">{mounted ? (user?.role || 'Super Admin') : 'Super Admin'}</div>
          </div>
        )}
 </div>
 </aside>
 </>
 );
}
