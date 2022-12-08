import { API_BASE_URL } from "../utils/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useFetch = (url, method, body) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { access } = useSelector((state) => state.auth.tokens);

  useEffect(() => {
    const innerFetch = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_BASE_URL + url, {
          method: method || "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
          body: JSON.stringify(body) || null,
        });
        const res = await response.json();
        setData(res);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    innerFetch();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
