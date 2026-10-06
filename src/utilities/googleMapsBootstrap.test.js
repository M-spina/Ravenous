import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const originalGoogle = globalThis.google;
let append;

beforeEach(() => {
  vi.resetModules();
  globalThis.google = undefined;
  append = vi.spyOn(document.head, 'append').mockImplementation(() => {});
});
afterEach(() => {
  globalThis.google = originalGoogle;
  vi.restoreAllMocks();
});

const bootstrap = async (key = 'test-public-key') => {
  const { ensureGoogleMapsBootstrap } = await import('./googleMapsBootstrap');
  ensureGoogleMapsBootstrap(key);
  return globalThis.google.maps;
};

describe('bundled Maps bootstrap', () => {
  it('coalesces concurrent libraries into one external script and delegates after loading', async () => {
    const maps = await bootstrap();
    const places = maps.importLibrary('places');
    const geocoding = maps.importLibrary('geocoding');
    await Promise.resolve();
    expect(append).toHaveBeenCalledTimes(1);
    const script = append.mock.calls[0][0];
    const url = new URL(script.src);
    expect(url.origin).toBe('https://maps.googleapis.com');
    expect(url.searchParams.get('key')).toBe('test-public-key');
    expect(url.searchParams.get('libraries')).toBe('places,geocoding');
    expect(url.searchParams.get('v')).toBe('weekly');
    expect(script.textContent).toBe('');
    const sdk = vi.fn(async (library) => ({ library }));
    maps.importLibrary = sdk;
    maps.__ib__();
    expect(await places).toEqual({ library: 'places' });
    expect(await geocoding).toEqual({ library: 'geocoding' });
    expect(sdk).toHaveBeenCalledTimes(2);
  });

  it('reuses an existing SDK or bootstrap without injecting a second script', async () => {
    const importLibrary = vi.fn();
    globalThis.google = { maps: { importLibrary } };
    await bootstrap();
    expect(globalThis.google.maps.importLibrary).toBe(importLibrary);
    expect(append).not.toHaveBeenCalled();
  });

  it('rejects a failed load without leaking configuration and permits a fresh retry', async () => {
    const maps = await bootstrap();
    const failed = maps.importLibrary('places');
    const rejected = expect(failed).rejects.toThrow('Google Maps could not load');
    await Promise.resolve();
    append.mock.calls[0][0].onerror();
    await rejected;
    expect(maps.__ib__).toBeUndefined();
    const retry = maps.importLibrary('places');
    await Promise.resolve();
    expect(append).toHaveBeenCalledTimes(2);
    maps.importLibrary = vi.fn(async () => ({ Place: 'ready' }));
    maps.__ib__();
    expect(await retry).toEqual({ Place: 'ready' });
  });

  it('fails clearly before a network request when public configuration is missing', async () => {
    await expect(bootstrap('')).rejects.toThrow('Google Maps configuration is missing');
    expect(append).not.toHaveBeenCalled();
  });
});
