import {useState, useEffect} from 'react';
import { loadGoogleMapsScript } from '../utilities/loadGoogleMaps';
import { searchPlaces } from '../utilities/placesService';
import { transformPlacesResponse } from '../utilities/API_Utilities';

export const usePlaces = () => {
    const [businesses, setBusinesses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
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
                setError('Failed to load Google Maps. Please try again later.');
            }
        }
        initializeGoogleMaps();
    }, []);

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
            const places = await searchPlaces(term, location);
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

    return { businesses, isLoading, error, mapsLoaded, handleSearch };
};