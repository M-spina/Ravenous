import '../../Styles/Skeleton.css';

export default function BusinessCardSkeleton() {
  return (
    <div className="business-card skeleton-card">
      <div className="business-card-inner">
        <div className="business-card-face business-card-front">
          {/* Image skeleton */}
          <div className="skeleton skeleton-image"></div>
          
          {/* Content skeleton */}
          <div className="business-info">
            {/* Title */}
            <div className="skeleton skeleton-title"></div>
            
            {/* Details section */}
            <div className="business-details">
              <div className="business-left">
                <div className="skeleton skeleton-text skeleton-text-short"></div>
                <div className="skeleton skeleton-text"></div>
              </div>
              <div className="business-right">
                <div className="skeleton skeleton-text skeleton-text-short"></div>
                <div className="skeleton skeleton-text"></div>
              </div>
            </div>
            
            {/* Rating section */}
            <div className="business-rating">
              <div className="skeleton skeleton-rating"></div>
              <div className="skeleton skeleton-text skeleton-text-short"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}