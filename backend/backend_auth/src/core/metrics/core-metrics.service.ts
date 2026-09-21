// RESPONSIBILITY: Collects real Prometheus request and process metrics for the application observability surface.
// FLOW: CoreMetricsInterceptor -> CoreMetricsService -> Prometheus Registry -> /metrics.

import { Injectable } from '@nestjs/common';

import type { OnModuleInit } from '@nestjs/common';
import { Counter, Gauge, Histogram, Registry, collectDefaultMetrics } from '@prometheus-io/client';

import type { Pool } from 'pg';
import type { DataSource } from 'typeorm';
@Injectable()
export class CoreMetricsService implements OnModuleInit {
  private readonly postgresPool?: Pool;
  private readonly registry = new Registry();
  private readonly requestCount = new Counter({
    name: 'smartgym_http_requests_total',
    help: 'Total HTTP requests handled by the application.',
    labelNames: ['method', 'route', 'status_code'] as const,
    registers: [this.registry],
  });
  private readonly requestErrors = new Counter({
    name: 'smartgym_http_errors_total',
    help: 'Total HTTP requests that completed with 4xx or 5xx status.',
    labelNames: ['method', 'route', 'status_code'] as const,
    registers: [this.registry],
  });
  private readonly requestDuration = new Histogram({
    name: 'smartgym_http_request_duration_seconds',
    help: 'HTTP request latency in seconds.',
    labelNames: ['method', 'route', 'status_code'] as const,
    buckets: [0.05, 0.1, 0.2, 0.5, 1, 2, 5],
    registers: [this.registry],
  });
  private readonly activeRequests = new Gauge({
    name: 'smartgym_http_active_requests',
    help: 'Current number of in-flight HTTP requests.',
    registers: [this.registry],
  });

  constructor(dataSource: DataSource) {
    const driver = dataSource.driver as unknown as { master?: unknown };
    this.postgresPool = driver.master as Pool | undefined;
  }

  private readonly dbPoolTotal = new Gauge({
    name: 'smartgym_db_pool_connections_total',
    help: 'Current PostgreSQL pool connection count.',
    registers: [this.registry],
  });
  private readonly dbPoolIdle = new Gauge({
    name: 'smartgym_db_pool_connections_idle',
    help: 'Current idle PostgreSQL pool connection count.',
    registers: [this.registry],
  });
  private readonly dbPoolWaiting = new Gauge({
    name: 'smartgym_db_pool_waiting_clients',
    help: 'Current PostgreSQL clients waiting for a pool connection.',
    registers: [this.registry],
  });
  private readonly queueDepth = new Gauge({
    name: 'smartgym_queue_depth',
    help: 'Current background-job queue depth. Zero is expected until a queue is introduced by a feature that requires one.',
    labelNames: ['queue'] as const,
    registers: [this.registry],
  });

  /** @description Registers Node process/default metrics in the dedicated application registry. @returns void. */
  onModuleInit(): void {
    collectDefaultMetrics({ register: this.registry });
    this.queueDepth.labels({ queue: 'none' }).set(0);
    this.refreshDatabasePoolMetrics();
  }

  /** @description Marks the beginning of one HTTP request. @returns void. */
  startRequest(): void {
    this.activeRequests.inc();
  }

  /** @description Records one completed HTTP request and its latency. @param method - HTTP method. @param route - Matched route template. @param statusCode - Final HTTP status. @param durationMs - Request duration in milliseconds. @returns void. */
  endRequest(method: string, route: string, statusCode: number, durationMs: number): void {
    const labels = { method, route, status_code: String(statusCode) };
    this.requestCount.inc(labels);
    if (statusCode >= 400) this.requestErrors.inc(labels);
    this.requestDuration.observe(labels, durationMs / 1000);
    this.refreshDatabasePoolMetrics();
    this.activeRequests.dec();
  }

  /** @description Refreshes PostgreSQL pool gauges from the live driver pool without querying business data. @returns void. */
  private refreshDatabasePoolMetrics(): void {
    const pool = this.postgresPool;
    if (!pool) return;
    this.dbPoolTotal.set(pool.totalCount);
    this.dbPoolIdle.set(pool.idleCount);
    this.dbPoolWaiting.set(pool.waitingCount);
  }

  /** @description Returns current Prometheus text exposition output. @returns Prometheus metrics text. */
  async metrics(): Promise<string> {
    return this.registry.metrics();
  }
}
