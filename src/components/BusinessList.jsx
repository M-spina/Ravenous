import Business from "./Business.jsx";
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
