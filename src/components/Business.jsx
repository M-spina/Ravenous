import '../Styles/Business.css';

export default function Business({ business }) {
  return (
    <div className="business-card">
      <img src={business.imageSrc} alt={business.name} className="business-image" />
      <div className="business-info">
        <h3>{business.name}</h3>
        <div className="business-left">
          <p>Address:</p>
          <p>{business.address}</p>
          <p>{business.zipCode}</p>
        </div>
        <div className="business-right">
          <p>Category:</p>
          <p>{business.category}</p>
          <p>Rating: {business.rating}⭐</p>
          <p>{business.reviewCount} reviews</p>
        </div>
      </div>
    </div>
  )
}