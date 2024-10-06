import { useEffect, useState } from "react";

export function useFetchMovieDetailData(movieId) {
  const { VITE_TMDB_API_BASE_URL, VITE_TMDB_API_KEY } = import.meta.env;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `${VITE_TMDB_API_BASE_URL}/movie/${movieId}?api_key=${VITE_TMDB_API_KEY}&language=ko-KR&include_adult=false`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, []);

  return { data, loading, error };
}
