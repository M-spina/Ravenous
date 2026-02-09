import StarRating from './StarRating';
import '../Styles/Business.css';

export default function Business({ business }) {
  return (
    <div className="business-card">
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
        </div>
      </div>
    </div>
  )
}