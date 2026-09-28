// RESPONSIBILITY: Proves application encryption round-trips sensitive profile values without storing plaintext.
// FLOW: Jest → CoreEncryptedJsonbTransformer → AES-256-GCM ciphertext → decrypted application object.

import { CoreEncryptedJsonbTransformer } from '@/backend_trainer/backend_core/core_security/core-encrypted.transformer';
import { CoreEncryptionKeyRegistry } from '@/backend_trainer/backend_core/core_security/core-encryption-key.registry';

describe('Trainer profile sensitive-field encryption', () => {
  it('encrypts emergency contact values and decrypts them losslessly', () => {
    CoreEncryptionKeyRegistry.configure('07'.repeat(32));
    const source = { name: 'Emergency', phone: '9999999999', relation: 'Sibling' };
    const stored = CoreEncryptedJsonbTransformer.to(source) as Record<string, string>;

    expect(stored.__encrypted).toBeDefined();
    expect(stored.__encrypted).not.toContain('Emergency');
    expect(CoreEncryptedJsonbTransformer.from(stored)).toEqual(source);
  });
});
