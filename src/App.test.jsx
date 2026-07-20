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
    error: null,
    sortBy: 'bestMatch',
    coords: null,
    mapsLoaded: false,
    mapsError: null,
    ...places,
  },
})

describe('App UI states', () => {
  it('renders the empty state', () => {
    renderWithStore(<App />, state())
    expect(screen.getByRole('heading', { name: 'Ready when you are' })).toBeInTheDocument()
  })

  it('renders loading skeletons', () => {
    renderWithStore(<App />, state({ isLoading: true }))
    expect(screen.getByRole('region', { name: 'Loading restaurant results' })).toHaveAttribute('aria-busy', 'true')
  })

  it('renders maps and search errors', () => {
    renderWithStore(<App />, state({ mapsError: 'Maps unavailable', error: 'Search unavailable' }))
    expect(screen.getByText('Maps unavailable')).toBeInTheDocument()
    expect(screen.getByText('Search unavailable')).toBeInTheDocument()
    expect(screen.getAllByRole('alert')).toHaveLength(2)
  })

  it('renders populated results and sorting controls', () => {
    renderWithStore(<App />, state({ businesses: [business], mapsLoaded: true }))
    expect(screen.getByRole('region', { name: 'Restaurant results' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Best Match' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { name: business.name })).toBeInTheDocument()
  })
})
