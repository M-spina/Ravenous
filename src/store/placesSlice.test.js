import { describe, expect, it } from 'vitest'

import placesReducer, { fetchPlaces } from './placesSlice'

describe('places search lifecycle', () => {
  it('marks the first search as soon as the request begins', () => {
    const initialState = placesReducer(undefined, { type: 'places/init' })
    expect(initialState.hasSearched).toBe(false)

    const pendingState = placesReducer(initialState, { type: fetchPlaces.pending.type })
    expect(pendingState.hasSearched).toBe(true)
    expect(pendingState.isLoading).toBe(true)
  })
})
