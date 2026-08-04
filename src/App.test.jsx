import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'
import { renderWithStore } from './test/renderWithStore'

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
  search: { term: '', location: '', searchHistory: [] },
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
    expect(screen.getByRole('region', { name: 'Restaurant results' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Best Match' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { name: business.name })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'No restaurants found' })).not.toBeInTheDocument()
  })
})
