import { vi } from 'vitest'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

export function createTestStore(state) {
  return {
    getState: () => state,
    subscribe: () => () => {},
    dispatch: vi.fn((action) => action),
  }
}

export function renderWithStore(ui, state) {
  const store = createTestStore(state)
  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  }
}
