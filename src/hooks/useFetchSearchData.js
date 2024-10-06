import { useEffect, useState } from "react";

export function useFetchSearchData(param) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { VITE_TMDB_API_BASE_URL, VITE_TMDB_API_KEY } = import.meta.env;

  useEffect(() => {
    fetch(
      `${VITE_TMDB_API_BASE_URL}/search/movie?api_key=${VITE_TMDB_API_KEY}&query=${param.title}&language=ko-KR&include_adult=false`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.results);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, [param]);

  return { data, loading, error };
}
