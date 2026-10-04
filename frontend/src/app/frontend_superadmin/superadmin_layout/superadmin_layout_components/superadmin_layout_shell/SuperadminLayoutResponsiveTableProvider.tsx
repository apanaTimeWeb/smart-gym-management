// RESPONSIBILITY: Renders/orchestrates SuperadminLayoutResponsiveTableProvider within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminLayoutResponsiveTableProvider owned by the SuperadminLayoutStyles feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useEffect
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Applies the documented <768px Superadmin table card-stack presentation while preserving semantic table markup.
import { useEffect } from 'react';

const STYLE_ID = 'superadmin-responsive-table-styles';
const STYLE_TEXT = `
@media (max-width: 767px) {
  table[data-superadmin-responsive-table] {
    display: block;
    width: 100%;
  }
  table[data-superadmin-responsive-table] thead {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  table[data-superadmin-responsive-table] tbody {
    display: block;
  }
  table[data-superadmin-responsive-table] tbody tr {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    padding: 0.9rem 1rem;
    border-bottom: 1px solid var(--border);
  }
  table[data-superadmin-responsive-table] tbody td {
    display: grid;
    grid-template-columns: minmax(7rem, 38%) minmax(0, 1fr);
    align-items: start;
    gap: 0.75rem;
    padding: 0.45rem 0;
    min-width: 0;
    white-space: normal;
  }
  table[data-superadmin-responsive-table] tbody td[data-label]::before {
    content: attr(data-label);
    color: var(--text-secondary);
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  table[data-superadmin-responsive-table] tbody td[colspan] {
    display: block;
    text-align: center;
  }
  table[data-superadmin-responsive-table] tbody td[colspan]::before {
    content: none;
  }
  table[data-superadmin-responsive-table] tbody td > * {
    min-width: 0;
  }
}
`;

function annotateTables(root: ParentNode = document) {
  root.querySelectorAll<HTMLTableElement>('table[data-superadmin-responsive-table]').forEach((table) => {
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
 * @description Owns the SuperadminLayoutResponsiveTableProvider responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminLayoutResponsiveTableProvider() {
// EFFECT: Synchronizes this component effect with its declared React dependencies in SuperadminLayoutStyles/SuperadminLayout/SuperadminLayoutResponsiveTableProvider.tsx.
  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = STYLE_TEXT;
      document.head.appendChild(style);
    }

    annotateTables();
    const observer = new MutationObserver(() => annotateTables());
    observer.observe(document.body, { childList: true, subtree: true });
    const resizeHandler = () => annotateTables();
    window.addEventListener('resize', resizeHandler);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resizeHandler);
      document.getElementById(STYLE_ID)?.remove();
    };
  }, []);

  return null;
}
