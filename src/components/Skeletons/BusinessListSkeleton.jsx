import BusinessCardSkeleton from './BusinessCardSkeleton';

export default function BusinessListSkeleton({ count = 6 }) {
  return (
    <section className="grid grid-cols-1 gap-6 py-7 sm:grid-cols-2 sm:py-8 xl:grid-cols-3" aria-label="Loading restaurant results" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <BusinessCardSkeleton key={index} />
      ))}
    </section>
  );
}
