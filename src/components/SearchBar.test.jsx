import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import SearchBar from './SearchBar'
import { renderWithStore } from '../test/renderWithStore'

const state = ({ mapsLoaded, isLoading = false, term = 'pizza', location = 'London' }) => ({
  search: { term, location, searchHistory: [] },
  places: { coords: null, mapsLoaded, isLoading },
})

describe('SearchBar', () => {
  it('keeps search disabled until Google Maps is loaded', () => {
    renderWithStore(<SearchBar />, state({ mapsLoaded: false }))

    expect(screen.getByRole('button', { name: 'Loading Maps...' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Use my current location' })).toBeDisabled()
  })

  it('enables a complete search and exposes the searching state', () => {
    const { unmount } = renderWithStore(<SearchBar />, state({ mapsLoaded: true }))
    expect(screen.getByRole('button', { name: 'Search restaurants' })).toBeEnabled()
    unmount()

    renderWithStore(<SearchBar />, state({ mapsLoaded: true, isLoading: true }))
    expect(screen.getByRole('button', { name: 'Searching...' })).toBeDisabled()
  })

  it('requires both a term and location', () => {
    renderWithStore(<SearchBar />, state({ mapsLoaded: true, location: '' }))
    expect(screen.getByRole('button', { name: 'Search restaurants' })).toBeDisabled()
  })
})
