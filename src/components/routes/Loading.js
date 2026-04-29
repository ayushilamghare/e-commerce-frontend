import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingGIF from "../../images/loading.gif";

export default function Loading({ path = "register" }) {
  // state
  const [count, setCount] = useState(3);
  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => Math.max(currentCount - 1, 0));
    }, 1000);

    if (count === 0) {
      navigate(`/${path}`, {
        state: location.pathname,
        replace: true,
      });
    }

    return () => clearInterval(interval);
  }, [count, location.pathname, navigate, path]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <img src={LoadingGIF} alt="Loading" style={{ width: "400px" }} />
    </div>
  );
}
