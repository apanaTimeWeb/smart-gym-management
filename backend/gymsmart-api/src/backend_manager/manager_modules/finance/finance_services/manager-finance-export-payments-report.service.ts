// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { randomUUID } from 'node:crypto';

import { Injectable } from '@nestjs/common';

import { ManagerCoreRequestContextService } from '@/backend_manager/manager_core/manager_core_context/manager-core-request-context.service';
import { ManagerCoreRedisService } from '@/backend_manager/manager_core/manager_core_database/manager-core-redis.service';

import { FinanceExportFormat } from '@/backend_manager/manager_modules/finance/manager-finance.constants';
import { FinanceRepository } from '@/backend_manager/manager_modules/finance/manager-finance.repository';

import type { FinanceQueryDto } from '@/backend_manager/manager_modules/finance/finance_dtos/manager-finance-query.dto';

export interface FinanceExportDownloadArtifact { buffer: Buffer; contentType: string; fileName: string; }
interface StoredFinanceExport { format: FinanceExportFormat; contentBase64: string; fileName: string; }

@Injectable()
export class ManagerFinanceExportPaymentsReportService {
  private static readonly TTL_SECONDS = 900;
  constructor(private readonly repository: FinanceRepository, private readonly redis: ManagerCoreRedisService, private readonly context: ManagerCoreRequestContextService) {}

  /** @description Generates a tenant-scoped CSV or PDF export. @param query - Export format and filters. @returns Download URL. */
  async createPaymentsReportExport(query: FinanceQueryDto): Promise<{ url: string }> {
    const format = query.format ?? FinanceExportFormat.CSV;
    const result = await this.repository.findAll({ ...query, __unbounded: true });
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    const buffer = format === FinanceExportFormat.PDF ? this.toPdf(rows) : this.toCsv(rows);
    const artifactId = randomUUID();
    const ctx = this.context.get();
    const artifact: StoredFinanceExport = { format, contentBase64: buffer.toString('base64'), fileName: `manager-finance-${artifactId}.${format}` };
    await this.redis.getClient().set(this.key(ctx.tenantId ?? 'unknown', ctx.actorId ?? 'unknown', artifactId), JSON.stringify(artifact), 'EX', ManagerFinanceExportPaymentsReportService.TTL_SECONDS);
    return { url: `/api/v1/manager/finance/export/${artifactId}` };
  }

  /** @description Retrieves a previously generated artifact, scoped to the current tenant and actor. @param artifactId - Artifact UUID. @returns Downloadable artifact or null. */
  async findExportArtifact(artifactId: string): Promise<FinanceExportDownloadArtifact | null> {
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

  /** @description Creates a multipage PDF report without truncating export rows. @param rows - Export rows. @returns PDF bytes. */
  private toPdf(rows: Array<Record<string, unknown>>): Buffer {
    const chunks = this.chunkRows(rows, 45);
    const streams = chunks.map((chunk) => this.toPdfStream(chunk));
    return this.buildPdf(streams);
  }

  /** @description Splits export rows into deterministic PDF page chunks. @param rows - Export rows. @param pageSize - Rows per page. @returns Page-sized row chunks. */
  private chunkRows(rows: Array<Record<string, unknown>>, pageSize: number): Array<Array<Record<string, unknown>>> {
    const source = rows.length ? rows : [{}];
    const chunks: Array<Array<Record<string, unknown>>> = [];
    for (let index = 0; index < source.length; index += pageSize) chunks.push(source.slice(index, index + pageSize));
    return chunks;
  }

  /** @description Renders one PDF content stream. @param rows - Rows for one page. @returns PDF stream text. */
  private toPdfStream(rows: Array<Record<string, unknown>>): string {
    const lines = rows.map((row) => Object.entries(row).map(([key, value]) => `${key}: ${String(value ?? '')}`).join(' | ').replace(/[()\\]/g, ' '));
    return ['BT','/F1 8 Tf','36 760 Td',...lines.flatMap((line,index)=>[index?'0 -14 Td':'',`(${line.slice(0,175)}) Tj`]),'ET'].filter(Boolean).join('\n');
  }

  /** @description Builds a minimal multipage PDF container around content streams. @param streams - PDF page content streams. @returns PDF bytes. */
  private buildPdf(streams: string[]): Buffer {
    const pageIds = streams.map((_, index) => 3 + index * 2);
    const fontId = 3 + streams.length * 2;
    const objects = this.buildPdfObjects(streams, pageIds, fontId);
    let pdf = '%PDF-1.4\n'; const offsets: number[] = [0];
    for (const object of objects) { offsets.push(Buffer.byteLength(pdf, 'utf8')); pdf += `${object}\n`; }
    const xref = Buffer.byteLength(pdf, 'utf8');
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (let index = 1; index < offsets.length; index += 1) pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`;
    return Buffer.from(`${pdf}trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`, 'utf8');
  }

  /** @description Creates PDF object definitions for all pages and the Helvetica font. @param streams - Page content streams. @param pageIds - Page object identifiers. @param fontId - Font object identifier. @returns PDF objects. */
  private buildPdfObjects(streams: string[], pageIds: number[], fontId: number): string[] {
    const objects: string[] = [];
    objects.push('1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj');
    objects.push(`2 0 obj << /Type /Pages /Count ${streams.length} /Kids [${pageIds.map((id)=>`${id} 0 R`).join(' ')}] >> endobj`);
    for (let index = 0; index < streams.length; index += 1) {
      const pageId = pageIds[index]; const contentId = pageId + 1;
      objects.push(`${pageId} 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >> endobj`);
      objects.push(`${contentId} 0 obj << /Length ${Buffer.byteLength(streams[index], 'utf8')} >> stream\n${streams[index]}\nendstream endobj`);
    }
    objects.push(`${fontId} 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj`);
    return objects;
  }

  /** @description Creates the tenant- and actor-scoped Redis artifact key. @param tenantId - Trusted tenant ID. @param actorId - Trusted actor ID. @param artifactId - Export artifact UUID. @returns Deterministic Redis key. */
  private key(tenantId: string, actorId: string, artifactId: string): string { return `manager:finance:export:${tenantId}:${actorId}:${artifactId}`; }
}

export { ManagerFinanceExportPaymentsReportService as FinanceExportPaymentsReportService };
