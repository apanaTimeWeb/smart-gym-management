import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

/**
 * Setting entity — key-value store for superadmin platform-wide configuration.
 * Examples: platform name, support email, maintenance mode flag, etc.
 */
@Entity('superadmin_settings')
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Unique setting key, e.g. "platform.maintenanceMode" */
  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()
  key: string;

  /** The setting value serialized as a string (could be JSON for complex types) */
  @Column({ type: 'text' })
  value: string;

  /** Human-readable description of what this setting controls */
  @Column({ type: 'text', nullable: true })
  description: string | null;

  /** Setting group/category for UI grouping, e.g. "security", "billing", "notifications" */
  @Column({ type: 'varchar', length: 100, default: 'general' })
  @Index()
  category: string;

  /** Whether this setting is sensitive and should be masked in UI/logs */
  @Column({ name: 'is_sensitive', type: 'boolean', default: false })
  isSensitive: boolean;

  /** Data type hint for UI rendering: "string" | "boolean" | "number" | "json" */
  @Column({ name: 'data_type', type: 'varchar', length: 50, default: 'string' })
  dataType: string;

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
