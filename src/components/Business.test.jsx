import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Business from './Business'

const business = {
  id: 'restaurant-1',
  name: 'The Copper Table',
  imageUrl: '/restaurant.jpg',
  address: '10 Market Street, London',
  category: 'Modern British',
  rating: 4.5,
  reviewCount: 328,
  priceLevel: 3,
  phone: '+44 20 1234 5678',
  website: 'https://maps.example.com/copper-table',
  hours: 'Open today until 11 pm',
}

describe('Business', () => {
  it('renders restaurant metadata and optional price information', () => {
    render(<Business business={business} />)

    expect(screen.getByRole('heading', { name: business.name })).toBeInTheDocument()
    expect(screen.getByText(business.address)).toBeInTheDocument()
    expect(screen.getByText(business.category)).toBeInTheDocument()
    expect(screen.getByLabelText('4.5 out of 5 stars')).toBeInTheDocument()
    expect(screen.getByText('328 reviews')).toBeInTheDocument()
    expect(screen.getByLabelText('Price level 3 out of 4')).toBeInTheDocument()
  })

  it('flips from clicks on the card and flips back', async () => {
    const user = userEvent.setup()
    render(<Business business={business} />)
    const card = screen.getByTestId('business-card')
    const toggle = screen.getByRole('button', { name: `Show details for ${business.name}` })

    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    await user.click(card)
    expect(screen.getByRole('button', { name: `Show summary for ${business.name}` })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByTestId('business-card-front')).toHaveAttribute('inert')

    await user.click(card)
    expect(screen.getByRole('button', { name: `Show details for ${business.name}` })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByTestId('business-card-back')).toHaveAttribute('inert')
  })

  it('supports native Enter and Space activation on the flip control', async () => {
    const user = userEvent.setup()
    render(<Business business={business} />)
    const toggle = screen.getByRole('button', { name: `Show details for ${business.name}` })

    toggle.focus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('button', { name: `Show summary for ${business.name}` })).toHaveAttribute('aria-pressed', 'true')

    await user.keyboard(' ')
    expect(screen.getByRole('button', { name: `Show details for ${business.name}` })).toHaveAttribute('aria-pressed', 'false')
  })

  it('keeps back-face links and details controls from changing flip state', async () => {
    const user = userEvent.setup()
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    render(<Business business={business} />)

    await user.click(screen.getByTestId('business-card'))
    const toggle = screen.getByRole('button', { name: `Show summary for ${business.name}` })

    const phoneLink = screen.getByRole('link', { name: business.phone })
    phoneLink.addEventListener('click', (event) => event.preventDefault())
    fireEvent.click(phoneLink)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')

    const mapLink = screen.getByRole('link', { name: 'View on Google Maps' })
    mapLink.addEventListener('click', (event) => event.preventDefault())
    fireEvent.click(mapLink)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('button', { name: 'View Full Details' }))
    expect(alertSpy).toHaveBeenCalledWith(`View details for ${business.name} (coming in Phase 3b!)`)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
  })

  it('handles missing optional contact and price data', async () => {
    const user = userEvent.setup()
    const minimalBusiness = { ...business, phone: null, website: null, hours: null, priceLevel: null }
    render(<Business business={minimalBusiness} />)

    expect(screen.queryByLabelText(/Price level/)).not.toBeInTheDocument()
    await user.click(screen.getByTestId('business-card'))
    expect(screen.getAllByText('Not available')).toHaveLength(2)
    expect(screen.getByText('Hours unavailable')).toBeInTheDocument()
  })
})
