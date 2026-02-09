import '../Styles/StarRating.css';

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
        <div className="star-rating">
            {stars.map((type, index) => (
                <span key={index} className={`star star-${type}`}>
                    {type === 'full' && '★'}
                    {type === 'half' && '[]'} {/* You can replace this with a half star character or an SVG */}
                    {type === 'empty' && '☆'}
                </span>
                
            ))}
            <span className="rating-number">{rating.toFixed(1)}</span>
        </div>
    )
}
