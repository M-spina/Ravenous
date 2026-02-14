import BusinessCardSkeleton from './BusinessCardSkeleton';
import '../../Styles/BusinessList.css';

export default function BusinessListSkeleton({ count = 6 }) {
  return (
    <div className="business-list">
      {Array.from({ length: count }).map((_, index) => (
        <BusinessCardSkeleton key={index} />
      ))}
    </div>
  );
}