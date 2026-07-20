import Business from "./Business.jsx";

export default function BusinessList({ businesses }) {
  return (
    <section className="grid grid-cols-1 gap-6 py-7 sm:grid-cols-2 sm:py-8 xl:grid-cols-3" aria-label="Restaurant results">
      {businesses.map((business) => (
        <Business
          key={business.id}
          business={business}
        />
      ))}
    </section>
  );
}
