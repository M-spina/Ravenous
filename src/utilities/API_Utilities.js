import defaultImage from '../assets/placeholder.png';

export const transformPlaceData = (place) => {
  // Helper function to format opening hours into a more user-friendly string
  const formatOpeningHours = (openingHours) => {
    if(!openingHours?.weekdayDescriptions) return null;

    const today = new Date().getDay(); // Get current day of the week (0-6)
    const addjustedDay = today === 0 ? 6 : today - 1; // Adjust for API's weekday order (Monday=0, Sunday=6)

    return openingHours.weekdayDescriptions[addjustedDay] || openingHours.weekdayDescriptions[0] // Fallback to the first day if today's hours are not available
  }

  const photo = place.photos?.[0];

  return {
    id: place.id,                                    // Changed from place_id
    name: place.displayName?.text || place.displayName || 'Unknown', // Changed from name (displayName is a string in new API)
    address: place.formattedAddress,                 // Changed from formatted_address
    category: place.types?.[0]?.replace(/_/g, ' ') || 'Restaurant',
    rating: place.rating || 0,
    reviewCount: place.userRatingCount || 0,        // Changed from user_ratings_total
    priceLevel: place.priceLevel || null,              // New field in Places API
    imageUrl: place.photos?.[0] 
      ? place.photos[0].getURI({ maxWidth: 400 })   // Changed from getUrl() to getURI()
      : defaultImage,
    photoAttributions: (photo?.authorAttributions || []).map((author) => ({
      displayName: author.displayName || 'Photo contributor',
      uri: author.uri || null,
    })),
    placeAttributions: (place.attributions || []).map((source) => ({
      provider: typeof source === 'string' ? source : source.provider || 'Data provider',
      providerURI: source.providerURI || null,
    })),
    phone: place.internationalPhoneNumber || null,     // New field in Places API
    website: place.googleMapsURI || null,            // New field in Places API
    hours: formatOpeningHours(place.regularOpeningHours) // New field in Places API    
  };
};

export const transformPlacesResponse = (places) => {
  return places.map(transformPlaceData);
};