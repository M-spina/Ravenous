// Store the loaded library so we can reuse it
let placesLibrary = null;

export const loadGoogleMapsScript = async () => {
    if (!placesLibrary) {
        // Use Google's built-in importLibrary from the bootstrap loader
        placesLibrary = await globalThis.google.maps.importLibrary("places");
    }
    return placesLibrary;
};

export const getPlacesLibrary = () => {
    if (!placesLibrary) {
        throw new Error('Places library not loaded yet. Call loadGoogleMapsScript() first.');
    }
    return placesLibrary;
};
