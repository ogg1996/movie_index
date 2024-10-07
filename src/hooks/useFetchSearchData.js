import { useEffect, useState } from "react";

export function useFetchSearchData(title) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { VITE_TMDB_API_BASE_URL, VITE_TMDB_API_KEY } = import.meta.env;

  useEffect(() => {
    fetch(
      `${VITE_TMDB_API_BASE_URL}/search/movie?api_key=${VITE_TMDB_API_KEY}&query=${title}&language=ko-KR&include_adult=false`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.results);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => setError(err));
  }, [title]);

  return { data, loading, error };
}
