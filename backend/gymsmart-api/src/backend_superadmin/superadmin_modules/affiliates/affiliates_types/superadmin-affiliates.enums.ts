// RESPONSIBILITY: Defines runtime-safe finite values for the affiliates feature.
// FLOW: Constants/enums -> DTO validation -> entity persistence -> affiliate services.

export const AffiliatesSortFields = ['createdAt', 'updatedAt'] as const;
