import { useState } from 'react'
import BusinessList from './components/businessList'
import pizzaImage from './assets/14.jpg'

import './App.css'

const testBusinesses = [
  {
    id: 1,
    imageSrc: pizzaImage,
    name: "Joe's Pizza",
    address: "7 Carmine St",
    zipCode: "10014",
    category: "Italian",
    rating: 4.5,
    reviewCount: 1024
  },
  {
    id: 2,
    imageSrc: pizzaImage,
    name: "Luigi's Pizzeria",
    address: "123 Main St",
    zipCode: "10001",
    category: "Italian",
    rating: 4.0,
    reviewCount: 850
  },
  {
    id: 3,
    imageSrc: pizzaImage,
    name: "Mama Mia's",
    address: "456 Elm St",
    zipCode: "10002",
    category: "Italian",
    rating: 4.2,
    reviewCount: 900
  }
];

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BusinessList businesses={testBusinesses} />
    </>
  )
}

export default App
