// RESPONSIBILITY: Defines the object-storage boundary for uploaded and exported assets.
// FLOW: Feature service â†’ CoreObjectStorageService â†’ cloud storage adapter boundary.

import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CoreObjectStorageService {
  /** @description Creates a random object-storage key and discards the original filename. @param extension MIME-derived safe extension. @returns UUID-based storage key. */
  createObjectKey(extension: string): string {
    const safeExtension = extension.replace(/[^a-z0-9]/gi, '').toLowerCase();
    return `admin/${randomUUID()}.${safeExtension}`;
  }
}
