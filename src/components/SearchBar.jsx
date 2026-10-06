import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LocationInput from './LocationInput';
import { useGeolocation } from '../hooks/useGeolocation';
import { reverseGeocode } from '../utilities/geocodingService';
import { setSearchTerm, setSearchLocation } from '../store/searchSlice';
import { setCoords, clearCoords, fetchPlaces } from '../store/placesSlice';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { LoaderCircle, LocateFixed, Search } from 'lucide-react';

export default function SearchBar() {
  const dispatch = useDispatch();
  const locationRequestRef = useRef(0);
  const locationInputRef = useRef(null);
  const [isUsingLocation, setIsUsingLocation] = useState(false);
  useEffect(() => () => { locationRequestRef.current += 1; }, []);
  const [reverseGeocodeError, setReverseGeocodeError] = useState(null);

  const { term, location } = useSelector((state) => state.search);
  const { coords, isLoading, mapsLoaded } = useSelector((state) => state.places);
  const { getUserLocation, cancelLocation, isLocating, geoError } = useGeolocation();

  const handleSearch = (e) => {
    e.preventDefault();

    if(!mapsLoaded) {
      alert('Google Maps is still loading. Please wait a moment and try again.');
      return;
    }

    if (term && location) {
      // Pass the current coordinates from the places slice to the fetchPlaces thunk for location biasing in search results
      dispatch(fetchPlaces({ term, location, coords }));
    }
  };

  const stopUsingPreciseLocation = () => {
    locationRequestRef.current += 1;
    cancelLocation?.();
    setIsUsingLocation(false);
    setReverseGeocodeError(null);
    dispatch(clearCoords());
  };

  const handleUseMyLocation = async () => {
    const requestId = ++locationRequestRef.current;
    setReverseGeocodeError(null);
    setIsUsingLocation(true);
    try {
      const detectedCoords = await getUserLocation();
      // Manual editing or withdrawal must prevent a later coordinate disclosure.
      if (!detectedCoords || requestId !== locationRequestRef.current) return;
      const locationName = await reverseGeocode(detectedCoords);
      if (requestId !== locationRequestRef.current) return;
      dispatch(setSearchLocation(locationName));
      dispatch(setCoords(detectedCoords));
    } catch {
      if (requestId === locationRequestRef.current) {
        setReverseGeocodeError('We found your position, but couldn’t identify your location. Enter it manually or try again.');
      }
    } finally {
      if (requestId === locationRequestRef.current) setIsUsingLocation(false);
    }
  };

  const handleLocationChange = (newLocation) => {
    stopUsingPreciseLocation();
    dispatch(setSearchLocation(newLocation));
  };
  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl border border-primary-foreground/30 bg-card/95 p-4 shadow-2xl backdrop-blur-sm sm:p-5">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 text-left">
            <label htmlFor="restaurant-search" className="text-sm font-bold text-foreground">
              What are you craving?
            </label>
            <div className="relative">
              <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="restaurant-search"
                type="text"
                placeholder="Restaurants, cafes, cuisines..."
                value={term}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className="h-12 pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2 text-left">
            <label htmlFor="location-search" className="text-sm font-bold text-foreground">
              Where?
            </label>
            <div className="flex min-w-0">
              <LocationInput value={location} onChange={handleLocationChange} descriptionId="location-sharing-notice" inputRef={locationInputRef} />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={handleUseMyLocation}
                disabled={isLocating || isUsingLocation || !mapsLoaded || isLoading}
                aria-label="Use my current location"
                aria-describedby="location-sharing-notice"
                title="Use my current location"
                className="h-12 rounded-l-none border border-l-0 border-input"
              >
                {isLocating || isUsingLocation ? <LoaderCircle aria-hidden="true" className="animate-spin motion-reduce:animate-none" /> : <LocateFixed aria-hidden="true" />}
              </Button>
            </div>
            <p id="location-sharing-notice" className="text-xs leading-relaxed text-muted-foreground">
              Typed locations are sent to Google for suggestions. Choosing “Use my current location” shares your precise coordinates with Google to identify your area and find nearby restaurants. You can type a location instead. <a href="/privacy.html" className="underline underline-offset-2">Privacy notice</a>
            </p>
            {(coords || isLocating || isUsingLocation) && (
              <Button type="button" variant="outline" size="sm" onClick={() => { stopUsingPreciseLocation(); locationInputRef.current?.focus(); }} className="h-auto max-w-full whitespace-normal text-left">
                Stop using precise location
              </Button>
            )}
          </div>
        </div>
        <Button type="submit" size="lg" className="h-12 w-full text-base" disabled={!mapsLoaded || isLoading || !term || !location}>
          {isLoading && <LoaderCircle aria-hidden="true" className="animate-spin motion-reduce:animate-none" />}
          {!isLoading && <Search aria-hidden="true" />}
          {!mapsLoaded ? 'Loading Maps...' : isLoading ? 'Searching...' : 'Search restaurants'}
        </Button>
        {(reverseGeocodeError || geoError) && (
          <p className="text-center text-sm font-medium text-destructive" role="alert">
            {reverseGeocodeError || geoError}
          </p>
        )}
      </form>
    </div>
  );
}
