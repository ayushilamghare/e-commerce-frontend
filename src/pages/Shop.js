import { useState, useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import ProductCard from "../components/cards/ProductCard";
import { Checkbox, Radio } from "antd";
import { prices } from "../prices";

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]); // categories
  const [radio, setRadio] = useState([]); // radio

  useEffect(() => {
    if (!checked.length || !radio.length) loadProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) loadFilteredProducts();
  }, [checked, radio]);

  const loadFilteredProducts = async () => {
    try {
      const { data } = await axios.post("/filtered-products", {
        checked,
        radio,
      });
      console.log("filtered products => ", data);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCatgories();
  }, []);

  const loadCatgories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheck = (value, id) => {
    console.log(value, id);
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  return (
    <>
      <Jumbotron
        title="Shop by mood, price, and category"
        subTitle="Use the filters to narrow the catalog and discover products faster."
      />

      {/* <pre>{JSON.stringify({ checked, radio }, null, 4)}</pre> */}

      <div className="container-fluid page-shell">
        <div className="row g-4">
          <div className="col-lg-3">
            <div className="filter-card">
              <div className="filter-title">Filter by categories</div>
              <div className="d-flex flex-column gap-2">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>

              <hr className="soft-divider my-4" />

              <div className="filter-title">Filter by price</div>
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                <div className="d-flex flex-column gap-2">
                  {prices?.map((p) => (
                    <Radio key={p._id} value={p.array}>
                      {p.name}
                    </Radio>
                  ))}
                </div>
              </Radio.Group>

              <button
                className="btn btn-outline-secondary w-100 mt-4"
                onClick={() => window.location.reload()}
              >
                Reset filters
              </button>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="section-heading">
              <h2>{products?.length} Products</h2>
              <span className="muted">Scroll for more</span>
            </div>
            <div
              className="row g-4"
              style={{ maxHeight: "100vh", overflow: "auto" }}
            >
              {!products?.length && (
                <div className="col-12">
                  <div className="empty-state surface-card">
                    No products matched this filter yet.
                  </div>
                </div>
              )}
              {products?.map((p) => (
                <div className="col-md-6 col-xl-4" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
