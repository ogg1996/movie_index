import MovieCard from "../components/MoviCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "../styles/swiper.css";
import { useEffect, useState } from "react";

export default function Home() {
  // 데이터를 담을 상태
  const [movieListData, setMovieListData] = useState([]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/popular?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=ko-KR&page=1`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.results);
        setMovieListData(res.results);
      });
  }, []);

  // 화면의 width를 담을 상태
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 화면의 width가 달라질 때 적용될 이벤트 핸들러
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-[100%] flex flex-col items-center">
      {!movieListData ? (
        <div>Loding...</div>
      ) : (
        <>
          <div className="text-[30px] font-bold p-[20px]">인기 TOP 20!</div>
          <Swiper
            modules={[Navigation]}
            slidesPerView={windowWidth > 840 ? 3 : windowWidth > 600 ? 2 : 1}
            slidesPerGroup={windowWidth > 840 ? 3 : windowWidth > 600 ? 2 : 1}
            navigation
          >
            {movieListData.map((el) => (
              <SwiperSlide key={el.id}>
                <MovieCard movieData={el} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="text-[30px] font-bold p-[20px]">영화 목록</div>
          <div className="max-w-[940px] flex flex-wrap gap-[10px] justify-center">
            {movieListData.map((el) => (
              <MovieCard key={el.id} movieData={el} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
