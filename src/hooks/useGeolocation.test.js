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
})
