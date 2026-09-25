// RESPONSIBILITY: Owns the object-storage abstraction for generated exports and uploaded assets without exposing provider SDKs to feature code.
// FLOW: Feature/worker -> AdminCoreObjectStorageService -> validated object key -> storage backend -> signed/local URL.
import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { createReadStream, createWriteStream, type ReadStream } from 'node:fs';
import { promises as fs } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
/**
 * @description Defines the AdminCoreObjectStorageService boundary for the admin_core_storage backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreObjectStorageService {
  private readonly rootPath: string;
  private readonly signingSecret: string;

  constructor(config: ConfigService) {
    this.rootPath = resolve(config.get<string>('runtime.objectStorageRoot', 'storage/objects'));
    this.signingSecret = config.getOrThrow<string>('runtime.jwtAccessSecret');
  }

  /** @description Creates a random object-storage key and discards the original filename. @param extension MIME-derived safe extension. @returns UUID-based storage key. */
  createObjectKey(extension: string): string {
    const safeExtension = extension.replace(/[^a-z0-9]/gi, '').toLowerCase() || 'bin';
    return `admin/${randomUUID()}.${safeExtension}`;
  }

  /** @description Stores bytes using a provider-neutral key. @param objectKey Safe object key. @param content File bytes. @returns Stored object key. */
  async put(objectKey: string, content: Buffer): Promise<string> {
    const safePath = this.safePath(objectKey);
    await fs.mkdir(dirname(safePath), { recursive: true });
    await fs.writeFile(safePath, content, { flag: 'wx' });
    return objectKey;
  }

  /** @description Stores an existing generated file without buffering the full file in application memory. @param objectKey Safe object key. @param filePath Source file path. @returns Stored object key. */
  async putFile(objectKey: string, filePath: string): Promise<string> {
    const safePath = this.safePath(objectKey);
    await fs.mkdir(dirname(safePath), { recursive: true });
    const tempPath = `${safePath}.part`;
    await new Promise<void>((resolve, reject) => {
      const input = createReadStream(filePath);
      const output = createWriteStream(tempPath, { flags: 'wx' });
      input.on('error', reject); output.on('error', reject); output.on('close', resolve); input.pipe(output);
    });
    await fs.rename(tempPath, safePath);
    return objectKey;
  }

  /** @description Reads a generated object after path validation. @param objectKey Stored object key. @returns File bytes. @throws Error for an invalid or missing object. */
  async get(objectKey: string): Promise<Buffer> {
    return fs.readFile(this.safePath(objectKey));
  }

  /** @description Opens a generated object as a filesystem stream so downloads remain memory-bounded. @param objectKey Stored object key. @returns Readable file stream. */
  createReadStream(objectKey: string): ReadStream {
    return createReadStream(this.safePath(objectKey));
  }

  /** @description Deletes one provider-neutral object by validated key for retention/offboarding cleanup. @param objectKey Stored object key. @returns Promise completion. */
  async delete(objectKey: string): Promise<void> {
    await fs.rm(this.safePath(objectKey), { force: true });
  }

  /** @description Creates a short-lived local signed-reference token for a stored object. @param objectKey Stored object key. @param expiresAt Unix expiry in seconds. @returns Signed reference token. */
  createSignedReference(objectKey: string, expiresAt: number): string {
    const payload = `${objectKey}:${expiresAt}`;
    return `${objectKey}?expires=${expiresAt}&sig=${createHmac('sha256', this.signingSecret).update(payload).digest('hex')}`;
  }

  /** @description Verifies and decodes a signed storage reference before reading the object. @param reference Signed object reference returned by createSignedReference. @returns Verified object key and expiry timestamp. @throws Error when signature or expiry is invalid. */
  verifySignedReference(reference: string): { objectKey: string; expiresAt: number } {
    const [objectKey, query = ''] = reference.split('?');
    const params = new URLSearchParams(query);
    const expiresAt = Number(params.get('expires'));
    const signature = params.get('sig') ?? '';
    if (!objectKey || !Number.isInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) throw new Error('OBJECT_REFERENCE_EXPIRED');
    const expected = createHmac('sha256', this.signingSecret).update(`${objectKey}:${expiresAt}`).digest('hex');
    if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) throw new Error('OBJECT_REFERENCE_INVALID');
    this.safePath(objectKey);
    return { objectKey, expiresAt };
  }

  /** @description Resolves an object key beneath the configured storage root and rejects traversal. @param objectKey Provider-neutral object key. @returns Absolute safe filesystem path. @throws Error when the key escapes the storage root. */
  private safePath(objectKey: string): string {
    const candidate = resolve(join(this.rootPath, objectKey));
    if (!candidate.startsWith(`${this.rootPath}${sep}`)) throw new Error('OBJECT_KEY_PATH_INVALID');
    return candidate;
  }
}
