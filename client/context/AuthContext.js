import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { API_BASE_URL } from "../utils/api";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      router.push("/");
    } else {
      alert("Something went wrong!");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    router.push("/login");
  };

  const updateToken = async () => {
    const response = await fetch(`${API_BASE_URL}token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
      }),
    });
    const data = await response.json();

    if (response.status === 201) {
      setAuthTokens(data.tokens);
      setUser(jwt_decode(data.tokens.access));
      localStorage.setItem("authTokens", JSON.stringify(data.tokens));
      router.push("/");
    } else {
      alert("Something went wrong!");
    }
  };

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
    registerUser,
  };

  useEffect(() => {
    setAuthTokens(
      localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null
    );
    setUser(
      localStorage.getItem("authTokens")
        ? jwt_decode(localStorage.getItem("authTokens"))
        : null
    );

    setMounted(true);
  }, []);

  useEffect(() => {
    if (loading && mounted) {
      updateToken();
    }

    let fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading, mounted]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
