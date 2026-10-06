import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

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

  it('uses contrast-safe colors on the details face', () => {
    render(<Business business={business} />)

    const detailsFace = screen.getByTestId('business-card-back')
    const detailsBadge = screen.getByText('Restaurant details')

    expect(detailsFace).toHaveClass('from-primary-dark', 'via-primary', 'to-primary', 'text-primary-foreground')
    expect(detailsFace).not.toHaveClass('to-accent')
    expect(detailsBadge).toHaveClass('bg-primary-foreground/10', 'text-primary-foreground')
    expect(detailsBadge).not.toHaveClass('bg-primary-foreground/15')
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

  it('keeps back-face contact links from changing flip state', async () => {
    const user = userEvent.setup()
    render(<Business business={business} />)

    await user.click(screen.getByTestId('business-card'))
    const toggle = screen.getByRole('button', { name: `Show summary for ${business.name}` })

    const phoneLink = screen.getByRole('link', { name: business.phone })
    expect(phoneLink).toHaveAttribute('href', `tel:${business.phone}`)
    phoneLink.addEventListener('click', (event) => event.preventDefault())
    fireEvent.click(phoneLink)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')

    const mapLink = screen.getByRole('link', { name: 'View on Google Maps' })
    expect(mapLink).toHaveAttribute('href', business.website)
    expect(mapLink).toHaveAttribute('target', '_blank')
    expect(mapLink).toHaveAttribute('rel', 'noopener noreferrer')
    mapLink.addEventListener('click', (event) => event.preventDefault())
    fireEvent.click(mapLink)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')

    expect(screen.getByText(business.hours)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'View Full Details' })).not.toBeInTheDocument()
    expect(screen.queryByText(/Phase 3b/i)).not.toBeInTheDocument()
  })


  it('renders all credits safely and keeps credit links from flipping the card', async () => {
    const user = userEvent.setup()
    render(<Business business={{ ...business,
      photoAttributions: [{ displayName: 'Alice', uri: 'https://example.com/alice' }, { displayName: '<script>bad</script>', uri: 'javascript:alert(1)' }, { displayName: 'Bob', uri: null }],
      placeAttributions: [{ provider: 'Provider one', providerURI: 'https://example.com/provider' }, { provider: 'Provider two', providerURI: null }],
    }} />)
    expect(screen.getByText('<script>bad</script>')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '<script>bad</script>' })).not.toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(document.querySelector('script')).toBeNull()
    const author = screen.getByRole('link', { name: 'Alice' })
    expect(author).toHaveAttribute('href', 'https://example.com/alice')
    author.addEventListener('click', (event) => event.preventDefault())
    await user.click(author)
    expect(screen.getByRole('button', { name: `Show details for ${business.name}` })).toHaveAttribute('aria-pressed', 'false')
    await user.click(screen.getByRole('button', { name: `Show details for ${business.name}` }))
    expect(screen.getByRole('link', { name: 'Provider one' })).toBeInTheDocument()
    expect(screen.getByText('Provider two')).toBeInTheDocument()
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
