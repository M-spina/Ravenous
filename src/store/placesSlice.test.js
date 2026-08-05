import { configureStore } from '@reduxjs/toolkit'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { transformPlacesResponse } from '../utilities/API_Utilities'
import { searchPlaces } from '../utilities/placesService'
import placesReducer, { fetchPlaces } from './placesSlice'

vi.mock('../utilities/API_Utilities', () => ({
  transformPlacesResponse: vi.fn(),
}))

vi.mock('../utilities/placesService', () => ({
  searchPlaces: vi.fn(),
}))

const createStore = (places = {}) => configureStore({
  reducer: { places: placesReducer },
  preloadedState: {
    places: {
      ...placesReducer(undefined, { type: 'places/init' }),
      ...places,
    },
  },
})

describe('places search lifecycle', () => {
  beforeEach(() => {
    searchPlaces.mockReset()
    transformPlacesResponse.mockReset()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('marks the first search as soon as the request begins', () => {
    const initialState = placesReducer(undefined, { type: 'places/init' })
    expect(initialState.hasSearched).toBe(false)

    const pendingState = placesReducer(initialState, { type: fetchPlaces.pending.type })
    expect(pendingState.hasSearched).toBe(true)
    expect(pendingState.isLoading).toBe(true)
  })

  it('stores transformed results and resets sorting when a search succeeds', async () => {
    const rawPlaces = [{ id: 'raw-place' }]
    const businesses = [{ id: 'business-1', name: 'The Copper Table' }]
    const store = createStore({ sortBy: 'rating' })
    searchPlaces.mockResolvedValue(rawPlaces)
    transformPlacesResponse.mockReturnValue(businesses)

    await store.dispatch(fetchPlaces({
      term: 'pizza',
      location: 'London',
      coords: { lat: 51.5072, lng: -0.1276 },
    }))

    expect(searchPlaces).toHaveBeenCalledWith(
      'pizza',
      'London',
      { lat: 51.5072, lng: -0.1276 },
    )
    expect(transformPlacesResponse).toHaveBeenCalledWith(rawPlaces)
    expect(store.getState().places).toEqual(expect.objectContaining({
      businesses,
      isLoading: false,
      hasSearched: true,
      error: null,
      sortBy: 'bestMatch',
    }))
  })

  it('clears stale results and exposes a stable message when a search fails', async () => {
    const store = createStore({
      businesses: [{ id: 'stale-business' }],
      sortBy: 'reviewCount',
    })
    searchPlaces.mockRejectedValue(new Error('Quota exceeded'))

    await store.dispatch(fetchPlaces({ term: 'pizza', location: 'London' }))

    expect(store.getState().places).toEqual(expect.objectContaining({
      businesses: [],
      isLoading: false,
      hasSearched: true,
      error: 'An error occurred while searching for businesses. Please try again.',
      sortBy: 'reviewCount',
    }))
    expect(transformPlacesResponse).not.toHaveBeenCalled()
  })
})
