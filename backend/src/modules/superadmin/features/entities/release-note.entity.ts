import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

/**
 * ReleaseNote entity — represents a versioned product changelog entry
 * that can be drafted and then published to all gym tenants.
 */
@Entity('superadmin_release_notes')
export class ReleaseNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Semantic version tag, e.g. "v2.6.1" */
  @Column({ type: 'varchar', length: 50 })
  @Index()
  version: string;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  /** Supports markdown content */
  @Column({ type: 'text' })
  content: string;

  /** The publish date — set when isPublished is toggled to true */
  @Column({ type: 'timestamp', nullable: true })
  date: Date | null;

  /** Draft = false, visible to tenants = true */
  @Column({ name: 'is_published', type: 'boolean', default: false })
  @Index()
  isPublished: boolean;

  // Soft delete support (Rule 29)
  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
