import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SuperadminMessagingV1WhatsAppBulkCenter from '@/app/superadmin/messaging/messaging_whatsapp_components/SuperadminMessagingV1WhatsAppBulkCenter';
import { SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE } from '@/app/superadmin/messaging/messaging_whatsapp_mocks/fixtures/SuperadminMessagingV1WhatsAppMockFixtures';
import { createSuperadminWhatsAppCampaign } from '@/app/superadmin/messaging/messaging_whatsapp_api/superadmin_messaging_whatsapp_api';
vi.mock('@/app/superadmin/messaging/messaging_whatsapp_api/superadmin_messaging_whatsapp_api', () => ({
    createSuperadminWhatsAppCampaign: vi.fn(),
}));
const mockedCreateCampaign = vi.mocked(createSuperadminWhatsAppCampaign);
describe('Superadmin tenant Smart Bulk WhatsApp', () => {
    afterEach(() => vi.restoreAllMocks());
    beforeEach(() => {
        mockedCreateCampaign.mockReset();
        mockedCreateCampaign.mockResolvedValue({
            success: true,
            message: 'Tenant WhatsApp queue created.',
            data: SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.campaigns[0]!,
        });
        vi.spyOn(window, 'open').mockImplementation(() => null);
    });
    it('loads tenant audiences, templates, and personalized preview without member targeting', () => {
        render(<SuperadminMessagingV1WhatsAppBulkCenter data={SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE}/>);
        expect(screen.getByRole('heading', { name: 'Smart Bulk WhatsApp' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Subscription Renewal Reminder' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'All Tenant Contacts' })).toHaveAttribute('aria-pressed', 'true');
        expect(screen.getByText('Hi Rahul Mehta,')).toBeInTheDocument();
        expect(screen.getByText(/gym member messaging stays in admin \/ manager/i)).toBeInTheDocument();
    });
    it('auto-selects maintenance audience and builds a tenant queue', async () => {
        render(<SuperadminMessagingV1WhatsAppBulkCenter data={SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE}/>);
        fireEvent.click(screen.getByRole('button', { name: 'Planned Maintenance Notice' }));
        expect(screen.getByRole('button', { name: 'Maintenance / Incident Affected' })).toHaveAttribute('aria-pressed', 'true');
        expect(screen.getByDisplayValue('Planned Smart Gym Maintenance')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Start Tenant WhatsApp Queue' }));
        await waitFor(() => expect(screen.getByText(/Current tenant contact · 1 \/ 2/)).toBeInTheDocument());
        expect(mockedCreateCampaign).toHaveBeenCalledWith(expect.objectContaining({
            audienceId: 'MAINTENANCE_AFFECTED',
            templateId: 'tpl-maintenance',
            recipientIds: ['tc8', 'tc14'],
        }));
    });
    it('opens WhatsApp and advances when the operator marks the chat sent', async () => {
        render(<SuperadminMessagingV1WhatsAppBulkCenter data={{
                ...SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE,
                recipients: SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.recipients.filter((recipient) => recipient.id === 'tc1' || recipient.id === 'tc11'),
            }}/>);
        fireEvent.click(screen.getByRole('button', { name: 'Start Tenant WhatsApp Queue' }));
        await waitFor(() => expect(screen.getByText(/Current tenant contact · 1 \/ 2/)).toBeInTheDocument());
        fireEvent.click(screen.getByRole('button', { name: 'Open WhatsApp' }));
        expect(window.open).toHaveBeenCalledWith(expect.stringContaining('https://wa.me/919810100001?text='), '_blank', 'noopener,noreferrer');
        fireEvent.click(screen.getByRole('button', { name: 'Mark Sent & Next' }));
        expect(await screen.findByText(/Current tenant contact · 2 \/ 2/)).toBeInTheDocument();
        expect(screen.getByText('1 of 2 completed')).toBeInTheDocument();
    });
    it('shows an empty state when all tenant contacts are opted out', () => {
        render(<SuperadminMessagingV1WhatsAppBulkCenter data={{
                ...SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE,
                recipients: SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.recipients.map((recipient) => ({ ...recipient, whatsappOptIn: false })),
            }}/>);
        expect(screen.getByText(/0 tenant contacts match/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Start Tenant WhatsApp Queue' })).toBeDisabled();
    });
});
