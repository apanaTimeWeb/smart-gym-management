// RESPONSIBILITY: Persists feature release notes independently from feature flag state.
// FLOW: Features release-note service -> SuperadminFeaturesReleaseNoteEntity -> PostgreSQL `feature_release_notes`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.entity';
@Entity('superadmin_feature_release_notes')
@Index('IDX_feature_release_notes_date', ['date'])
export class SuperadminFeaturesReleaseNoteEntity extends BaseEntity {
  @Column({ name: 'version', type: 'varchar', length: 100 }) version!: string;
  @Column({ name: 'title', type: 'varchar', length: 200 }) title!: string;
  @Column({ name: 'content', type: 'text' }) content!: string;
  @Column({ name: 'date', type: 'timestamptz' }) date!: Date;
  @Column({ name: 'is_published', type: 'boolean', default: false }) isPublished!: boolean;
}