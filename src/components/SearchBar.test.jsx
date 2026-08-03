import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import SearchBar from './SearchBar'
import { renderWithStore } from '../test/renderWithStore'
import { useGeolocation } from '../hooks/useGeolocation'
import placesReducer from '../store/placesSlice'
import searchReducer from '../store/searchSlice'
import { reverseGeocode } from '../utilities/geocodingService'

vi.mock('../hooks/useAutocomplete', () => ({
  useAutocomplete: () => ({
    suggestions: [],
    isLoading: false,
    fetchSuggestions: vi.fn(),
    clearSuggestions: vi.fn(),
    resetSession: vi.fn(),
  }),
}))

vi.mock('../hooks/useGeolocation', () => ({
  useGeolocation: vi.fn(),
}))

vi.mock('../utilities/geocodingService', () => ({
  reverseGeocode: vi.fn(),
}))

const getUserLocation = vi.fn()
const reverseGeocodeErrorMessage = 'We found your position, but couldn’t identify your location. Enter it manually or try again.'

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
  beforeEach(() => {
    getUserLocation.mockReset()
    getUserLocation.mockResolvedValue(undefined)
    useGeolocation.mockReturnValue({
      getUserLocation,
      isLocating: false,
      geoError: null,
    })
    reverseGeocode.mockReset()
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

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

  it('shows reverse-geocoding failure inline and preserves the existing location state', async () => {
    const user = userEvent.setup()
    const existingCoords = { lat: 51.5072, lng: -0.1276 }
    const detectedCoords = { lat: 48.8566, lng: 2.3522 }
    getUserLocation.mockResolvedValue(detectedCoords)
    reverseGeocode.mockRejectedValue(new Error('Geocoder unavailable'))
    const { store } = renderWithRealStore(realState({
      location: 'London, UK',
      coords: existingCoords,
    }))

    await user.click(screen.getByRole('button', { name: 'Use my current location' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(reverseGeocodeErrorMessage)
    expect(reverseGeocode).toHaveBeenCalledWith(detectedCoords)
    expect(store.getState().search.location).toBe('London, UK')
    expect(store.getState().places.coords).toEqual(existingCoords)
  })

  it('clears reverse-geocoding failure when the location is edited manually', async () => {
    const user = userEvent.setup()
    getUserLocation.mockResolvedValue({ lat: 48.8566, lng: 2.3522 })
    reverseGeocode.mockRejectedValue(new Error('Geocoder unavailable'))
    renderWithRealStore(realState({ location: 'London, UK' }))

    await user.click(screen.getByRole('button', { name: 'Use my current location' }))
    expect(await screen.findByRole('alert')).toHaveTextContent(reverseGeocodeErrorMessage)

    await user.type(screen.getByRole('combobox', { name: 'Where?' }), 'a')

    expect(screen.queryByText(reverseGeocodeErrorMessage)).not.toBeInTheDocument()
  })

  it('clears prior failure on retry and updates both location and coordinates on success', async () => {
    const user = userEvent.setup()
    const detectedCoords = { lat: 48.8566, lng: 2.3522 }
    getUserLocation.mockResolvedValue(detectedCoords)
    reverseGeocode
      .mockRejectedValueOnce(new Error('Geocoder unavailable'))
      .mockResolvedValueOnce('Paris, France')
    const { store } = renderWithRealStore(realState({ location: 'London, UK' }))
    const useLocationButton = screen.getByRole('button', { name: 'Use my current location' })

    await user.click(useLocationButton)
    expect(await screen.findByRole('alert')).toHaveTextContent(reverseGeocodeErrorMessage)

    await user.click(useLocationButton)

    await waitFor(() => {
      expect(store.getState().search.location).toBe('Paris, France')
      expect(store.getState().places.coords).toEqual(detectedCoords)
    })
    expect(screen.queryByText(reverseGeocodeErrorMessage)).not.toBeInTheDocument()
  })
})
