import MovieCard from "../components/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "../styles/swiper.css";
import { useEffect, useRef, useState } from "react";
import MovieCardSkeleton from "../components/MovieCardSkeleton";

export default function Home() {
  // 인기 영화 Top20을 담을 상태
  const [topMovieListData, setTopMovieListData] = useState([]);
  const [loadingTopMovie, setLoadingTopMovie] = useState(true);

  // 영화 목록를 담을 상태
  const [movieListData, setMovieListData] = useState([]);

  const { VITE_TMDB_API_BASE_URL, VITE_TMDB_API_KEY } = import.meta.env;

  // 초기에 로드할 데이터
  useEffect(() => {
    fetch(
      `${VITE_TMDB_API_BASE_URL}/movie/popular?api_key=${VITE_TMDB_API_KEY}&language=ko-KR&page=1`
    )
      .then((res) => res.json())
      .then((res) => {
        setTopMovieListData(res.results);
        setMovieListData(res.results);
      })
      .then(
        setTimeout(() => {
          setLoadingTopMovie(false);
        }, 1000)
      );
  }, []);

  // 화면의 width를 담을 상태
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 무한스크롤 다음에 받을 정보 page
  const page = useRef(1);

  // 이벤트 관련 useEffect
  useEffect(() => {
    window.addEventListener("scroll", handleEndScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleEndScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleEndScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight)
      loadMoreContent();
  }

  function loadMoreContent() {
    fetch(
      `${VITE_TMDB_API_BASE_URL}/movie/popular?api_key=${VITE_TMDB_API_KEY}&language=ko-KR&page=${(page.current += 1)}`
    )
      .then((res) => res.json())
      .then((res) => {
        setMovieListData((prev) => [...prev, ...res.results]);
      });
  }

  let ranking = 0;

  // 화면의 width가 달라질 때 적용될 이벤트 핸들러
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  return (
    <div className="w-[100%] flex flex-col items-center pt-[56px] pb-[30px]">
      <div className="w-[100%] max-w-[940px] text-[30px] font-bold p-[20px]">
        인기 TOP 20!
      </div>
      {!topMovieListData ? (
        <div>Loading</div>
      ) : loadingTopMovie ? (
        <div className="w-[100%] max-w-[940px] flex justify-around">
          {windowWidth > 840 ? (
            <>
              <MovieCardSkeleton />
              <MovieCardSkeleton />
              <MovieCardSkeleton />
            </>
          ) : windowWidth > 600 ? (
            <>
              <MovieCardSkeleton />
              <MovieCardSkeleton />
            </>
          ) : (
            <>
              <MovieCardSkeleton />
            </>
          )}
        </div>
      ) : (
        <Swiper
          modules={[Navigation]}
          slidesPerView={windowWidth > 840 ? 3 : windowWidth > 600 ? 2 : 1}
          slidesPerGroup={windowWidth > 840 ? 3 : windowWidth > 600 ? 2 : 1}
          navigation
        >
          {topMovieListData.map((el) => (
            <SwiperSlide key={el.id}>
              <div className="text-[30px] font-bold mr-[10px] leading-[30px]">
                {(ranking += 1)}
              </div>
              <MovieCard movieData={el} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="w-[100%] max-w-[940px] text-[30px] font-bold p-[20px]">
        영화 목록
      </div>
      {!movieListData ? (
        <div>Loading</div>
      ) : (
        <div className="max-w-[940px] flex flex-wrap gap-[10px] justify-center">
          {movieListData.map((el) => (
            <MovieCard key={el.id} movieData={el} />
          ))}
        </div>
      )}
    </div>
  );
}
