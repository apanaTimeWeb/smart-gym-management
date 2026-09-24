// RESPONSIBILITY: Maps affiliate domain data into response-safe API DTOs and never exposes persistence ciphertext.
// FLOW: Domain model -> response mapper -> masked bank details + explicit currency -> controller response.
import { SuperadminAffiliatesResponseDto } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_responses/superadmin-affiliates-response.dto';
import type { SuperadminAffiliatesEntity } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.entity';
import type { SuperadminAffiliatesDomainModel } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_types/superadmin-affiliates.interfaces';

/**
 * Primary Intent: Isolates persistence shape from the domain and frontend response contract.
 * Edge Cases: Encrypted bank details remain masked rather than leaking ciphertext or plaintext.
 * Side-Effects: None.
 * AI-Note: Keep ORM entity types outside business services and do not reintroduce raw persistence data into responses.
 */
export class SuperadminAffiliatesMapper {
  /** Primary Intent: Converts an ORM affiliate entity to an explicit domain model. Edge Cases: Null encrypted bank data remains null. Side-Effects: None. AI-Note: Never mutate the entity during mapping. */
  static toDomain(entity: SuperadminAffiliatesEntity, pendingPayout = 0): SuperadminAffiliatesDomainModel {
    return { id: entity.id, createdAt: entity.createdAt, updatedAt: entity.updatedAt, deletedAt: entity.deletedAt, name: entity.name, email: entity.email, phone: entity.phone, referralCode: entity.referralCode, totalReferred: entity.totalReferred, commissionEarned: entity.commissionEarned, commissionRate: entity.commissionRate, pendingPayout, bankDetails: entity.bankDetails, currency: entity.currency, status: entity.status, joinedAt: entity.joinedAt, referralCount: entity.referralCount, conversionRate: entity.conversionRate };
  }

  /** Primary Intent: Converts a collection of affiliate entities to domain models. Edge Cases: Empty collection returns empty array. Side-Effects: None. AI-Note: Never expose persistence objects directly. */
  static toDomainList(entities: SuperadminAffiliatesEntity[]): SuperadminAffiliatesDomainModel[] { return entities.map(SuperadminAffiliatesMapper.toDomain); }

  /** Primary Intent: Produces a stable frontend response with explicit currency and protected bank metadata. Edge Cases: Null bank metadata becomes a stable protected marker. Side-Effects: None. AI-Note: Response never exposes ciphertext or raw bank account data. */
  /**
 * Primary Intent: Maps this module domain/projection into the stable API response DTO.
 * Edge Cases: Preserve exact field names, nullability, and enum semantics.
 * Side-Effects: Pure mapping only; no persistence or external side effects.
 * AI-Note: Do not add business logic or database access to this mapper.
 */
  static toResponse(domain: SuperadminAffiliatesDomainModel, defaultCurrency: string): SuperadminAffiliatesResponseDto {
    const dto = new SuperadminAffiliatesResponseDto();
    dto.id = domain.id; dto.name = domain.name; dto.email = domain.email; dto.phone = domain.phone; dto.referralCode = domain.referralCode; dto.totalReferred = domain.totalReferred; dto.commissionEarned = domain.commissionEarned; dto.currency = domain.currency || defaultCurrency; dto.commissionRate = domain.commissionRate; dto.pendingPayout = domain.pendingPayout; dto.bankDetails = domain.bankDetails ? '[PROTECTED]' : ''; dto.status = domain.status; dto.joinedAt = domain.joinedAt.toISOString(); dto.referralCount = domain.referralCount; dto.conversionRate = domain.conversionRate;
    return dto;
  }
}
