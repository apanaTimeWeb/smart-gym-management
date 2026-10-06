"use client";
// RESPONSIBILITY: Applies the documented <768px Admin table card-stack presentation while preserving semantic table markup.
import { useEffect } from 'react';
import styles from '@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutResponsiveTableProvider.module.css';

const STYLE_ID = 'admin-responsive-table-styles';

/**
 * annotateTables is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function annotateTables(root: ParentNode = document) {
  root.querySelectorAll<HTMLTableElement>('table[data-admin-responsive-table]').forEach((table) => {
    const headerCells = Array.from(table.querySelectorAll<HTMLTableCellElement>('thead tr:first-child th'));
    const labels = headerCells.map((cell) => cell.textContent?.trim() || '');
    table.querySelectorAll<HTMLTableRowElement>('tbody tr').forEach((row) => {
      let columnIndex = 0;
      Array.from(row.children).forEach((child) => {
        if (!(child instanceof HTMLTableCellElement)) return;
        if (child.hasAttribute('colspan')) return;
        const label = labels[columnIndex];
        if (!child.hasAttribute('data-label') && label) {
          child.setAttribute('data-label', label);
        }
        columnIndex += child.colSpan || 1;
      });
    });
  });
}

/**
 * AdminLayoutResponsiveTableProvider renders the admin responsive table provider UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminLayoutResponsiveTableProvider() {
  // EFFECT: Annotates mounted tables after route changes so responsive semantics remain available without owning feature data.
  useEffect(() => {
    document.documentElement.classList.add(styles.responsiveTableScope);
    annotateTables();
    const observer = new MutationObserver(() => annotateTables());
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
