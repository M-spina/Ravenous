# Bundled asset provenance

- `src/assets/placeholder.svg`: original geometric plate/cutlery illustration authored for Ravenous in this change. No third-party photo content.
- `public/ravenous-social-preview.png`: original project graphic rendered from simple geometry and text with Pillow. Typography uses Pillow's bundled Aileron default font for rendering; no font file is distributed. The original font publisher permits use, modification and redistribution under “No Rights Reserved”: https://dotcolon.net/fonts/aileron/ (checked 5 October 2026). This replaces the old meal photograph, whose provenance was not recorded.
- `public/ravenous-favicon.svg`: project-native geometric SVG branding retained from the repository; contains basic vector paths rather than an external raster photograph.
- `public/google-maps-attribution.svg`: unmodified official Google Maps logo; source and permitted attribution use are documented in `google-attribution.md`. The logo remains Google's mark; it is not Ravenous artwork.
- Google restaurant photos: fetched at runtime, never bundled or persisted by Ravenous; supplied author attribution is displayed. Use remains subject to Google's terms and contributor rights.

Removed unused `14.jpg` and old README screenshot JPGs because their photographic sources/licences were not recorded. Removed the unused React starter logo. API keys and environment files were not changed.

Before adding any image, record its author/source, licence or permission, allowed use and required credits here. Do not assume search-engine discovery or a public image URL grants reuse rights.
