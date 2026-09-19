"use client";
// RESPONSIBILITY: Applies the documented <768px Admin table card-stack presentation while preserving semantic table markup.
import { useEffect } from 'react';

const STYLE_ID = 'admin-responsive-table-styles';
const STYLE_TEXT = `
@media (max-width: 767px) {
  table[data-admin-responsive-table] {
    display: block;
    width: 100%;
  }
  table[data-admin-responsive-table] thead {
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
  table[data-admin-responsive-table] tbody {
    display: block;
  }
  table[data-admin-responsive-table] tbody tr {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    padding: 0.9rem 1rem;
    border-bottom: 1px solid var(--border);
  }
  table[data-admin-responsive-table] tbody td {
    display: grid;
    grid-template-columns: minmax(7rem, 38%) minmax(0, 1fr);
    align-items: start;
    gap: 0.75rem;
    padding: 0.45rem 0;
    min-width: 0;
    white-space: normal;
  }
  table[data-admin-responsive-table] tbody td[data-label]::before {
    content: attr(data-label);
    color: var(--text-secondary);
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  table[data-admin-responsive-table] tbody td[colspan] {
    display: block;
    text-align: center;
  }
  table[data-admin-responsive-table] tbody td[colspan]::before {
    content: none;
  }
  table[data-admin-responsive-table] tbody td > * {
    min-width: 0;
  }
}
`;

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

export default function AdminResponsiveTableProvider() {
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
