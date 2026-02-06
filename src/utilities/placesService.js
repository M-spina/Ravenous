export const searchPlaces = (query, location) => {
    return new Promise((resolve, reject) => {
        //create a hiiden map div to initialize the PlacesService
        const mapDiv = document.createElement('div');
        const map = new window.google.maps.Map(mapDiv);

        const service = new window.google.maps.places.PlacesService(map);

        const request = {
            query: `${query} in ${location}`,
            fields: ['place_id', 'name', 'formatted_address', 'geometry', 'photos', 'rating', 'user_ratings_total', 'types']
        };

        // Perform a text search using the PlacesService
        service.textSearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                console.log('Places search successful: ✅', results);
                resolve(results);
            } else{
                console.error('Places search failed: ❌', status);
                reject(new Error(`Places search failed: ${status}`));
            }
        });
    });
}