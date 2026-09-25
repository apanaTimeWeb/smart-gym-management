// RESPONSIBILITY: Generates a valid compact PDF report artifact from tabular export rows without external document libraries.
// FLOW: Report payload rows -> AdminReportsPdfGeneratorUtils -> PDF Buffer -> object storage.

function escapePdfText(value: string): string { return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)'); }

/**
 * @description Defines the AdminReportsPdfGeneratorUtils boundary for the admin_reports backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminReportsPdfGeneratorUtils {
  /** @description Generates a single-page PDF containing report rows. @param title Report title. @param rows Two-dimensional row values. @returns Valid PDF bytes. */
  static generate(title: string, rows: string[][]): Buffer {
    const lines = [[title], ...rows].map((row) => row.map(String).join(' | ')).slice(0, 48);
    const commands = ['BT', '/F1 9 Tf', '40 760 Td'];
    lines.forEach((line, index) => { commands.push(`(${escapePdfText(line.slice(0, 160))}) Tj`); if (index < lines.length - 1) commands.push('0 -14 Td'); });
    commands.push('ET');
    const content = commands.join('\n');
    const objects = ['<< /Type /Catalog /Pages 2 0 R >>', '<< /Type /Pages /Kids [3 0 R] /Count 1 >>', '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>', `<< /Length ${Buffer.byteLength(content, 'utf8')} >>\nstream\n${content}\nendstream`, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'];
    const chunks: Buffer[] = [Buffer.from('%PDF-1.4\n')]; const offsets = [0]; let offset = chunks[0].length;
    objects.forEach((object, index) => { offsets.push(offset); const chunk = Buffer.from(`${index + 1} 0 obj\n${object}\nendobj\n`); chunks.push(chunk); offset += chunk.length; });
    const xrefOffset = offset; const xref = [`xref\n0 ${objects.length + 1}`, '0000000000 65535 f ']; offsets.slice(1).forEach((item) => xref.push(`${String(item).padStart(10, '0')} 00000 n `)); xref.push(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`); chunks.push(Buffer.from(xref.join('\n')));
    return Buffer.concat(chunks);
  }
}
