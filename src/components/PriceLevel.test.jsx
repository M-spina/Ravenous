import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import PriceLevel from './PriceLevel'

describe('PriceLevel', () => {
  it.each([
    ['PRICE_LEVEL_FREE', 0],
    ['PRICE_LEVEL_INEXPENSIVE', 1],
    ['PRICE_LEVEL_MODERATE', 2],
    ['PRICE_LEVEL_EXPENSIVE', 3],
    ['PRICE_LEVEL_VERY_EXPENSIVE', 4],
  ])('maps %s to level %i', (priceLevel, numericLevel) => {
    render(<PriceLevel priceLevel={priceLevel} />)

    const badge = screen.getByLabelText(`Price level ${numericLevel} out of 4`)
    const [filledDollars, emptyDollars] = badge.querySelectorAll('span')

    expect(filledDollars.textContent).toBe('$'.repeat(numericLevel))
    expect(emptyDollars.textContent).toBe('$'.repeat(4 - numericLevel))
  })
})
