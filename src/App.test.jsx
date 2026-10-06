import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import App from './App'
import { renderWithStore } from './test/renderWithStore'

import placesReducer from './store/placesSlice'
import searchReducer from './store/searchSlice'
import { loadGoogleMapsScript } from './utilities/loadGoogleMaps'

vi.mock('./utilities/loadGoogleMaps', () => ({ loadGoogleMapsScript: vi.fn(), getPlacesLibrary: vi.fn() }))

const business = {
  id: 'restaurant-1',
  name: 'The Copper Table',
  imageUrl: '/restaurant.jpg',
  address: '10 Market Street, London',
  category: 'Modern British',
  rating: 4.5,
  reviewCount: 328,
  priceLevel: 3,
}

const state = (places = {}) => ({
  search: { term: '', location: '' },
  places: {
    businesses: [],
    isLoading: false,
    hasSearched: false,
    error: null,
    sortBy: 'bestMatch',
    coords: null,
    mapsLoaded: false,
    mapsError: null,
    ...places,
  },
})

describe('App UI states', () => {
  it('renders onboarding before the first search', () => {
    renderWithStore(<App />, state())
    expect(screen.getByRole('heading', { name: 'Ready when you are' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'No restaurants found' })).not.toBeInTheDocument()
  })

  it('renders a completed empty-search state', () => {
    renderWithStore(<App />, state({ hasSearched: true }))
    expect(screen.getByRole('heading', { name: 'No restaurants found' })).toBeInTheDocument()
    expect(screen.getByText('Try a different search term or location.')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Ready when you are' })).not.toBeInTheDocument()
  })

  it('renders loading skeletons', () => {
    renderWithStore(<App />, state({ isLoading: true, hasSearched: true }))
    expect(screen.getByRole('status')).toHaveTextContent('Searching for restaurants…')
    expect(screen.getByRole('region', { name: 'Loading restaurant results' })).toHaveAttribute('aria-busy', 'true')
    expect(screen.queryByRole('heading', { name: 'No restaurants found' })).not.toBeInTheDocument()
  })

  it('renders maps and rejected-search errors without an empty state', () => {
    renderWithStore(<App />, state({ hasSearched: true, mapsError: 'Maps unavailable', error: 'Search unavailable' }))
    expect(screen.getByText('Maps unavailable')).toBeInTheDocument()
    expect(screen.getByText('Search unavailable')).toBeInTheDocument()
    expect(screen.getAllByRole('alert')).toHaveLength(2)
    expect(screen.queryByRole('heading', { name: 'No restaurants found' })).not.toBeInTheDocument()
  })

  it('renders populated results and sorting controls', () => {
    renderWithStore(<App />, state({ businesses: [business], hasSearched: true, mapsLoaded: true }))
    expect(screen.getByRole('status')).toHaveTextContent('1 restaurant found.')
    expect(screen.getByRole('region', { name: 'Restaurant results' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Best Match' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { name: business.name })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'No restaurants found' })).not.toBeInTheDocument()
  })
  it('makes no Google load on opening, focusing fields or typing only a cuisine', async () => {
    loadGoogleMapsScript.mockClear()
    const store = configureStore({ reducer: { places: placesReducer, search: searchReducer } })
    render(<Provider store={store}><App /></Provider>)
    const user = userEvent.setup()
    await user.click(screen.getByRole('combobox', { name: 'Where?' }))
    await user.type(screen.getByRole('textbox', { name: 'What are you craving?' }), 'pizza')
    expect(loadGoogleMapsScript).not.toHaveBeenCalled()
  })

})
