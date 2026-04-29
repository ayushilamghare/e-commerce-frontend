import { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import ProductCard from "../components/cards/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/products-count");
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const arr = [...products];
  const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));

  return (
    <div className="page-shell">
      <Jumbotron
        title="Find the pieces worth coming back for"
        subTitle="Fresh arrivals, best sellers, and a more polished shopping flow in one place."
      />
      <div className="container-fluid mt-4">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="section-heading">
              <h2>New Arrivals</h2>
              <span className="muted">Fresh drops</span>
            </div>
            <div className="row g-4">
              {products?.map((p) => (
                <div className="col-sm-6" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="section-heading">
              <h2>Best Sellers</h2>
              <span className="muted">Most loved</span>
            </div>
            <div className="row g-4">
              {sortedBySold?.map((p) => (
                <div className="col-sm-6" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container text-center py-5">
          {products && products.length < total && (
            <button
              className="btn btn-warning btn-lg px-5"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
