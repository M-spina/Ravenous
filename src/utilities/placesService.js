import { getPlacesLibrary } from './loadGoogleMaps.js';

export const searchPlaces = async (query, location, coords = null) => {
    try {
        // Get the already-loaded Places library (with API key)
        const { Place } = getPlacesLibrary();

        const request = {
            textQuery: `${query} in ${location}`,
            fields: ['id', 'displayName', 'formattedAddress', 'location', 'photos', 'rating', 'userRatingCount', 'types', 'priceLevel'],
            maxResultCount: 20
        };

        if (coords) {
            request.locationBias = {
                center: new google.maps.LatLng(coords.lat, coords.lng),// Bias results to the user's current location
                radius: 5000 // Bias results to a 5km radius around the user's location
            };
            console.log('Using location bias with coordinates ✅', coords);
        }
        
        const { places } = await Place.searchByText(request);
        console.log(`Places search successful (New API): ✅`, places);
        return places;

    } catch (error) {
        console.error('Error searching for places: ❌', error);
        throw new Error(`Failed to search for places: ${error.message}`);
    }
};