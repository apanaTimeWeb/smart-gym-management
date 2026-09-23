// RESPONSIBILITY: Generates paginated CSV content and packages it as a ZIP for Superadmin exports.
// FLOW: Export worker -> archive service -> archive repository -> protected ZIP bytes.
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomUUID } from 'node:crypto';
import { deflateRawSync } from 'node:zlib';
import { ExportDataArchiveRepository } from '@/backend_superadmin/modules/superadmin/export-data/repositories/export-data-archive.repository';
import type { ExportDataResource } from '@/backend_superadmin/modules/superadmin/export-data/dtos/export-data-request.dto';

const PAGE_SIZE = 500;
interface ZipEntry { name: string; content: Buffer; }

@Injectable()
export class ExportDataArchiveService {
  constructor(private readonly repository: ExportDataArchiveRepository) {}

  /** Builds a ZIP archive containing one CSV per requested resource. */
  async build(resources: ExportDataResource[], tenantIds: string[], jobId: string): Promise<Buffer> {
    const temp = join(tmpdir(), `gymsmart-export-${jobId}-${randomUUID()}`);
    await fs.mkdir(temp, { recursive: true, mode: 0o700 });
    try { return await this.buildArchive(resources.length ? resources : ['gyms', 'audit_logs', 'invoices', 'settings', 'reports'] as ExportDataResource[], tenantIds, temp); }
    finally { await fs.rm(temp, { recursive: true, force: true }); }
  }

  /** Builds every requested CSV and packages all files into one archive. */
  private async buildArchive(resources: ExportDataResource[], tenantIds: string[], temp: string): Promise<Buffer> {
    const entries: ZipEntry[] = [];
    for (const resource of resources) entries.push(await this.buildCsvEntry(resource, tenantIds, temp));
    return this.createZip(entries);
  }

  /** Generates one paginated CSV file for a resource. */
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

  /** Serializes one page of database rows into CSV. */
  private rowsToCsv(rows: Record<string, unknown>[], includeHeader: boolean): string {
    const keys = Object.keys(rows[0] ?? {}); const header = includeHeader ? '' : `${keys.map(this.escapeCell).join(',')}\n`;
    return header + rows.map((row) => keys.map((key) => this.escapeCell(row[key])).join(',')).join('\n') + '\n';
  }

  /** Escapes one CSV cell. */
  private escapeCell(value: unknown): string { const raw = value === null || value === undefined ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value); return /[",\n\r]/.test(raw) ? `"${raw.replace(/"/g, '""')}"` : raw; }

  /** Creates a ZIP archive with Deflate entries and a valid central directory. */
  private createZip(entries: ZipEntry[]): Buffer {
    const local: Buffer[] = []; const central: Buffer[] = []; let offset = 0;
    for (const entry of entries) { const name = Buffer.from(entry.name); const compressed = deflateRawSync(entry.content); const header = Buffer.alloc(30 + name.length); this.writeLocalHeader(header, name, compressed, entry.content); local.push(header, compressed); const centralHeader = Buffer.alloc(46 + name.length); this.writeCentralHeader(centralHeader, name, compressed, entry.content, offset); central.push(centralHeader); offset += header.length + compressed.length; }
    const body = Buffer.concat(local); const directory = Buffer.concat(central); const end = Buffer.alloc(22); end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(entries.length, 8); end.writeUInt16LE(entries.length, 10); end.writeUInt32LE(directory.length, 12); end.writeUInt32LE(body.length, 16); return Buffer.concat([body, directory, end]);
  }

  /** Writes one ZIP local entry header. */
  private writeLocalHeader(buffer: Buffer, name: Buffer, compressed: Buffer, raw: Buffer): void { buffer.writeUInt32LE(0x04034b50, 0); buffer.writeUInt16LE(20, 4); buffer.writeUInt16LE(8, 8); buffer.writeUInt32LE(this.crc32(raw), 14); buffer.writeUInt32LE(compressed.length, 18); buffer.writeUInt32LE(raw.length, 22); buffer.writeUInt16LE(name.length, 26); name.copy(buffer, 30); }

  /** Writes one ZIP central-directory entry. */
  private writeCentralHeader(buffer: Buffer, name: Buffer, compressed: Buffer, raw: Buffer, offset: number): void { buffer.writeUInt32LE(0x02014b50, 0); buffer.writeUInt16LE(20, 4); buffer.writeUInt16LE(20, 6); buffer.writeUInt16LE(8, 10); buffer.writeUInt32LE(this.crc32(raw), 16); buffer.writeUInt32LE(compressed.length, 20); buffer.writeUInt32LE(raw.length, 24); buffer.writeUInt16LE(name.length, 28); buffer.writeUInt32LE(offset, 42); name.copy(buffer, 46); }

  /** Calculates CRC-32 required by ZIP metadata. */
  private crc32(buffer: Buffer): number { let crc = 0xffffffff; for (const byte of buffer) { crc ^= byte; for (let i = 0; i < 8; i += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1)); } return (crc ^ 0xffffffff) >>> 0; }
}
