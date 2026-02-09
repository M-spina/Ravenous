import defaultImage from '../assets/placeholder.png';

export const transformPlaceData = (place) => {
  return {
    id: place.id,                                    // Changed from place_id
    name: place.displayName?.text || place.displayName || 'Unknown', // Changed from name (displayName is a string in new API)
    address: place.formattedAddress,                 // Changed from formatted_address
    category: place.types?.[0]?.replace(/_/g, ' ') || 'Restaurant',
    rating: place.rating || 0,
    reviewCount: place.userRatingCount || 0,        // Changed from user_ratings_total
    imageUrl: place.photos?.[0] 
      ? place.photos[0].getURI({ maxWidth: 400 })   // Changed from getUrl() to getURI()
      : defaultImage
  };
};

export const transformPlacesResponse = (places) => {
  return places.map(transformPlaceData);
};