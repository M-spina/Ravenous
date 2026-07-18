import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import SortBar from './SortBar'
import { renderWithStore } from '../test/renderWithStore'

describe('SortBar', () => {
  it('exposes the active option and dispatches the existing sort action', async () => {
    const user = userEvent.setup()
    const { store } = renderWithStore(<SortBar />, {
      places: { sortBy: 'bestMatch' },
    })

    expect(screen.getByRole('button', { name: 'Best Match' })).toHaveAttribute('aria-pressed', 'true')
    await user.click(screen.getByRole('button', { name: 'Rating' }))

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'places/setSortBy',
      payload: 'rating',
    })
  })
})
