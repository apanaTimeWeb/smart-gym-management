// RESPONSIBILITY: Generates CSV files and ZIP archives for Admin tenant exports without external dependencies.
// FLOW: Export rows -> AdminDataExportZipUtils -> CSV encoding -> ZIP archive -> object storage.
import { deflateRawSync } from 'node:zlib';

function csvCell(value: unknown): string { const text = value === null || value === undefined ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value); return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text; }
function crc32(buffer: Buffer): number { let crc = 0xffffffff; for (const byte of buffer) { crc ^= byte; for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1)); } return (crc ^ 0xffffffff) >>> 0; }
function zipLocalEntry(name: string, data: Buffer): Buffer { const compressed = deflateRawSync(data); const nameBytes = Buffer.from(name); const header = Buffer.alloc(30 + nameBytes.length); header.writeUInt32LE(0x04034b50, 0); header.writeUInt16LE(20, 4); header.writeUInt16LE(8, 8); header.writeUInt32LE(crc32(data), 14); header.writeUInt32LE(compressed.length, 18); header.writeUInt32LE(data.length, 22); header.writeUInt16LE(nameBytes.length, 26); nameBytes.copy(header, 30); return Buffer.concat([header, compressed]); }

/**
 * @description Defines the AdminDataExportZipUtils boundary for the admin_data-export backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDataExportZipUtils {
  /** @description Converts structured export rows to RFC4180-compatible CSV. @param rows Row objects. @returns UTF-8 CSV text. */
  static csv(rows: Record<string, unknown>[]): string { if (!rows.length) return 'export_empty\n'; const headers = [...new Set(rows.flatMap((row) => Object.keys(row)))]; return [headers.map(csvCell).join(','), ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(','))].join('\n') + '\n'; }

  /** @description Packages named CSV contents into a deterministic ZIP archive. @param files Named CSV files. @returns ZIP bytes. */
  static zip(files: Array<{ name: string; content: string }>): Buffer { const local: Buffer[] = []; const central: Buffer[] = []; let offset = 0; for (const file of files) { const data = Buffer.from(file.content, 'utf8'); const entry = zipLocalEntry(file.name, data); const compressed = deflateRawSync(data); const nameBytes = Buffer.from(file.name); const header = Buffer.alloc(46 + nameBytes.length); header.writeUInt32LE(0x02014b50, 0); header.writeUInt16LE(20, 4); header.writeUInt16LE(20, 6); header.writeUInt16LE(8, 10); header.writeUInt32LE(crc32(data), 16); header.writeUInt32LE(compressed.length, 20); header.writeUInt32LE(data.length, 24); header.writeUInt16LE(nameBytes.length, 28); header.writeUInt32LE(offset, 42); nameBytes.copy(header, 46); local.push(entry); central.push(header); offset += entry.length; } const directory = Buffer.concat(central); const end = Buffer.alloc(22); end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10); end.writeUInt32LE(directory.length, 12); end.writeUInt32LE(offset, 16); return Buffer.concat([...local, directory, end]); }
}
