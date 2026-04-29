import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminRoute() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminCheck = async () => {
      try {
        const { data } = await axios.get(`/admin-check`);
        if (data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (err) {
        setOk(false);
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          setAuth({ user: null, token: "" });
          localStorage.removeItem("auth");
          navigate("/login", { replace: true, state: "/dashboard/admin" });
        }
      }
    };

    if (auth?.token) adminCheck();
    else setOk(false);
  }, [auth?.token, navigate, setAuth]);

  return ok ? <Outlet /> : <Loading path="" />;
}
