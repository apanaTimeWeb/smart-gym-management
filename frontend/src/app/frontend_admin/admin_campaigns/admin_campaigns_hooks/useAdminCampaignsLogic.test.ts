import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminCampaignsLogic } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_hooks/useAdminCampaignsLogic';

const queries = [
  { data: { data: [{ id: 'aud1', name: 'Active' }] }, status: 'success', error: null },
  { data: { data: [{ id: 'tpl1', body: 'Hello {{name}}' }] }, status: 'success', error: null },
  { data: { data: { recipients: [{ id: 'r1', name: 'Riya', phone: '9876543210' }] } }, status: 'success', error: null },
];
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));

describe('useAdminCampaignsLogic', () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockReset();
    queries.forEach((q) => vi.mocked(useQuery).mockReturnValueOnce(q as never));
  });

  it('selects a template, creates a recipient queue, and exposes its status transitions', () => {
    const { result } = renderHook(() => useAdminCampaignsLogic());
    act(() => result.current.selectAudience('aud1'));
    act(() => result.current.selectTemplate('tpl1'));
    expect(result.current.body).toBe('Hello {{name}}');
    act(() => {
      result.current.setBody('Hello Riya');
      expect(result.current.createQueue()).toBe(true);
    });
    expect(result.current.queue).toHaveLength(1);
  });
});
