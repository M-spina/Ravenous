import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const originalGoogle = globalThis.google

describe('Google Maps library loading', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  afterEach(() => {
    globalThis.google = originalGoogle
  })

  it('loads and caches the Places and geocoding libraries independently', async () => {
    const placesLibrary = { Place: class Place {} }
    const geocodingLibrary = { Geocoder: class Geocoder {} }
    const importLibrary = vi.fn(async (libraryName) => {
      if (libraryName === 'places') return placesLibrary
      if (libraryName === 'geocoding') return geocodingLibrary
      throw new Error(`Unexpected library: ${libraryName}`)
    })
    globalThis.google = { maps: { importLibrary } }

    const {
      getPlacesLibrary,
      loadGeocodingLibrary,
      loadGoogleMapsScript,
    } = await import('./loadGoogleMaps.js')

    expect(await loadGoogleMapsScript()).toBe(placesLibrary)
    expect(await loadGoogleMapsScript()).toBe(placesLibrary)
    expect(getPlacesLibrary()).toBe(placesLibrary)
    expect(await loadGeocodingLibrary()).toBe(geocodingLibrary)
    expect(await loadGeocodingLibrary()).toBe(geocodingLibrary)
    expect(importLibrary).toHaveBeenCalledTimes(2)
    expect(importLibrary).toHaveBeenNthCalledWith(1, 'places')
    expect(importLibrary).toHaveBeenNthCalledWith(2, 'geocoding')
  })
  it('shares a pending Places load and allows retry after failure', async () => {
    let rejectLoad
    const library = { Place: class Place {} }
    const importLibrary = vi.fn()
      .mockImplementationOnce(() => new Promise((_, reject) => { rejectLoad = reject }))
      .mockResolvedValueOnce(library)
    globalThis.google = { maps: { importLibrary } }
    const { loadGoogleMapsScript } = await import('./loadGoogleMaps.js')
    const first = loadGoogleMapsScript()
    const second = loadGoogleMapsScript()
    expect(importLibrary).toHaveBeenCalledOnce()
    const settled = Promise.allSettled([first, second])
    rejectLoad(new Error('Temporary failure'))
    expect((await settled).map((result) => result.status)).toEqual(['rejected', 'rejected'])
    await expect(loadGoogleMapsScript()).resolves.toBe(library)
    expect(importLibrary).toHaveBeenCalledTimes(2)
  })

})
