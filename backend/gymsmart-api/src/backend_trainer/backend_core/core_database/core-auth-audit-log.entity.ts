// RESPONSIBILITY: Maps master-database authentication security events such as login failures and lockouts.
// FLOW: Auth service → core auth audit repository → core_auth_audit_logs.

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 /**
 * Intent: Defines the CoreAuthAuditLogEntity boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Entity('core_auth_audit_logs') export class CoreAuthAuditLogEntity { @PrimaryGeneratedColumn('uuid') id!:string; @Column({name:'user_id',type:'uuid',nullable:true}) userId!:string|null; @Column({type:'varchar',length:64}) action!:string; @Column({type:'varchar',length:64,nullable:true}) identifierHash!:string|null; @Column({name:'created_at',type:'timestamptz',default:()=> 'now()'}) createdAt!:Date; }
