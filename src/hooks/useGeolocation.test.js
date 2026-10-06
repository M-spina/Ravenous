import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useGeolocation } from './useGeolocation'

const originalGeolocation = Object.getOwnPropertyDescriptor(navigator, 'geolocation')

describe('useGeolocation', () => {
  afterEach(() => {
    if (originalGeolocation) {
      Object.defineProperty(navigator, 'geolocation', originalGeolocation)
    } else {
      delete navigator.geolocation
    }
  })

  it('allows cached coordinates up to five minutes old', async () => {
    const getCurrentPosition = vi.fn((onSuccess) => {
      onSuccess({
        coords: {
          latitude: 51.5072,
          longitude: -0.1276,
        },
      })
    })
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: { getCurrentPosition },
    })
    vi.spyOn(console, 'log').mockImplementation(() => {})
    const { result } = renderHook(() => useGeolocation())

    let coords
    await act(async () => {
      coords = await result.current.getUserLocation()
    })

    expect(coords).toEqual({ lat: 51.5072, lng: -0.1276 })
    expect(getCurrentPosition).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    )
  })
  it('discards a position received after cancellation', async () => {
    let resolvePosition
    Object.defineProperty(navigator, 'geolocation', { configurable: true, value: {
      getCurrentPosition: (onSuccess) => { resolvePosition = onSuccess },
    } })
    const { result } = renderHook(() => useGeolocation())
    let pending
    act(() => { pending = result.current.getUserLocation() })
    act(() => result.current.cancelLocation())
    let coords
    await act(async () => {
      resolvePosition({ coords: { latitude: 51.5, longitude: -0.1 } })
      coords = await pending
    })
    expect(coords).toBeUndefined()
    expect(result.current.isLocating).toBe(false)
    expect(result.current.geoError).toBeNull()
  })

  it.each([[1, /Permission denied/], [2, /Position unavailable/], [3, /timed out/]])('reports geolocation failure %s without returning coordinates', async (code, message) => {
    Object.defineProperty(navigator, 'geolocation', { configurable: true, value: {
      getCurrentPosition: (_, onError) => onError({ code, PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 }),
    } })
    const { result } = renderHook(() => useGeolocation())
    let coords
    await act(async () => { coords = await result.current.getUserLocation() })
    expect(coords).toBeUndefined()
    expect(result.current.geoError).toMatch(message)
    expect(result.current.isLocating).toBe(false)
  })

})
