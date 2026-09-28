// RESPONSIBILITY: Proves canonical sanitization behavior for HTML removal and identifier normalization.
// FLOW: Raw nested input -> sanitization pipe -> strict transformed value.
import { ManagerCoreInputSanitizationPipe } from '@/backend_manager/manager_core/manager_core_http/manager-core-input-sanitization.pipe';

describe('ManagerCoreInputSanitizationPipe', () => {
  it('normalizes email/phone and removes markup before validation', () => {
    const pipe = new ManagerCoreInputSanitizationPipe();
    const input = { email: '  USER@EXAMPLE.COM ', phone: ' +91 (987) 654-3210 ', profile: { mobile: '<b>987-654</b>' } };
    const sanitized = (pipe as unknown as { sanitize(value: unknown): unknown }).sanitize(input) as Record<string, unknown>;
    expect(sanitized.email).toBe('user@example.com');
    expect(sanitized.phone).toBe('+919876543210');
    expect((sanitized.profile as Record<string, unknown>).mobile).toBe('987654');
  });
});
