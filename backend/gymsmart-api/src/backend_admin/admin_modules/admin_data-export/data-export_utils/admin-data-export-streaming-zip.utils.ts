// RESPONSIBILITY: Builds ZIP archives from on-disk CSV files without retaining full archive bytes in process memory.
// FLOW: Temporary CSV files -> system ZIP stream -> final archive path.
import { execFile } from 'node:child_process';
import { promises as fs } from 'node:fs';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

/**
 * @description Defines the AdminDataExportStreamingZipUtils boundary for the admin_data-export backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDataExportStreamingZipUtils {
  /** @description Creates a ZIP file on disk from source files, bounded by file-streaming OS I/O rather than a process Buffer. @param entries Source CSV files. @param outputPath Output ZIP path. @returns Promise completion. */
  static async create(entries: Array<{ name: string; filePath: string }>, outputPath: string): Promise<void> {
    await fs.mkdir(outputPath.split('/').slice(0, -1).join('/') || '.', { recursive: true });
    const cwd = outputPath.split('/').slice(0, -1).join('/') || '.';
    const names = entries.map((entry) => entry.name);
    await execFileAsync('zip', ['-q', '-j', outputPath, ...names], { cwd, maxBuffer: 1024 * 1024 });
  }
}
