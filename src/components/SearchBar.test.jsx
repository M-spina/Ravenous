import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { describe, expect, it, vi } from 'vitest'

import SearchBar from './SearchBar'
import { renderWithStore } from '../test/renderWithStore'
import placesReducer from '../store/placesSlice'
import searchReducer from '../store/searchSlice'

vi.mock('../hooks/useAutocomplete', () => ({
  useAutocomplete: () => ({
    suggestions: [],
    isLoading: false,
    fetchSuggestions: vi.fn(),
    resetSession: vi.fn(),
  }),
}))

const state = ({ mapsLoaded, isLoading = false, term = 'pizza', location = 'London' }) => ({
  search: { term, location, searchHistory: [] },
  places: { coords: null, mapsLoaded, isLoading },
})

const realState = ({ location = '', coords = null } = {}) => ({
  search: { term: 'pizza', location, searchHistory: [] },
  places: {
    businesses: [],
    isLoading: false,
    error: null,
    sortBy: 'bestMatch',
    coords,
    mapsLoaded: true,
    mapsError: null,
  },
})

const renderWithRealStore = (preloadedState) => {
  const store = configureStore({
    reducer: {
      places: placesReducer,
      search: searchReducer,
    },
    preloadedState,
  })

  return {
    store,
    ...render(
      <Provider store={store}>
        <SearchBar />
      </Provider>,
    ),
  }
}

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

  it('keeps manual location entry synchronized with Redux', async () => {
    const user = userEvent.setup()
    const { store } = renderWithRealStore(realState())
    const locationInput = screen.getByRole('combobox', { name: 'Where?' })

    await user.type(locationInput, 'London')

    expect(locationInput).toHaveValue('London')
    expect(store.getState().search.location).toBe('London')
    expect(store.getState().places.coords).toBeNull()
    expect(screen.getByRole('button', { name: 'Search restaurants' })).toBeEnabled()
  })

  it('clears stored coordinates as soon as an existing location is edited', async () => {
    const user = userEvent.setup()
    const { store } = renderWithRealStore(realState({
      location: 'London, UK',
      coords: { lat: 51.5072, lng: -0.1276 },
    }))
    const locationInput = screen.getByRole('combobox', { name: 'Where?' })

    await user.clear(locationInput)
    await user.type(locationInput, 'Paris')

    expect(locationInput).toHaveValue('Paris')
    expect(store.getState().search.location).toBe('Paris')
    expect(store.getState().places.coords).toBeNull()
  })
})
