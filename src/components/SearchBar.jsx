import { useState } from 'react';
import LocationInput from './LocationInput';
import { useGeolocation } from '../hooks/useGeolocation';
import { reverseGeocode } from '../utilities/geocodingService';
import '../Styles/SearchBar.css';

export default function SearchBar({ onSearch, onCoordsUpdate }) {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');
  const { getUserLocation, isLocating, geoError } = useGeolocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (term && location) {
      onSearch(term, location);
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
        setLocation(locationName);
        // step 3: pass the coordinates up to the parent component for location biasing in search
        if(onCoordsUpdate) {
          onCoordsUpdate(coords); 
        }
        console.log('Reverse geocoding successful ✅', locationName);
      } catch (error) {
        console.error('Error during reverse geocoding: ❌', error);
      }
    }
  }

  // Function to handle manual location input changes
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    // Clear any previously stored coordinates when the user manually changes the location input
    if(onCoordsUpdate) {
      onCoordsUpdate(null); 
    }
  }
  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <div className="search-inputs">
          <input
            type="text"
            placeholder="Search restaurants, cafes..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            required
          />
          <div className='location-wrapper'>
            <LocationInput value={location} onChange={handleLocationChange} />
            <button type="button" onClick={handleUseMyLocation} disabled={isLocating} title='Use My current location' className="geolocation-button">
              {isLocating ? '⏳' : '📍'}
            </button>
          </div>
        </div>
        <button type="submit">Search</button>
        {geoError && <p className="geo-error">{geoError}</p>}
      </form>
    </div>
  );
}