// RESPONSIBILITY: Owns the zero-business Admin density context instance.
// DATA FLOW: AdminLayoutDensityProvider → AdminLayoutDensityContext → shell density controls.
"use client";
import { createContext } from 'react';
import type { AdminDensityContextValue } from '@/app/frontend_admin/admin_layout/admin_layout_types/AdminLayoutTypes';

export const AdminLayoutDensityContext = createContext<AdminDensityContextValue | null>(null);
