import { describe, expect, it } from 'vitest';
import { generateDefaultMessage, INQUIRIES_STATUS_LABELS, INQUIRIES_TABLE_HEADERS, formatInquiryTime } from '@/app/manager/inquiries/inquiries_utils/ManagerInquiriesSharedConstants';


describe('ManagerInquiriesSharedConstants', () => {
  it('generates the documented default inquiry follow-up text', () => {
    expect(generateDefaultMessage('Asha', 'weight loss')).toContain('Asha');
    expect(generateDefaultMessage('Asha', 'weight loss')).toContain('weight loss');
  });

  it('keeps status labels and table structure stable', () => {
    expect(INQUIRIES_STATUS_LABELS.NEW).toBe('New');
    expect(INQUIRIES_STATUS_LABELS.CONVERTED).toBe('Converted');
    expect(INQUIRIES_TABLE_HEADERS).toHaveLength(6);
    expect(formatInquiryTime('2026-01-15T10:30:00Z')).toMatch(/\d/);
  });
});
