import Business from "./Business.jsx";
import GoogleMapsAttribution from "./GoogleMapsAttribution.jsx";

export default function BusinessList({ businesses }) {
  return (
    <section aria-label="Restaurant results" className="mt-5 rounded-xl border border-border bg-card p-3 sm:p-4">
      <GoogleMapsAttribution />
      <div className="grid grid-cols-1 gap-6 py-5 sm:grid-cols-2 xl:grid-cols-3">
      {businesses.map((business) => (
        <Business
          key={business.id}
          business={business}
        />
      ))}
      </div>
    </section>
  );
}
