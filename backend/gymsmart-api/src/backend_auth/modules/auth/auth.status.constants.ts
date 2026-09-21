// RESPONSIBILITY: Defines finite Auth account states enforced by TypeScript, DTOs and PostgreSQL.
// FLOW: AuthUserStatus -> AuthUserEntity -> migration -> service guard clauses.

export enum AuthUserStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
}
