import SearchBar from './components/SearchBar'
import BusinessList from './components/BusinessList'
import SortBar from './components/SortBar'
import { usePlaces } from './hooks/usePlaces'

import './App.css'

function App() {
  
  const { businesses, isLoading, error, handleSearch, setCoords, clearCoords, sortBy, handleSortChange } = usePlaces();

  const handleCoordsUpdate = (coords) => {
    if(coords) {
      setCoords(coords);
    } else {
      clearCoords();
    }
  }

  return (
    <>
      <h1>Ravenous</h1>
      <SearchBar onSearch={handleSearch} onCoordsUpdate={handleCoordsUpdate} />
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