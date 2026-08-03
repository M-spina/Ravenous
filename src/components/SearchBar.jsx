import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LocationInput from './LocationInput';
import { useGeolocation } from '../hooks/useGeolocation';
import { reverseGeocode } from '../utilities/geocodingService';
import { setSearchTerm, setSearchLocation, addToSearchHistory } from '../store/searchSlice';
import { setCoords, clearCoords, fetchPlaces } from '../store/placesSlice';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { LoaderCircle, LocateFixed, Search } from 'lucide-react';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [reverseGeocodeError, setReverseGeocodeError] = useState(null);

  const { term, location } = useSelector((state) => state.search);
  const { coords, isLoading, mapsLoaded } = useSelector((state) => state.places);
  const { getUserLocation, isLocating, geoError } = useGeolocation();

  const handleSearch = (e) => {
    e.preventDefault();

    if(!mapsLoaded) {
      alert('Google Maps is still loading. Please wait a moment and try again.');
      return;
    }

    if (term && location) {
      // Pass the current coordinates from the places slice to the fetchPlaces thunk for location biasing in search results
      dispatch(fetchPlaces({ term, location, coords }));
      //optinal: store search term and location in search history for future "recent searches" feature
      dispatch(addToSearchHistory({ term, location }));
    }
  };

  // Function to handle "Use My Location" button click
  const handleUseMyLocation = async () => {
    setReverseGeocodeError(null);
    // step 1: get user's current coordinates
    const coords = await getUserLocation();
    if(coords) {
      try {
        // step 2: reverse geocode the coordinates to get a human-readable location name
        const locationName = await reverseGeocode(coords);
        dispatch(setSearchLocation(locationName)); // Update the location in the search slice
        dispatch(setCoords(coords)); // Update the coordinates in the places slice
        // step 3: pass the coordinates up to the parent component for location biasing in search
        console.log('Reverse geocoding successful ✅', locationName);
      } catch (error) {
        console.error('Error during reverse geocoding: ❌', error);
        setReverseGeocodeError('We found your position, but couldn’t identify your location. Enter it manually or try again.');
      }
    }
  }

  // Function to handle manual location input changes
  const handleLocationChange = (newLocation) => {
    setReverseGeocodeError(null);
    dispatch(setSearchLocation(newLocation));
    dispatch(clearCoords());
  }
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
              <LocationInput value={location} onChange={handleLocationChange} />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={handleUseMyLocation}
                disabled={isLocating || !mapsLoaded || isLoading}
                aria-label="Use my current location"
                title="Use my current location"
                className="h-12 rounded-l-none border border-l-0 border-input"
              >
                {isLocating ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : <LocateFixed aria-hidden="true" />}
              </Button>
            </div>
          </div>
        </div>
        <Button type="submit" size="lg" className="h-12 w-full text-base" disabled={!mapsLoaded || isLoading || !term || !location}>
          {isLoading && <LoaderCircle aria-hidden="true" className="animate-spin" />}
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
