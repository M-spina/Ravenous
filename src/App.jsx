import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import BusinessList from './components/BusinessList'
import { loadGoogleMapsScript } from './utilities/loadGoogleMaps'
import { searchPlaces } from './utilities/placesService'
import { transformPlacesResponse } from './utilities/API_Utilities'

import './App.css'

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapsLoaded, setMapsLoaded] = useState(false);

  useEffect(() => {
    const initializeGoogleMaps = async () => {
      try {
        await loadGoogleMapsScript(); // This now loads AND stores the library
        setMapsLoaded(true);
        console.log('Google Maps initialized successfully');
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
        setError('Failed to load Google Maps. Please try again later.');
      }
    }
    initializeGoogleMaps();
  }, []);

  const handleSearch = async (term, location) => {
    if(!mapsLoaded) {
      setError('Google Maps is still loading. Please wait and try again.');
      return;
    }
    setIsLoading(true);
    setError(null);

    try{
      console.log(`Searching for "${term}" in "${location}"...`);

      const places = await searchPlaces(term, location);
      const transformedBusinesses = transformPlacesResponse(places);

      setBusinesses(transformedBusinesses);
      console.log('Search completed successfully');
    } catch (error) {
      console.error('Error during search:', error);
      setError('An error occurred while searching for businesses. Please try again.');
      setBusinesses([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Ravenous</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <div className="error-message">{error}</div>}
      {isLoading && <div className="loading-message">Loading...</div>}
      {!isLoading && businesses.length === 0 && !error && (
        <div className="no-results">
          Search for restaurants to get started!
        </div>
      )}
      {!isLoading && businesses.length > 0 && (
        <BusinessList businesses={businesses} />
      )}
    </>
  )
}

export default App