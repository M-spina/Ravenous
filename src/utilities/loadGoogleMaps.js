export const loadGoogleMapsScript = () => {
    return new Promise((resolve, reject) => {
        // Check if the script is already loaded
        if(window.google && window.google.maps) {
            resolve();
            return;
        }
        // Create the script element
        const script = document.createElement('script');
        const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

        // Set the source to the Google Maps API with the Places library
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            console.log('Google Maps script loaded successfully');
            resolve();
        };

        script.onerror = () => {
            console.error('Failed to load Google Maps script');
            reject(new Error('Failed to load Google Maps script'));
        };
        // Append the script to the document head
        document.head.appendChild(script);
    });

};