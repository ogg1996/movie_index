import { useEffect, useState } from "react";

export function useFetchMovieIdData(movieId) {
  const { VITE_TMDB_API_BASE_URL, VITE_TMDB_API_KEY } = import.meta.env;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `${VITE_TMDB_API_BASE_URL}/movie/${movieId}?api_key=${VITE_TMDB_API_KEY}&language=ko-KR`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        // skeleton ui 확인을 위해 1초 딜레이를 줌
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => setError(err));
  }, []);

  return { data, loading, error };
}
