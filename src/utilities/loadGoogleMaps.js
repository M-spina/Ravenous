// Store the loaded library so we can reuse it
let placesLibrary = null;

export const loadGoogleMapsScript = async () => {
    try {
        if (!placesLibrary) {
            // Use Google's built-in importLibrary from the bootstrap loader
            placesLibrary = await globalThis.google.maps.importLibrary("places");
            console.log('Google Maps Places library loaded successfully ✅');
        }
        return placesLibrary;
    } catch (error) {
        console.error('Failed to load Google Maps Places library:', error);
        throw error;
    }
};

export const getPlacesLibrary = () => {
    if (!placesLibrary) {
        throw new Error('Places library not loaded yet. Call loadGoogleMapsScript() first.');
    }
    return placesLibrary;
};
