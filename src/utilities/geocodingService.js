export const reverseGeocode = async (coords) => {
    try {
        const geocoder = new globalThis.google.maps.Geocoder();
        const response = await geocoder.geocode({ 
            location: { lat: coords.lat, lng: coords.lng }
        });

        if (response.results && response.results.length > 0) {
            //Find the city-level result in the geocoding response, as we want to extract the city name for our search
            const cityResult = response.results.find(result => 
                result.types.includes('locality')  
            );
            // Fallback to the first result if no specific city result is found, but ideally we want the city-level information
            const bestResult = cityResult || response.results[0];

            // Extract the city and country from the best geocoding result to use in our search
            const city = bestResult.address_components.find((comp) => comp.types.includes('locality'))?.long_name;
    
            const country = bestResult.address_components.find((comp) => comp.types.includes('country'))?.long_name;

            const locationName = city && country
                ? `${city}, ${country}`
                : bestResult.formatted_address; // Fallback to the full formatted address if city/country is not available

            return locationName;
        }

        throw new Error('No results found for the given coordinates');
    } catch {
        throw new Error('Failed to reverse geocode location. Please try again.');
    }
};
