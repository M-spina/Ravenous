
export default function Business({ business }) {
  return (
    <div>
      <img src={business.imageSrc} alt={business.name} />
      <h3>{business.name}</h3>
      <p>{business.address}</p>
      <p>{business.zipCode}</p>
      <p>{business.category}</p>
      <p>{business.rating}</p>
      <p>{business.reviewCount}</p>
    </div>
  )
}