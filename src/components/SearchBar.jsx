import { useState } from 'react';
import '../Styles/SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (term && location) {
      onSearch(term, location);
    }
  };

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
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}