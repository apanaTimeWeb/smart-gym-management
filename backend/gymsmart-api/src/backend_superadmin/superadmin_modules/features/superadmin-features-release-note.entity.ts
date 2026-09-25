// RESPONSIBILITY: Persists feature release notes independently from feature flag state.
// FLOW: Features release-note service -> SuperadminFeaturesReleaseNoteEntity -> PostgreSQL `feature_release_notes`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
/**
 * Primary Intent: Defines SuperadminFeaturesReleaseNoteEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_feature_release_notes')
@Index('IDX_feature_release_notes_date', ['date'])
export class SuperadminFeaturesReleaseNoteEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property version. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'version', type: 'varchar', length: 100 }) version!: string;
  /**
 * Primary Intent: Documents entity property title. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'title', type: 'varchar', length: 200 }) title!: string;
  /**
 * Primary Intent: Documents entity property content. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'content', type: 'text' }) content!: string;
  /**
 * Primary Intent: Documents entity property date. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'date', type: 'timestamptz' }) date!: Date;
  /**
 * Primary Intent: Documents entity property isPublished. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'is_published', type: 'boolean', default: false }) isPublished!: boolean;
}
