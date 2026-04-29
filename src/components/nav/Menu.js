import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

export default function Menu() {
  // context
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  // hooks
  const categories = useCategory();
  const navigate = useNavigate();

  // console.log("categories in menu => ", categories);

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top site-navbar shadow-sm">
      <div className="container-fluid px-3 px-lg-4 gap-3">
        <NavLink className="navbar-brand site-brand fw-bold" to="/">
          SHOP WAVE
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-1">
            <li className="nav-item">
              <NavLink className="nav-link site-nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link site-nav-link" aria-current="page" to="/shop">
                Shop
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link site-nav-link dropdown-toggle"
                href="#categories"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={(e) => e.preventDefault()}
              >
                Categories
              </a>

              <ul
                className="dropdown-menu"
                style={{ maxHeight: "320px", overflowY: "auto" }}
              >
                <li>
                  <NavLink className="nav-link" to="/categories">
                    All Categories
                  </NavLink>
                </li>

                {categories?.map((c) => (
                  <li key={c._id}>
                    <NavLink className="nav-link" to={`/category/${c.slug}`}>
                      {c.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item">
              <Badge
                count={cart?.length >= 1 ? cart.length : 0}
                offset={[-4, 8]}
                showZero={true}
              >
                <NavLink className="nav-link site-nav-link" aria-current="page" to="/cart">
                  Cart
                </NavLink>
              </Badge>
            </li>
          </ul>

          <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-2">
            <Search />

            {!auth?.user ? (
              <div className="d-flex gap-2">
                <NavLink className="btn btn-outline-light" to="/login">
                  Login
                </NavLink>
                <NavLink className="btn btn-primary" to="/register">
                  Register
                </NavLink>
              </div>
            ) : (
              <div className="dropdown">
                <a
                  className="btn btn-outline-light dropdown-toggle"
                  href="#account"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={(e) => e.preventDefault()}
                >
                  {auth?.user?.name?.toUpperCase()}
                </a>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <NavLink
                      className="nav-link"
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </NavLink>
                  </li>

                  <li className="nav-item pointer">
                    <button
                      type="button"
                      onClick={logout}
                      className="nav-link btn btn-link border-0 p-0 text-start w-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
