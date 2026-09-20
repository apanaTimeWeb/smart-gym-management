// RESPONSIBILITY: Type contract extracted from SuperadminSidebar.tsx; no business behavior.

import type { Dispatch, SetStateAction } from 'react';

export interface SuperadminSidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}
