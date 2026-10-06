import { afterEach, describe, expect, it, vi } from 'vitest'

import defaultImage from '../assets/placeholder.png'
import { transformPlaceData, transformPlacesResponse } from './API_Utilities.js'

describe('Places response transformation', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('maps a complete Google Place into the business model', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-05T12:00:00Z'))
    const getURI = vi.fn(() => 'https://images.example/restaurant.jpg')
    const place = {
      id: 'place-1',
      displayName: { text: 'The Copper Table' },
      formattedAddress: '10 Market Street, London',
      types: ['modern_british'],
      rating: 4.7,
      userRatingCount: 328,
      priceLevel: 'PRICE_LEVEL_MODERATE',
      photos: [{ getURI }],
      internationalPhoneNumber: '+44 20 0000 0000',
      googleMapsURI: 'https://maps.google.com/example',
      regularOpeningHours: {
        weekdayDescriptions: [
          'Monday: 9:00 am–10:00 pm',
          'Tuesday: 9:00 am–10:00 pm',
          'Wednesday: 9:00 am–10:00 pm',
          'Thursday: 9:00 am–10:00 pm',
          'Friday: 9:00 am–11:00 pm',
          'Saturday: 9:00 am–11:00 pm',
          'Sunday: 9:00 am–9:00 pm',
        ],
      },
    }

    expect(transformPlaceData(place)).toEqual({
      id: 'place-1',
      name: 'The Copper Table',
      address: '10 Market Street, London',
      category: 'modern british',
      rating: 4.7,
      reviewCount: 328,
      priceLevel: 'PRICE_LEVEL_MODERATE',
      imageUrl: 'https://images.example/restaurant.jpg',
      photoAttributions: [],
      placeAttributions: [],
      phone: '+44 20 0000 0000',
      website: 'https://maps.google.com/example',
      hours: 'Wednesday: 9:00 am–10:00 pm',
    })
    expect(getURI).toHaveBeenCalledWith({ maxWidth: 400 })
  })

  it('uses safe defaults when optional Place data is missing', () => {
    expect(transformPlaceData({ id: 'place-2' })).toEqual({
      id: 'place-2',
      name: 'Unknown',
      address: undefined,
      category: 'Restaurant',
      rating: 0,
      reviewCount: 0,
      priceLevel: null,
      imageUrl: defaultImage,
      photoAttributions: [],
      placeAttributions: [],
      phone: null,
      website: null,
      hours: null,
    })
  })

  it('keeps credits for the displayed photo and all place providers as plain data', () => {
    const firstAuthors = [{ displayName: 'Alice', uri: 'https://example.com/alice' }, { displayName: 'Bob' }]
    const place = {
      id: 'credited',
      photos: [
        { getURI: () => 'https://example.com/photo', authorAttributions: firstAuthors },
        { getURI: () => 'https://example.com/other', authorAttributions: [{ displayName: 'Other author' }] },
      ],
      attributions: [{ provider: 'Provider one', providerURI: 'https://example.com/provider' }, { provider: 'Provider two' }],
    }
    const result = transformPlaceData(place)
    expect(result.photoAttributions).toEqual([{ displayName: 'Alice', uri: 'https://example.com/alice' }, { displayName: 'Bob', uri: null }])
    expect(result.placeAttributions).toEqual([{ provider: 'Provider one', providerURI: 'https://example.com/provider' }, { provider: 'Provider two', providerURI: null }])
    expect(result.photoAttributions[0]).not.toBe(firstAuthors[0])
    expect(JSON.parse(JSON.stringify(result)).photoAttributions).toEqual(result.photoAttributions)
  })

  it('transforms every Place in a response', () => {
    expect(transformPlacesResponse([
      { id: 'place-1', displayName: 'First' },
      { id: 'place-2', displayName: 'Second' },
    ]).map((place) => place.name)).toEqual(['First', 'Second'])
  })
})
