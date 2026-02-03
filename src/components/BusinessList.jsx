import Business from "./business";
import '../Styles/BusinessList.css';

export default function BusinessList({ businesses }) {
  return (
    <div className="business-list">
      {businesses.map((business) => (
        <Business
          key={business.id}
          business={business}
        />
      ))}
    </div>
  );
}