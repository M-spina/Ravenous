import { useState } from 'react';
import StarRating from './StarRating';
import PriceLevel from './PriceLevel';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Clock3, ExternalLink, MapPin, Phone, RotateCcw, RotateCw } from 'lucide-react';

export default function Business({ business }) {

  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped((current) => !current);
  };
  const preventFlip = (e) => {
    // Prevent flipping back when clicking on links or buttons
    e.stopPropagation();
  };

  return (
    <Card
      className="group relative h-[31rem] cursor-pointer border-0 bg-transparent shadow-none [perspective:1200px] transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none sm:h-[30rem]"
      onClick={handleCardClick}
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={isFlipped ? `Show summary for ${business.name}` : `Show details for ${business.name}`}
        aria-pressed={isFlipped}
        onClick={(event) => {
          preventFlip(event);
          handleCardClick();
        }}
        className="absolute right-3 top-3 z-30 size-9 rounded-full border-primary/20 bg-card/95 text-primary shadow-md backdrop-blur hover:bg-muted"
      >
        {isFlipped ? <RotateCcw aria-hidden="true" /> : <RotateCw aria-hidden="true" />}
      </Button>

      <div className={`relative size-full transform-gpu transform-3d transition-transform duration-700 ease-in-out motion-reduce:transition-none ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg backface-hidden"
          aria-hidden={isFlipped}
          inert={isFlipped ? '' : undefined}
        >
          <div className="relative h-48 shrink-0 overflow-hidden bg-muted sm:h-52">
            <img
              src={business.imageUrl || business.imageSrc}
              alt={business.name}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-foreground/55 to-transparent" />
            <Badge className="absolute bottom-3 left-3 max-w-[70%] border border-primary-foreground/25 bg-primary text-primary-foreground shadow-sm">
              <span className="truncate">{business.category}</span>
            </Badge>
          </div>

          <div className="flex min-h-0 flex-1 flex-col p-5 text-left">
            <h3 className="line-clamp-2 pr-9 text-xl font-black leading-tight tracking-tight text-foreground">
              {business.name}
            </h3>

            <div className="mt-4 flex items-start gap-2.5 text-sm text-muted-foreground">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <span className="sr-only">Address: </span>
                <p className="line-clamp-3 leading-relaxed">{business.address}</p>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-border pt-4">
              <StarRating rating={business.rating} />
              <span aria-hidden="true" className="text-border">•</span>
              <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                {business.reviewCount} reviews
              </span>
              {business.priceLevel && (
                <>
                  <span aria-hidden="true" className="text-border">•</span>
                  <PriceLevel priceLevel={business.priceLevel} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl border border-primary-foreground/20 bg-gradient-to-br from-primary-dark via-primary to-accent text-primary-foreground shadow-xl [transform:rotateY(180deg)] backface-hidden"
          aria-hidden={!isFlipped}
          inert={!isFlipped ? '' : undefined}
        >
          <div className="flex size-full flex-col overflow-y-auto p-6 pt-16">
            <div className="mb-5 border-b border-primary-foreground/25 pb-4 text-center">
              <Badge className="mb-3 border border-primary-foreground/30 bg-primary-foreground/15 text-primary-foreground">
                Restaurant details
              </Badge>
              <h3 className="text-xl font-black leading-tight text-primary-foreground">{business.name}</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 p-3.5 backdrop-blur-sm">
                <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                <span className="min-w-0 text-sm leading-relaxed">
                {business.phone ? (
                    <a href={`tel:${business.phone}`} onClick={preventFlip} className="break-words font-semibold underline decoration-primary-foreground/50 underline-offset-4 hover:decoration-primary-foreground">{business.phone}</a>
                ) : (
                  'Not available'
                )}
                </span>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 p-3.5 backdrop-blur-sm">
                <ExternalLink aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                <span className="min-w-0 text-sm leading-relaxed">
                {business.website ? (
                    <a href={business.website} target="_blank" rel="noopener noreferrer" onClick={preventFlip} className="font-semibold underline decoration-primary-foreground/50 underline-offset-4 hover:decoration-primary-foreground">
                    View on Google Maps
                  </a>
                ) : (
                  'Not available'
                )}
                </span>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 p-3.5 backdrop-blur-sm">
                <Clock3 aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                <span className="min-w-0 whitespace-pre-line text-sm leading-relaxed">{business.hours || 'Hours unavailable'}</span>
              </div>
            </div>

            <Button
              type="button"
              variant="secondary"
              className="mt-auto w-full shadow-lg"
              onClick={(e) => {
                preventFlip(e);
                // TODO: Navigate to detail page in Phase 3b
                alert(`View details for ${business.name} (coming in Phase 3b!)`);
              }}
            >
              View Full Details
              <ExternalLink aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
