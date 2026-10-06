import { beforeEach, describe, expect, it, vi } from 'vitest'

import { loadGeocodingLibrary } from './loadGoogleMaps.js'
import { reverseGeocode } from './geocodingService.js'

vi.mock('./loadGoogleMaps.js', () => ({
  loadGeocodingLibrary: vi.fn(),
}))

const geocode = vi.fn()
const Geocoder = vi.fn(function Geocoder() {
  return { geocode }
})
const coordinates = { lat: 51.5072, lng: -0.1276 }
const failureMessage = 'Failed to reverse geocode location. Please try again.'

describe('reverseGeocode', () => {
  beforeEach(() => {
    geocode.mockReset()
    Geocoder.mockClear()
    loadGeocodingLibrary.mockReset()
    loadGeocodingLibrary.mockResolvedValue({ Geocoder })
  })

  it('loads the geocoding library and returns the locality and country', async () => {
    geocode.mockResolvedValue({
      results: [
        {
          types: ['street_address'],
          address_components: [],
          formatted_address: '10 Market Street, London, UK',
        },
        {
          types: ['locality', 'political'],
          address_components: [
            { types: ['locality'], long_name: 'London' },
            { types: ['country'], long_name: 'United Kingdom' },
          ],
          formatted_address: 'London, UK',
        },
      ],
    })

    await expect(reverseGeocode(coordinates)).resolves.toBe('London, United Kingdom')
    expect(loadGeocodingLibrary).toHaveBeenCalledOnce()
    expect(Geocoder).toHaveBeenCalledOnce()
    expect(geocode).toHaveBeenCalledWith({ location: coordinates })
  })

  it('falls back to the first formatted address when city and country are unavailable', async () => {
    geocode.mockResolvedValue({
      results: [{
        types: ['street_address'],
        address_components: [],
        formatted_address: '10 Market Street, London, UK',
      }],
    })

    await expect(reverseGeocode(coordinates)).resolves.toBe('10 Market Street, London, UK')
  })

  it('normalizes an empty geocoding response to the public failure message', async () => {
    geocode.mockResolvedValue({ results: [] })

    await expect(reverseGeocode(coordinates)).rejects.toThrow(failureMessage)
  })

  it('normalizes a rejected geocoding request to the public failure message', async () => {
    geocode.mockRejectedValue(new Error('Geocoder unavailable'))

    await expect(reverseGeocode(coordinates)).rejects.toThrow(failureMessage)
  })
  it('does not disclose coordinates withdrawn while the SDK is loading', async () => {
    let resolveLoad
    loadGeocodingLibrary.mockReturnValue(new Promise((resolve) => { resolveLoad = resolve }))
    let current = true
    const lookup = reverseGeocode(coordinates, () => current)
    current = false
    resolveLoad({ Geocoder })
    await expect(lookup).resolves.toBeNull()
    expect(Geocoder).not.toHaveBeenCalled()
    expect(geocode).not.toHaveBeenCalled()
  })

})
