import { useState } from 'react';
export const useGeolocation = () => {
    const [isLocating, setIsLocating] = useState(false);
    const [geoError, setGeoError] = useState(null);

    const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by your browser'));
                return;
            }

            navigator.geolocation.getCurrentPosition((position) => {
                // successfully retrieved location
                const coords = { 
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                console.log('Geolocation coordinates retrieved ✅', coords);
                resolve(coords); 
            }, (error) => { // Handle different geolocation errors with specific messages
                let message;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = 'Permission denied. Please allow location access and try again.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = 'Position unavailable. Please try again later.';
                        break;
                    case error.TIMEOUT:
                        message = 'Location request timed out. Please try again.';
                        break;
                    default:
                        message = 'An unknown error occurred while retrieving location.';
                }
                console.error("Geolocation error ❌:", message);
                reject(new Error(message));
            }, { // Options to improve accuracy and handle timeouts
                enableHighAccuracy: true,
                timeout: 10000, // 10 seconds
                maximumAge: 30000 // 5 minutes
            });
        })

    };
    // Call this function to get the user's current location when needed
    const getUserLocation = async () => {
        setIsLocating(true);
        setGeoError(null);
        try {
            const coords = await getCurrentLocation();
            return coords;
        } catch (error) {
            console.error('Error getting user location ❌:', error);
            setGeoError(error.message);
        } finally {
            setIsLocating(false);
        }
    };

    return { getUserLocation, isLocating, geoError };
}