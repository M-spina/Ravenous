import { getPlacesLibrary } from './loadGoogleMaps.js';

export const searchPlaces = async (query, location) => {
    try {
        // Get the already-loaded Places library (with API key)
        const { Place } = getPlacesLibrary();

        const request = {
            textQuery: `${query} in ${location}`,
            fields: ['id', 'displayName', 'formattedAddress', 'location', 'photos', 'rating', 'userRatingCount', 'types', 'priceLevel'],
            maxResultCount: 20
        };
        
        const { places } = await Place.searchByText(request);
        console.log(`Places search successful (New API): ✅`, places);
        return places;

    } catch (error) {
        console.error('Error searching for places: ❌', error);
        throw new Error(`Failed to search for places: ${error.message}`);
    }
};