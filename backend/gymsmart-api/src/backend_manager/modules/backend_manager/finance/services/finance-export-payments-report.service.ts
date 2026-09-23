// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { randomUUID } from 'node:crypto';

import { Injectable } from '@nestjs/common';

import { CoreRequestContextService } from '@/backend_manager/core/context/core-request-context.service';
import { CoreRedisService } from '@/backend_manager/core/database/core-redis.service';

import { FinanceExportFormat } from '@/backend_manager/modules/backend_manager/finance/finance.constants';
import { FinanceRepository } from '@/backend_manager/modules/backend_manager/finance/repositories/finance-repository';

import type { FinanceQueryDto } from '@/backend_manager/modules/backend_manager/finance/dtos/finance-query.dto';

export interface FinanceExportDownloadArtifact { buffer: Buffer; contentType: string; fileName: string; }
interface StoredFinanceExport { format: FinanceExportFormat; contentBase64: string; fileName: string; }

@Injectable()
export class FinanceExportPaymentsReportService {
  private static readonly TTL_SECONDS = 900;
  constructor(private readonly repository: FinanceRepository, private readonly redis: CoreRedisService, private readonly context: CoreRequestContextService) {}

  /** @description Generates a tenant-scoped CSV or PDF export. @param query - Export format and filters. @returns Download URL. */
  async exportPaymentsReport(query: FinanceQueryDto): Promise<{ url: string }> {
    const format = query.format ?? FinanceExportFormat.CSV;
    const result = await this.repository.findFinanceList(query as any);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    const buffer = format === FinanceExportFormat.PDF ? this.toPdf(rows) : this.toCsv(rows);
    const artifactId = randomUUID();
    const ctx = this.context.get();
    const artifact: StoredFinanceExport = { format, contentBase64: buffer.toString('base64'), fileName: `manager-finance-${artifactId}.${format}` };
    await this.redis.getClient().set(this.key(ctx.tenantId ?? 'unknown', ctx.actorId ?? 'unknown', artifactId), JSON.stringify(artifact), 'EX', FinanceExportPaymentsReportService.TTL_SECONDS);
    return { url: `/api/v1/manager/finance/export/${artifactId}` };
  }

  /** @description Retrieves a previously generated artifact, scoped to the current tenant and actor. @param artifactId - Artifact UUID. @returns Downloadable artifact or null. */
  async getExportArtifact(artifactId: string): Promise<FinanceExportDownloadArtifact | null> {
    const ctx = this.context.get();
    const raw = await this.redis.getClient().get(this.key(ctx.tenantId ?? 'unknown', ctx.actorId ?? 'unknown', artifactId));
    if (!raw) return null;
    const artifact = JSON.parse(raw) as StoredFinanceExport;
    return { buffer: Buffer.from(artifact.contentBase64, 'base64'), contentType: artifact.format === FinanceExportFormat.PDF ? 'application/pdf' : 'text/csv', fileName: artifact.fileName };
  }

  /** @description Creates a deterministic CSV document. @param rows - Export rows. @returns CSV bytes. */
  private toCsv(rows: Array<Record<string, unknown>>): Buffer {
    const keys = [...new Set(rows.flatMap((row) => Object.keys(row)))].sort();
    const lines = [keys.join(',')];
    for (const row of rows) lines.push(keys.map((key) => this.csvCell(row[key])).join(','));
    return Buffer.from(lines.join('\n'), 'utf8');
  }

  /** @description Escapes one CSV cell. @param value - Cell value. @returns CSV-safe cell text. */
  private csvCell(value: unknown): string {
    const text = value == null ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value);
    return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  }

  /** @description Creates a minimal valid one-page PDF report without introducing a new runtime dependency. @param rows - Export rows. @returns PDF bytes. */
  private toPdf(rows: Array<Record<string, unknown>>): Buffer {
    const lines = rows.slice(0, 45).map((row) => Object.entries(row).map(([key, value]) => `${key}: ${String(value ?? '')}`).join(' | ').replace(/[()\\]/g, ' '));
    const stream = ['BT', '/F1 8 Tf', '36 760 Td', ...lines.flatMap((line, index) => [index ? '0 -14 Td' : '', `(${line.slice(0, 175)}) Tj`]), 'ET'].filter(Boolean).join('\n');
    const objects = [
      '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
      '2 0 obj << /Type /Pages /Count 1 /Kids [3 0 R] >> endobj',
      '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj',
      '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
      `5 0 obj << /Length ${Buffer.byteLength(stream, 'utf8')} >> stream\n${stream}\nendstream endobj`,
    ];
    let pdf = '%PDF-1.4\n';
    const offsets: number[] = [0];
    for (const object of objects) { offsets.push(Buffer.byteLength(pdf, 'utf8')); pdf += `${object}\n`; }
    const xrefOffset = Buffer.byteLength(pdf, 'utf8');
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (let index = 1; index < offsets.length; index += 1) pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`;
    pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
    return Buffer.from(pdf, 'utf8');
  }

  /** @description Creates the tenant- and actor-scoped Redis artifact key. @param tenantId - Trusted tenant ID. @param actorId - Trusted actor ID. @param artifactId - Export artifact UUID. @returns Deterministic Redis key. */
  private key(tenantId: string, actorId: string, artifactId: string): string { return `manager:finance:export:${tenantId}:${actorId}:${artifactId}`; }
}
