import {useState, useEffect, useRef} from 'react';
import { loadGoogleMapsScript } from '../utilities/loadGoogleMaps';
import { searchPlaces } from '../utilities/placesService';
import { transformPlacesResponse } from '../utilities/API_Utilities';

export const usePlaces = () => {
    const [businesses, setBusinesses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mapsLoaded, setMapsLoaded] = useState(false);
    const [sortBy, setSortBy] = useState('bestMatch'); // Default sort option

    const coordsRef = useRef(null); // Store user coordinates in a ref to avoid unnecessary re-renders

    // Load Google Maps Places library on mount
    useEffect(() => {
        const initializeGoogleMaps = async () => {
            try {
                await loadGoogleMapsScript(); // This now loads AND stores the library
                setMapsLoaded(true);
                console.log('Google Maps initialized successfully ✅');
            } catch (error) {
                console.error('Error initializing Google Maps: ❌', error);
                setError('Failed to load Google Maps. Please try again later.');
            }
        }
        initializeGoogleMaps();
    }, []);

    // Functions to set user coordinates in the ref without causing re-renders
    const setCoords = (coords) => {
        coordsRef.current = coords;
        console.log('User coordinates set in ref ✅', coords);
    }
    // Clear coordinates from the ref when user opts out of location-based search or when location becomes unavailable
    const clearCoords = () => {
        coordsRef.current = null;
        console.log('User coordinates cleared from ref ✅');
    }

    // sort businesses based on the selected criteria
    const sortBusinesses = (businessesToSort, sortType) => {
        const sorted = [...businessesToSort]; // Create a copy to avoid mutating state directly

        switch (sortType) {
            case 'rating':
                return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0)); // Handle missing ratings by treating them as 0
            case 'reviewCount':
                return sorted.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)); // Handle missing review counts by treating them as 0
            case 'bestMatch':
            default:
                return sorted; // Assuming the original order is the best match order
        }
    }

    // Get sorted businesses based on current sort option
    const sortedBusinesses = sortBusinesses(businesses, sortBy); // Default sort by best match

    // Function to handle searching for places
    const handleSearch = async (term, location) => {
        if(!mapsLoaded) {
            setError('Google Maps is still loading. Please wait and try again.');
            return;
        }
        setIsLoading(true);
        setError(null);

        try {
            console.log(`Searching for "${term}" in "${location}"...`);
            // Pass the current coordinates from the ref to the search function for location biasing
            const places = await searchPlaces(term, location, coordsRef.current);
            const transformedBusinesses = transformPlacesResponse(places);
            setBusinesses(transformedBusinesses);
            setSortBy('bestMatch'); // Reset sort to default when new search results come in
        } catch (error) {
            console.error('Error during search: ❌', error);
            setError('An error occurred while searching for businesses. Please try again.');
            setBusinesses([]);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSortChange = (sortOption) => {
        setSortBy(sortOption);
        console.log(`Sort option changed to: ${sortOption} ✅`);
    }

    return { businesses: sortedBusinesses, isLoading, error, mapsLoaded, handleSearch, setCoords, clearCoords, sortBy, handleSortChange };
};