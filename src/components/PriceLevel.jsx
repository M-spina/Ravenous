import '../styles/PriceLevel.css';

export default function PriceLevel({ priceLevel }) {
    if(!priceLevel) return null;

    // price level from Google Places API is an integer from 0 to 4, where 0 is free and 4 is very expensive
    // PRICE_LEVEL_FREE = 0
    // PRICE_LEVEL_INEXPENSIVE = 1 ( $ )
    // PRICE_LEVEL_MODERATE = 2 ( $$ )
    // PRICE_LEVEL_EXPENSIVE = 3 ( $$$ )
    // PRICE_LEVEL_VERY_EXPENSIVE = 4 ( $$$$ )

    const getPriceDisplay = (level) => {
        let numericLevel = level;
        if(typeof level === 'string'){
            if(level.includes('INEXPENSIVE')) numericLevel = 1;
            else if(level.includes('MODERATE')) numericLevel = 2;
            else if(level.includes('EXPENSIVE')) numericLevel = 3;
            else if(level.includes('VERY_EXPENSIVE')) numericLevel = 4;
            else if(level.includes('FREE')) numericLevel = 0;
        }

        const dollars = '$'.repeat(Math.min(numericLevel, 4)); // Cap at 4 dollars
        const emptyDollars = '$'.repeat(Math.max(0, 4 - numericLevel)); // Fill the rest with empty dollars for consistent width

        return {dollars, emptyDollars};
    }

    const { dollars, emptyDollars } = getPriceDisplay(priceLevel);

    return (
        <div className="price-level">
            <span className="price-active">{dollars}</span>
            <span className="price-inactive">{emptyDollars}</span>
        </div>
    );
}