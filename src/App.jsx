import { useState } from 'react'
import SearchBar from './components/SearchBar'
import BusinessList from './components/BusinessList'
import pizzaImage from './assets/14.jpg'

import './App.css'

console.log('API Key loaded:', import.meta.env.VITE_GOOGLE_PLACES_API_KEY ? 'Yes ✅' : 'No ❌');

const testBusinesses = [
  {
    id: "ChIJN1t_tDeuEmsRUsoyG83frY4", // Use place_id format
    imageSrc: pizzaImage,
    name: "Joe's Pizza",
    address: "7 Carmine St, New York, NY 10014, USA", // Full formatted address
    category: "Italian Restaurant",
    rating: 4.5,
    reviewCount: 1024
  },
  {
    id: "ChIJN1t_tDeuEmsRUsoyG83frY5",
    imageSrc: pizzaImage,
    name: "Luigi's Pizzeria",
    address: "123 Main St, New York, NY 10001, USA",
    category: "Italian Restaurant",
    rating: 4.0,
    reviewCount: 850
  },
  {
    id: "ChIJN1t_tDeuEmsRUsoyG83frY6",
    imageSrc: pizzaImage,
    name: "Mama Mia's",
    address: "456 Elm St, New York, NY 10002, USA",
    category: "Italian Restaurant",
    rating: 4.2,
    reviewCount: 900
  },
  {
    id: "ChIJN1t_tDeuEmsRUsoyG83frY7",
    imageSrc: pizzaImage,
    name: "Pizza GOGO",
    address: "234 Oak St, New York, NY 10003, USA",
    category: "Italian Restaurant",
    rating: 4.2,
    reviewCount: 500
  },
  {
    id: "ChIJN1t_tDeuEmsRUsoyG83frY8",
    imageSrc: pizzaImage,
    name: "Matilda's Pies",
    address: "111 Pine St, New York, NY 10004, USA",
    category: "Italian Restaurant",
    rating: 4.2,
    reviewCount: 1802
  }
];

function App() {
  const [businesses, setBusinesses] = useState(testBusinesses);

  const handleSearch = (term, location) => {
    console.log(`Searching for ${term} in ${location}`);
    // Here you would typically make an API call to fetch businesses based on the search term and location
  }

  return (
    <>
      <h1>Ravenous</h1>
      <SearchBar onSearch={handleSearch} />
      <BusinessList businesses={businesses} />
    </>
  )
}

export default App