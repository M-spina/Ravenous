import { ensureGoogleMapsBootstrap } from './googleMapsBootstrap';

// Store the loaded library so we can reuse it
let placesLibrary = null;
let placesPromise = null;
let geocodingLibrary = null;

export const loadGoogleMapsScript = async () => {
    if (!placesLibrary) {
        if (!placesPromise) {
            ensureGoogleMapsBootstrap();
            placesPromise = globalThis.google.maps.importLibrary("places")
                .then((library) => { placesLibrary = library; return library; })
                .catch((error) => { placesPromise = null; throw error; });
        }
        return placesPromise;
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
