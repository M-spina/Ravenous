# Google Maps attribution

The local SVG is the unmodified GoogleMaps_Logo_DarkGray.svg from Google's official attribution archive: https://developers.google.com/static/maps/documentation/images/Google_Maps_Attribution_Assets.zip. Use is governed by Google's attribution guidance: https://developers.google.com/maps/documentation/javascript/policies.

The component renders the asset on a plain light background at 18 CSS pixels high, preserving its aspect ratio, with at least 10 pixels of top/side space and 5 pixels below it. Its accessible name is Google Maps. Attribution stays in the same container as the results and outside the autocomplete listbox.

Photo credits belong to the photo actually displayed; provider attribution uses Place.attributions. Plain objects in Redux retain names and URLs, not SDK objects or HTML. Attribution links accept absolute HTTP/HTTPS URLs only, without credentials. Unsafe URLs are displayed as text.

The legal pages are independent HTML entry points and do not load Google or the React application. Their marked owner and privacy details remain launch inputs.
