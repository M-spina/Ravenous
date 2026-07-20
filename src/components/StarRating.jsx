export default function StarRating({rating}) {
    // convert rating into an array of star types (full, half, empty)
    const getStars = (rating) => {
        const star = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        // add full stars
        for (let i =0; i < fullStars; i++) {
            star.push('full');
        }
        // add half star if needed
        if (halfStar) {
            star.push('half');
        }
        // add empty stars
        for (let i =0; i < emptyStars; i++) {
            star.push('empty');
        }
        return star;
    };

    const stars = getStars(rating);

    return (
        <div className="flex items-center gap-1" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
            <span className="flex items-center gap-px" aria-hidden="true">
                {stars.map((type, index) => (
                    <span key={index} className="relative inline-block text-base leading-none">
                        {type === 'full' && <span className="text-highlight">★</span>}
                        {type === 'half' && (
                            <span className="relative inline-block">
                                <span className="absolute left-0 top-0 w-1/2 overflow-hidden text-highlight">★</span>
                                <span className="text-border">★</span>
                            </span>
                        )}
                        {type === 'empty' && <span className="text-border">☆</span>}
                    </span>
                ))}
            </span>
            <span className="text-sm font-black text-foreground">{rating.toFixed(1)}</span>
        </div>
    )
}
