// RESPONSIBILITY: Defines isolated shared type contracts for a single backend concern.
// FLOW: Typed producer/consumer boundary → compile-time contract only; no runtime business behavior.

export interface CoreDatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  extra: { max: number; connectionTimeoutMillis: number; idleTimeoutMillis: number; statement_timeout: number };
}
