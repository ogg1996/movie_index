import { useEffect, useState } from "react";

export function useFetchTopMovieData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { VITE_TMDB_API_BASE_URL, VITE_TMDB_API_KEY } = import.meta.env;

  useEffect(() => {
    fetch(
      `${VITE_TMDB_API_BASE_URL}/movie/popular?api_key=${VITE_TMDB_API_KEY}&language=ko-KR&include_adult=false&page=1`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.results);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, []);

  return { data, loading, error };
}
