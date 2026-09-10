import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useManagerMembersLogic } from './useManagerMembersLogic';

// Mock useRouter and useSearchParams
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/manager/members',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock mutations
vi.mock('./useManagerMembersMutations', () => ({
  useManagerMembersMutations: () => ({
    saveMember: vi.fn(),
    deleteMember: vi.fn(),
  }),
}));

describe('useManagerMembersLogic', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useManagerMembersLogic());
    
    expect(result.current.search).toBe('');
    expect(result.current.statusFilter).toBe('All');
    expect(result.current.sortColumn).toBe('name');
    expect(result.current.sortDirection).toBe('asc');
    expect(result.current.showAddModal).toBe(false);
  });
});
