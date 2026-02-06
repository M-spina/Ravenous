export const transformPlaceData = (place) => {
  return {
    id: place.place_id,
    name: place.name,
    address: place.formatted_address || place.vicinity,
    category: place.types?.[0]?.replace(/_/g, ' ') || 'Restaurant',
    rating: place.rating || 0,
    reviewCount: place.user_ratings_total || 0,
    imageUrl: place.photos?.[0] 
      ? place.photos[0].getUrl({ maxWidth: 400 }) // ← SDK method, not REST API
      : null
  };
};

export const transformPlacesResponse = (results) => {
  return results.map(transformPlaceData);
};