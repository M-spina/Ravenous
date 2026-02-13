import { useSelector, useDispatch } from 'react-redux';
import LocationInput from './LocationInput';
import { useGeolocation } from '../hooks/useGeolocation';
import { reverseGeocode } from '../utilities/geocodingService';
import { setSearchTerm, setSearchLocation, addToSearchHistory } from '../store/searchSlice';
import { setCoords, clearCoords, fetchPlaces } from '../store/placesSlice';
import '../Styles/SearchBar.css';

export default function SearchBar() {
  const dispatch = useDispatch();

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
      }
    }
  }

  // Function to handle manual location input changes
  const handleLocationChange = (newLocation) => {
    dispatch(setSearchLocation(newLocation));
    dispatch(clearCoords());
  }
  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <div className="search-inputs">
          <input
            type="text"
            placeholder="Search restaurants, cafes..."
            value={term}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            required
          />
          <div className='location-wrapper'>
            <LocationInput value={location} onChange={handleLocationChange} />
            <button type="button" onClick={handleUseMyLocation} disabled={isLocating || !mapsLoaded || isLoading} title='Use My current location' className="geolocation-button">
              {isLocating ? '⏳' : '📍'}
            </button>
          </div>
        </div>
        <button type="submit" disabled={!mapsLoaded || isLoading || !term || !location}>{!mapsLoaded ? 'Loading Maps...' : isLoading ? 'Searching...' : 'Search'}</button>
        {geoError && <p className="geo-error">{geoError}</p>}
      </form>
    </div>
  );
}