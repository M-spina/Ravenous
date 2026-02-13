import { useState, useEffect, use } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SearchBar from './components/SearchBar'
import BusinessList from './components/BusinessList'
import SortBar from './components/SortBar'
import { loadGoogleMapsScript } from './utilities/loadGoogleMaps'
import { setSortBy, selectSortedBusinesses } from './store/placesSlice'

import './App.css'

function App() {

  const dispatch = useDispatch();
  const businesses = useSelector(selectSortedBusinesses);
  const { isLoading, error, sortBy, coords } = useSelector((state) => state.places);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  
  // Load Google Maps Places library on mount
  useEffect(() => {
    const initializeGoogleMaps = async () => {
      try {
        await loadGoogleMapsScript(); // This now loads AND stores the library
        setMapsLoaded(true);
        console.log('Google Maps initialized successfully ✅');
      } catch (error) {
        console.error('Error initializing Google Maps: ❌', error);
      }
    };
    initializeGoogleMaps();
  }, []);

  useEffect(() => {
    if (!mapsLoaded && isLoading) {
      alert('Google Maps is still loading. Please wait a moment.');
    }
  }, [mapsLoaded, isLoading]);


  const handleSortChange = (newSort) => {
    dispatch(setSortBy(newSort));
  }



  return (
    <>
      <h1>Ravenous</h1>
      <SearchBar />
      {error && <div className="error-message">{error}</div>}
      {isLoading && <div className="loading-message">Loading...</div>}
      {!isLoading && businesses.length === 0 && !error && (
        <div className="no-results">
          Search for restaurants to get started!
        </div>
      )}
      {!isLoading && businesses.length > 0 && (
        <>
          <SortBar currentSort={sortBy} onSortChange={handleSortChange} />
          <BusinessList businesses={businesses} />
        </>
      )}
    </>
  )
}

export default App