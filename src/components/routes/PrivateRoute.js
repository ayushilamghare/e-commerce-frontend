import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await axios.get(`/auth-check`);
        if (data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (err) {
        setOk(false);
        if (err?.response?.status === 401) {
          setAuth({ user: null, token: "" });
          localStorage.removeItem("auth");
          navigate("/login", { replace: true, state: "/dashboard/user" });
        }
      }
    };

    if (auth?.token) authCheck();
    else setOk(false);
  }, [auth?.token, navigate, setAuth]);

  // useEffect(() => {
  //   if (auth?.token) {
  //     setOk(true);
  //   } else {
  //     setOk(false);
  //   }
  // }, [auth?.token]);

  return ok ? <Outlet /> : <Loading />;
}
