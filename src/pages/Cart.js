import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import Jumbotron from "../components/cards/Jumbotron";
import { useNavigate } from "react-router-dom";
import UserCartSidebar from "../components/cards/UserCartSidebar";
import ProductCardHorizontal from "../components/cards/ProductCardHorizontal";
export default function Cart() {
  // context
  const [cart] = useCart();
  const [auth] = useAuth();
  // hooks
  const navigate = useNavigate();

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.token && auth?.user?.name}`}
        subTitle={
          cart?.length
            ? `You have ${cart.length} items in the cart. ${
                auth?.token ? "" : "Please login to checkout"
              }`
          : "Your cart is empty"
        }
      />

      <div className="container-fluid page-shell">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading justify-content-center">
              {cart?.length ? (
                <h2>My Cart</h2>
              ) : (
                <div className="empty-state w-100">
                  <button
                    className="btn btn-info"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {cart?.length && (
        <div className="container-fluid">
          <div className="row g-4 cart-layout">
            <div className="col-lg-8">
              <div className="row g-4">
                {cart?.map((p, index) => (
                  <div className="col-12" key={index}>
                    <ProductCardHorizontal p={p} />
                  </div>
                ))}
              </div>
            </div>

            <UserCartSidebar />
          </div>
        </div>
      )}
    </>
  );
}
