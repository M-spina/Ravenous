import { useEffect, useRef, useState } from 'react';
export const useGeolocation = () => {
    const requestIdRef = useRef(0);
    useEffect(() => () => { requestIdRef.current += 1; }, []);

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
                resolve(coords); 
            }, (error) => { // Handle different geolocation errors with specific messages
                let message;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = 'Permission denied. Please allow location access and try again.';
                        break;
                    case error.POSITION_UNAVAILABLE: {
                        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                        const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                        if (isSafari && isLocalHost) {
                            message = 'Safari requires HTTPS for location access. Please use Chrome/Firefox for testing, or type your location manually.';
                        } else {
                            message = 'Position unavailable. Please try again later.';
                        }
                        break;
                    }
                    case error.TIMEOUT:
                        message = 'Location request timed out. Please try again.';
                        break;
                    default:
                        message = 'An unknown error occurred while retrieving location.';
                }
                reject(new Error(message));
            }, { // Options to improve accuracy and handle timeouts
                enableHighAccuracy: true,
                timeout: 10000, // 10 seconds
                maximumAge: 5 * 60 * 1000 // 5 minutes
            });
        })

    };
    // Call this function to get the user's current location when needed
    const getUserLocation = async () => {
        const requestId = ++requestIdRef.current;
        setIsLocating(true);
        setGeoError(null);
        try {
            const coords = await getCurrentLocation();
            return requestId === requestIdRef.current ? coords : undefined;
        } catch (error) {
            if (requestId === requestIdRef.current) setGeoError(error.message);
        } finally {
            if (requestId === requestIdRef.current) setIsLocating(false);
        }
    };

    const cancelLocation = () => {
        requestIdRef.current += 1;
        setIsLocating(false);
        setGeoError(null);
    };

    return { getUserLocation, cancelLocation, isLocating, geoError };
}
