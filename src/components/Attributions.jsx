import { safeExternalUrl } from '../utilities/safeExternalUrl';

function AttributionName({ name, uri }) {
  const href = safeExternalUrl(uri);
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="break-words underline underline-offset-2" onClick={(event) => event.stopPropagation()}>{name}</a>
  ) : <span className="break-words">{name}</span>;
}

export function PhotoAttributions({ attributions = [] }) {
  if (!attributions.length) return null;
  return (
    <figcaption className="bg-card px-5 py-2 text-xs leading-relaxed text-muted-foreground">
      Photo: {attributions.map((author, index) => (
        <span key={index}>{index > 0 && ', '}<AttributionName name={author.displayName} uri={author.uri} /></span>
      ))}
    </figcaption>
  );
}

export function PlaceAttributions({ attributions = [] }) {
  if (!attributions.length) return null;
  return (
    <p className="mt-2 px-2 text-xs leading-relaxed text-muted-foreground">
      Data providers: {attributions.map((source, index) => (
        <span key={index}>{index > 0 && ', '}<AttributionName name={source.provider} uri={source.providerURI} /></span>
      ))}
    </p>
  );
}
