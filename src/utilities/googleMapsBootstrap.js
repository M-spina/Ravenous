// Dynamic import bootstrap adapted from Google's Maps JavaScript loading guide:
// https://developers.google.com/maps/documentation/javascript/load-maps-js-api
// The key is public browser configuration; its existing name and weekly channel remain unchanged.
export const ensureGoogleMapsBootstrap = (apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY) => {
  const google = globalThis.google ||= {};
  const maps = google.maps ||= {};
  if (maps.importLibrary) return;
  if (!apiKey) throw new Error('Google Maps configuration is missing. Please try again later.');

  const libraries = new Set();
  let loadingPromise;
  const load = () => {
    if (!loadingPromise) {
      loadingPromise = new Promise((resolve, reject) => {
        // Coalesce libraries requested during the same task before starting the request.
        queueMicrotask(() => {
          const script = document.createElement('script');
          const params = new URLSearchParams({
            key: apiKey,
            v: 'weekly',
            libraries: [...libraries].join(','),
            callback: 'google.maps.__ib__',
          });
          script.src = `https://maps.googleapis.com/maps/api/js?${params}`;
          script.async = true;
          const nonce = document.querySelector('script[nonce]')?.nonce;
          if (nonce) script.nonce = nonce;
          maps.__ib__ = resolve;
          script.onerror = () => {
            script.remove();
            delete maps.__ib__;
            loadingPromise = null;
            reject(new Error('Google Maps could not load. Please try again later.'));
          };
          document.head.append(script);
        });
      });
    }
    return loadingPromise;
  };
  maps.importLibrary = (library, ...args) => {
    libraries.add(library);
    return load().then(() => maps.importLibrary(library, ...args));
  };
};
