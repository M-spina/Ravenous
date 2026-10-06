import { ensureGoogleMapsBootstrap } from './googleMapsBootstrap';

// Store the loaded library so we can reuse it
let placesLibrary = null;
let geocodingLibrary = null;

export const loadGoogleMapsScript = async () => {
    if (!placesLibrary) {
        ensureGoogleMapsBootstrap();
        // Use Google's built-in importLibrary from the bundled bootstrap loader
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

export const loadGeocodingLibrary = async () => {
    if (!geocodingLibrary) {
        ensureGoogleMapsBootstrap();
        geocodingLibrary = await globalThis.google.maps.importLibrary("geocoding");
    }
    return geocodingLibrary;
};
