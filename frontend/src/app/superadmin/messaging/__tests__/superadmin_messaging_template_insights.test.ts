import { describe, expect, it } from 'vitest';
import { SuperadminMessagingV1DataSchema } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingV1Types';
import { SUPERADMIN_MESSAGING_TEMPLATE_INSIGHTS_MOCK_FIXTURE } from '@/app/superadmin/messaging/messaging_mocks/fixtures/SuperadminMessagingV1MockFixtures';
describe('Message Templates & Campaign Results contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminMessagingV1DataSchema.safeParse(SUPERADMIN_MESSAGING_TEMPLATE_INSIGHTS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
