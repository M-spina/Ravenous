import { Badge } from './ui/badge';

const PRICE_LEVEL_VALUES = {
    PRICE_LEVEL_FREE: 0,
    PRICE_LEVEL_INEXPENSIVE: 1,
    PRICE_LEVEL_MODERATE: 2,
    PRICE_LEVEL_EXPENSIVE: 3,
    PRICE_LEVEL_VERY_EXPENSIVE: 4,
};

export default function PriceLevel({ priceLevel }) {
    if(!priceLevel) return null;

    // price level from Google Places API is an integer from 0 to 4, where 0 is free and 4 is very expensive
    // PRICE_LEVEL_FREE = 0
    // PRICE_LEVEL_INEXPENSIVE = 1 ( $ )
    // PRICE_LEVEL_MODERATE = 2 ( $$ )
    // PRICE_LEVEL_EXPENSIVE = 3 ( $$$ )
    // PRICE_LEVEL_VERY_EXPENSIVE = 4 ( $$$$ )

    const numericLevel = typeof priceLevel === 'string'
        ? PRICE_LEVEL_VALUES[priceLevel]
        : priceLevel;

    if (!Number.isInteger(numericLevel) || numericLevel < 0 || numericLevel > 4) return null;

    const dollars = '$'.repeat(numericLevel);
    const emptyDollars = '$'.repeat(4 - numericLevel);

    return (
        <Badge variant="outline" className="gap-0 border-accent/30 bg-accent/10 px-2 py-0.5 font-black" aria-label={`Price level ${numericLevel} out of 4`}>
            <span className="text-accent">{dollars}</span>
            <span className="text-border">{emptyDollars}</span>
        </Badge>
    );
}
