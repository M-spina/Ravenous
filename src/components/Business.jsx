import { useState } from 'react';
import StarRating from './StarRating';
import PriceLevel from './PriceLevel';
import '../Styles/Business.css';

export default function Business({ business }) {

  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    console.log('Card clicked! Current flip state:', isFlipped);
    setIsFlipped(!isFlipped);
  };
  const preventFlip = (e) => {
    // Prevent flipping back when clicking on links or buttons
    e.stopPropagation();
    console.log('Back content clicked - flip prevented');
  };

  return (
    <div 
      className={`business-card ${isFlipped ? 'flipped' : ''}`}
      onClick={handleCardClick}
    >
      <div className='business-card-inner'>
        {/* FRONT SIDE */}
        <div className="business-card-face business-card-front">
          <img 
            src={business.imageUrl || business.imageSrc} 
            alt={business.name} 
            className="business-image" 
          />
          <div className="business-info">
            <h3>{business.name}</h3>
            <div className="business-details">
              <div className="business-left">
                <p>Address:</p>
                <p>{business.address}</p>
              </div>
              <div className="business-right">
                <p>Category:</p>
                <p>{business.category}</p>
              </div>
            </div>
            <div className='business-rating'>
              <StarRating rating={business.rating} />
              <span className='review-count'>{business.reviewCount} reviews</span>
              {business.priceLevel && (
                <>
                  <span className="separator">•</span>
                  <PriceLevel priceLevel={business.priceLevel} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div 
          className="business-card-face business-card-back"
        >
          <div className="business-back-content">
            <h3>{business.name}</h3>

            <div className="back-info-item">
              <span className="back-icon">📞</span>
              <span className="back-text">
                {business.phone ? (
                  <a href={`tel:${business.phone}`} onClick={preventFlip}>{business.phone}</a>
                ) : (
                  'Not available'
                )}
              </span>
            </div>

            <div className="back-info-item">
              <span className="back-icon">🗺️</span>
              <span className="back-text">
                {business.website ? (
                  <a href={business.website} target="_blank" rel="noopener noreferrer" onClick={preventFlip}>
                    View on Google Maps
                  </a>
                ) : (
                  'Not available'
                )}
              </span>
            </div>

            <div className="back-info-item">
              <span className="back-icon">🕒</span>
              <span className="back-text">{business.hours || 'Hours unavailable'}</span>
            </div>

            <button 
              className="details-button"
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Navigate to detail page in Phase 3b
                alert(`View details for ${business.name} (coming in Phase 3b!)`);
              }}
            >
              View Full Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}