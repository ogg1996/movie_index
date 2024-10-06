import { useEffect, useRef, useState } from "react";

export function useFetchMovieListData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { VITE_TMDB_API_BASE_URL, VITE_TMDB_API_KEY } = import.meta.env;

  // 무한스크롤 다음에 받을 정보 page
  const page = useRef(0);

  // 처음에 스크롤이 없으므로 수동으로 한번 로드..
  if (page.current === 0) {
    loadMoreContent();
  }

  function handleEndScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadMoreContent();
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleEndScroll);
    return () => {
      window.removeEventListener("scroll", handleEndScroll);
    };
  }, []);

  function loadMoreContent() {
    fetch(
      `${VITE_TMDB_API_BASE_URL}/movie/popular?api_key=${VITE_TMDB_API_KEY}&language=ko-KR&include_adult=true&page=${(page.current += 1)}`
    )
      .then((res) => res.json())
      .then((res) => {
        setData((prev) => [...prev, ...res.results]);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }

  return { data, loading, error };
}
