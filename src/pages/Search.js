import { useSearch } from "../context/search";
import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";

export default function Search() {
  const [values] = useSearch();

  return (
    <>
      <Jumbotron
        title="Search results"
        subTitle={
          values?.results?.length < 1
            ? "No products found"
            : `Found ${values?.results?.length} products`
        }
      />

      <div className="container mt-4">
        <div className="section-heading">
          <h2>{values?.results?.length || 0} matches</h2>
          <span className="muted">Search results</span>
        </div>
        <div className="row g-4">
          {!values?.results?.length && (
            <div className="col-12">
              <div className="empty-state surface-card">
                Try a different keyword or browse categories from the navbar.
              </div>
            </div>
          )}
          {values?.results?.map((p) => (
            <div key={p._id} className="col-md-6 col-xl-4">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
