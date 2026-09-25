// RESPONSIBILITY: Generates paginated CSV content and packages it as a ZIP for Superadmin exports.
// FLOW: Export worker -> archive service -> archive repository -> protected ZIP bytes.
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomUUID } from 'node:crypto';
import { deflateRawSync } from 'node:zlib';
import { SuperadminExportDataArchiveRepository } from '@/backend_superadmin/superadmin_modules/export-data/export-data_repositories/superadmin-export-data-archive.repository';
import type { ExportDataResource } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data-request.constants';

const PAGE_SIZE = 500;
/**
 * Primary Intent: Defines the ZipEntry type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface ZipEntry { name: string; content: Buffer; }

/**
 * Primary Intent: Defines SuperadminExportDataArchiveService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminExportDataArchiveService {
  constructor(private readonly repository: SuperadminExportDataArchiveRepository) {}
/**
 * Primary Intent: Executes the build use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the build use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async build(resources: ExportDataResource[], tenantIds: string[], jobId: string): Promise<Buffer> {
    const temp = join(tmpdir(), `gymsmart-export-${jobId}-${randomUUID()}`);
    await fs.mkdir(temp, { recursive: true, mode: 0o700 });
    try { return await this.buildArchive(resources.length ? resources : ['gyms', 'audit_logs', 'invoices', 'settings', 'reports'] as ExportDataResource[], tenantIds, temp); }
    finally { await fs.rm(temp, { recursive: true, force: true }); }
  }

  /**
 * Primary Intent: Executes the `buildArchive` responsibility owned by this superadmin-export-data-archive.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the buildArchive use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async buildArchive(resources: ExportDataResource[], tenantIds: string[], temp: string): Promise<Buffer> {
    const entries: ZipEntry[] = [];
    for (const resource of resources) entries.push(await this.buildCsvEntry(resource, tenantIds, temp));
    return this.createZip(entries);
  }

  /**
 * Primary Intent: Executes the `buildCsvEntry` responsibility owned by this superadmin-export-data-archive.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the buildCsvEntry use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async buildCsvEntry(resource: ExportDataResource, tenantIds: string[], temp: string): Promise<ZipEntry> {
    const fileName = `${resource}.csv`; const filePath = join(temp, fileName);
    let offset = 0; let headerWritten = false;
    while (true) {
      const rows = await this.repository.readPage(resource, tenantIds, offset, PAGE_SIZE);
      if (!rows.length) break;
      await fs.appendFile(filePath, this.rowsToCsv(rows, headerWritten));
      headerWritten = true; offset += rows.length;
      if (rows.length < PAGE_SIZE) break;
    }
    return { name: fileName, content: await fs.readFile(filePath) };
  }

  /**
 * Primary Intent: Executes the `rowsToCsv` responsibility owned by this superadmin-export-data-archive.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the rowsToCsv use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private rowsToCsv(rows: Record<string, unknown>[], includeHeader: boolean): string {
    const keys = Object.keys(rows[0] ?? {}); const header = includeHeader ? '' : `${keys.map(this.escapeCell).join(',')}\n`;
    return header + rows.map((row) => keys.map((key) => this.escapeCell(row[key])).join(',')).join('\n') + '\n';
  }

  /**
 * Primary Intent: Executes the `escapeCell` responsibility owned by this superadmin-export-data-archive.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the escapeCell use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private escapeCell(value: unknown): string { const raw = value === null || value === undefined ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value); return /[",\n\r]/.test(raw) ? `"${raw.replace(/"/g, '""')}"` : raw; }

  /**
 * Primary Intent: Executes the `createZip` responsibility owned by this superadmin-export-data-archive.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the createZip use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private createZip(entries: ZipEntry[]): Buffer {
    const local: Buffer[] = []; const central: Buffer[] = []; let offset = 0;
    for (const entry of entries) { const name = Buffer.from(entry.name); const compressed = deflateRawSync(entry.content); const header = Buffer.alloc(30 + name.length); this.writeLocalHeader(header, name, compressed, entry.content); local.push(header, compressed); const centralHeader = Buffer.alloc(46 + name.length); this.writeCentralHeader(centralHeader, name, compressed, entry.content, offset); central.push(centralHeader); offset += header.length + compressed.length; }
    const body = Buffer.concat(local); const directory = Buffer.concat(central); const end = Buffer.alloc(22); end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(entries.length, 8); end.writeUInt16LE(entries.length, 10); end.writeUInt32LE(directory.length, 12); end.writeUInt32LE(body.length, 16); return Buffer.concat([body, directory, end]);
  }

  /**
 * Primary Intent: Executes the `writeLocalHeader` responsibility owned by this superadmin-export-data-archive.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the writeLocalHeader use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private writeLocalHeader(buffer: Buffer, name: Buffer, compressed: Buffer, raw: Buffer): void { buffer.writeUInt32LE(0x04034b50, 0); buffer.writeUInt16LE(20, 4); buffer.writeUInt16LE(8, 8); buffer.writeUInt32LE(this.crc32(raw), 14); buffer.writeUInt32LE(compressed.length, 18); buffer.writeUInt32LE(raw.length, 22); buffer.writeUInt16LE(name.length, 26); name.copy(buffer, 30); }

  /**
 * Primary Intent: Executes the `writeCentralHeader` responsibility owned by this superadmin-export-data-archive.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the writeCentralHeader use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private writeCentralHeader(buffer: Buffer, name: Buffer, compressed: Buffer, raw: Buffer, offset: number): void { buffer.writeUInt32LE(0x02014b50, 0); buffer.writeUInt16LE(20, 4); buffer.writeUInt16LE(20, 6); buffer.writeUInt16LE(8, 10); buffer.writeUInt32LE(this.crc32(raw), 16); buffer.writeUInt32LE(compressed.length, 20); buffer.writeUInt32LE(raw.length, 24); buffer.writeUInt16LE(name.length, 28); buffer.writeUInt32LE(offset, 42); name.copy(buffer, 46); }

  /**
 * Primary Intent: Executes the `crc32` responsibility owned by this superadmin-export-data-archive.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the crc32 use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private crc32(buffer: Buffer): number { let crc = 0xffffffff; for (const byte of buffer) { crc ^= byte; for (let i = 0; i < 8; i += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1)); } return (crc ^ 0xffffffff) >>> 0; }
}
