import {useState, useEffect, useRef} from 'react';
import { loadGoogleMapsScript } from '../utilities/loadGoogleMaps';
import { searchPlaces } from '../utilities/placesService';
import { transformPlacesResponse } from '../utilities/API_Utilities';

export const usePlaces = () => {
    const [businesses, setBusinesses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mapsLoaded, setMapsLoaded] = useState(false);

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

    const setCoords = (coords) => {
        coordsRef.current = coords;
        console.log('User coordinates set in ref ✅', coords);
    }

    const clearCoords = () => {
        coordsRef.current = null;
        console.log('User coordinates cleared from ref ✅');
    }

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
        } catch (error) {
            console.error('Error during search: ❌', error);
            setError('An error occurred while searching for businesses. Please try again.');
            setBusinesses([]);
        } finally {
            setIsLoading(false);
        }
    }

    return { businesses, isLoading, error, mapsLoaded, handleSearch, setCoords, clearCoords };
};