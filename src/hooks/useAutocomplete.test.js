import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getPlacesLibrary } from '../utilities/loadGoogleMaps'
import { useAutocomplete } from './useAutocomplete'

vi.mock('../utilities/loadGoogleMaps', () => ({
  getPlacesLibrary: vi.fn(),
}))

const fetchAutocompleteSuggestions = vi.fn()

class AutocompleteSessionToken {}

const deferred = () => {
  let resolve
  let reject
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise
    reject = rejectPromise
  })

  return { promise, resolve, reject }
}

const suggestion = (placeId, text) => ({
  placePrediction: {
    placeId,
    text: { text },
    mainText: { text },
  },
})

describe('useAutocomplete', () => {
  beforeEach(() => {
    fetchAutocompleteSuggestions.mockReset()
    getPlacesLibrary.mockReturnValue({
      AutocompleteSessionToken,
      AutocompleteSuggestion: { fetchAutocompleteSuggestions },
    })
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('keeps the newest suggestions when requests resolve out of order', async () => {
    const olderRequest = deferred()
    const newerRequest = deferred()
    fetchAutocompleteSuggestions
      .mockReturnValueOnce(olderRequest.promise)
      .mockReturnValueOnce(newerRequest.promise)
    const { result } = renderHook(() => useAutocomplete())

    let olderFetch
    let newerFetch
    act(() => {
      olderFetch = result.current.fetchSuggestions('London')
    })
    act(() => {
      newerFetch = result.current.fetchSuggestions('London Bridge')
    })

    await act(async () => {
      newerRequest.resolve({ suggestions: [suggestion('newer', 'London Bridge')] })
      await newerFetch
    })

    expect(result.current.suggestions).toEqual([
      {
        placeId: 'newer',
        text: 'London Bridge',
        mainText: 'London Bridge',
        secondaryText: '',
      },
    ])
    expect(result.current.isLoading).toBe(false)

    await act(async () => {
      olderRequest.resolve({ suggestions: [suggestion('older', 'London')] })
      await olderFetch
    })

    expect(result.current.suggestions[0].placeId).toBe('newer')
    expect(result.current.isLoading).toBe(false)
  })

  it('clears suggestions immediately for input shorter than two characters', async () => {
    fetchAutocompleteSuggestions.mockResolvedValue({
      suggestions: [suggestion('london', 'London')],
    })
    const { result } = renderHook(() => useAutocomplete())

    await act(async () => {
      await result.current.fetchSuggestions('London')
    })
    expect(result.current.suggestions).toHaveLength(1)

    await act(async () => {
      await result.current.fetchSuggestions('L')
    })

    expect(result.current.suggestions).toEqual([])
    expect(result.current.isLoading).toBe(false)
  })

  it('invalidates an in-flight request when the session resets', async () => {
    const pendingRequest = deferred()
    fetchAutocompleteSuggestions.mockReturnValue(pendingRequest.promise)
    const { result } = renderHook(() => useAutocomplete())

    let pendingFetch
    act(() => {
      pendingFetch = result.current.fetchSuggestions('London')
    })
    act(() => {
      result.current.resetSession()
    })

    expect(result.current.suggestions).toEqual([])
    expect(result.current.isLoading).toBe(false)

    await act(async () => {
      pendingRequest.resolve({ suggestions: [suggestion('stale', 'London')] })
      await pendingFetch
    })

    expect(result.current.suggestions).toEqual([])
    expect(result.current.isLoading).toBe(false)
  })
})
