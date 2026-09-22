// RESPONSIBILITY: Defines finite infrastructure enum values used across authentication, tenancy, and delivery policies.
// FLOW: DTO/entity fields → typed enum values → DB/API contract.


export enum CoreRole { TRAINER = 'TRAINER', MANAGER = 'MANAGER', ADMIN = 'ADMIN', MEMBER = 'MEMBER' }
export enum CoreDeliveryMedium { WHATSAPP = 'WHATSAPP', EMAIL = 'EMAIL', SMS = 'SMS' }
