import { act, fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useAutocomplete } from '../hooks/useAutocomplete'
import LocationInput from './LocationInput'

vi.mock('../hooks/useAutocomplete', () => ({
  useAutocomplete: vi.fn(),
}))

const fetchSuggestions = vi.fn()
const clearSuggestions = vi.fn()
const resetSession = vi.fn()

function ControlledLocationInput({ initialValue = '' }) {
  const [value, setValue] = useState(initialValue)
  return <LocationInput value={value} onChange={setValue} />
}

describe('LocationInput autocomplete lifecycle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    fetchSuggestions.mockReset()
    clearSuggestions.mockReset()
    resetSession.mockReset()
    useAutocomplete.mockReturnValue({
      suggestions: [],
      isLoading: false,
      fetchSuggestions,
      clearSuggestions,
      resetSession,
    })
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('debounces requests and only fetches the latest input', () => {
    render(<ControlledLocationInput />)
    const input = screen.getByRole('combobox')

    fireEvent.change(input, { target: { value: 'Lo' } })
    act(() => vi.advanceTimersByTime(200))
    fireEvent.change(input, { target: { value: 'London' } })
    act(() => vi.advanceTimersByTime(299))

    expect(fetchSuggestions).not.toHaveBeenCalled()

    act(() => vi.advanceTimersByTime(1))

    expect(fetchSuggestions).toHaveBeenCalledTimes(1)
    expect(fetchSuggestions).toHaveBeenCalledWith('London')
  })

  it('clears stale suggestions immediately when the input becomes too short', () => {
    useAutocomplete.mockReturnValue({
      suggestions: [{
        placeId: 'london',
        text: 'London',
        mainText: 'London',
        secondaryText: 'United Kingdom',
      }],
      isLoading: false,
      fetchSuggestions,
      clearSuggestions,
      resetSession,
    })
    render(<ControlledLocationInput initialValue="London" />)
    const input = screen.getByRole('combobox')

    fireEvent.focus(input)
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'L' } })

    expect(input).toHaveValue('L')
    expect(clearSuggestions).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('keeps Google attribution outside selectable suggestions', () => {
    useAutocomplete.mockReturnValue({ suggestions: [{ placeId: 'london', text: 'London', mainText: 'London', secondaryText: 'UK' }], isLoading: false, fetchSuggestions, clearSuggestions, resetSession })
    render(<ControlledLocationInput initialValue="London" />)
    fireEvent.focus(screen.getByRole('combobox'))
    const attribution = screen.getByRole('img', { name: 'Google Maps' })
    expect(screen.getByRole('listbox')).not.toContainElement(attribution)
    expect(screen.getAllByRole('option')).toHaveLength(1)
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' })
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' })
    expect(resetSession).toHaveBeenCalledOnce()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('cancels a pending debounce timer when it unmounts', () => {
    const { unmount } = render(<ControlledLocationInput />)

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'London' } })
    unmount()
    act(() => vi.runAllTimers())

    expect(fetchSuggestions).not.toHaveBeenCalled()
  })
})
