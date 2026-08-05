import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getPlacesLibrary } from './loadGoogleMaps.js'
import { searchPlaces } from './placesService.js'

vi.mock('./loadGoogleMaps.js', () => ({
  getPlacesLibrary: vi.fn(),
}))

const searchByText = vi.fn()

describe('searchPlaces', () => {
  beforeEach(() => {
    searchByText.mockReset()
    getPlacesLibrary.mockReturnValue({
      Place: { searchByText },
    })
  })

  it('returns Places results using the expected text-search request', async () => {
    const places = [{ id: 'place-1' }]
    searchByText.mockResolvedValue({ places })

    await expect(searchPlaces('pizza', 'London')).resolves.toBe(places)
    expect(searchByText).toHaveBeenCalledWith(expect.objectContaining({
      textQuery: 'pizza in London',
      maxResultCount: 20,
      fields: expect.arrayContaining([
        'id',
        'displayName',
        'formattedAddress',
        'rating',
        'userRatingCount',
      ]),
    }))
    expect(searchByText.mock.calls[0][0]).not.toHaveProperty('locationBias')
  })

  it('adds a five-kilometre coordinate bias when coordinates are provided', async () => {
    const originalGoogle = globalThis.google
    const LatLng = vi.fn(function LatLng(lat, lng) {
      this.lat = lat
      this.lng = lng
    })
    globalThis.google = { maps: { LatLng } }
    searchByText.mockResolvedValue({ places: [] })

    try {
      await searchPlaces('sushi', 'Paris', { lat: 48.8566, lng: 2.3522 })

      expect(LatLng).toHaveBeenCalledWith(48.8566, 2.3522)
      expect(searchByText).toHaveBeenCalledWith(expect.objectContaining({
        locationBias: {
          center: expect.objectContaining({ lat: 48.8566, lng: 2.3522 }),
          radius: 5000,
        },
      }))
    } finally {
      globalThis.google = originalGoogle
    }
  })

  it('wraps Google Places failures with service context', async () => {
    searchByText.mockRejectedValue(new Error('Quota exceeded'))

    await expect(searchPlaces('pizza', 'London')).rejects.toThrow(
      'Failed to search for places: Quota exceeded',
    )
  })
})
