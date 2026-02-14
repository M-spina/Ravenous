import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SearchBar from './components/SearchBar'
import BusinessList from './components/BusinessList'
import SortBar from './components/SortBar'
import BusinessListSkeleton from './components/Skeletons/BusinessListSkeleton'
import { selectSortedBusinesses, initializeGoogleMaps } from './store/placesSlice'

import './App.css'

function App() {

  const dispatch = useDispatch();
  // Get state from the Redux store using selectors
  const businesses = useSelector(selectSortedBusinesses);
  const { isLoading, error, mapsError } = useSelector((state) => state.places);

  
  // Initialize Google Maps when the app mounts so it's ready to use for location-based search and displaying maps in business details
  useEffect(() => {
    dispatch(initializeGoogleMaps());
  }, [dispatch]);


  return (
    <>
      <h1>Ravenous</h1>
      {mapsError && (<div className="error-message">Failed to load Google Maps: {mapsError}</div>)}
      <SearchBar />

      {error && <div className="error-message">{error}</div>}

      {isLoading && <BusinessListSkeleton count={6}/>}
      
      {!isLoading && businesses.length === 0 && !error && (
        <div className="no-results">
          Search for restaurants to get started!
        </div>
      )}
      {!isLoading && businesses.length > 0 && (
        <>
          <SortBar />
          <BusinessList businesses={businesses} />
        </>
      )}
    </>
  )
}

export default App