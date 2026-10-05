import { describe, expect, it } from 'vitest';
import { safeExternalUrl } from './safeExternalUrl';

describe('external attribution links', () => {
  it('accepts absolute HTTP and HTTPS URLs', () => {
    expect(safeExternalUrl('https://example.com/author')).toBe('https://example.com/author');
    expect(safeExternalUrl('http://example.com/author')).toBe('http://example.com/author');
  });
  it.each(['javascript:alert(1)', 'data:text/html,test', '//example.com', '/relative', 'https://user:secret@example.com', '', null, undefined])('rejects unsafe or absent links: %s', (value) => {
    expect(safeExternalUrl(value)).toBeNull();
  });
});
