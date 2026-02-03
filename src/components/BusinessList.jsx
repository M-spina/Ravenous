import Business from "./business";

export default function BusinessList({ businesses }) {
  return (
    <div>
      {businesses.map((business) => (
        <Business
          key={business.id}
          business={business}
        />
      ))}
    </div>
  );
}