import MovieCard from "../components/MoviCard";
import data from "../assets/data/movieListData.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "../styles/swiper.css";
import { useEffect, useState } from "react";

export default function Home() {
  const movieListData = data.results;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
    <>
      <Swiper
        // Swiper 모듈 등록
        modules={[Navigation]}
        spaceBetween={0} // 슬라이드 사이 여백
        slidesPerView={windowWidth > 840 ? 3 : windowWidth > 600 ? 2 : 1} // 한 번에 보여줄 슬라이드 수
        slidesPerGroup={windowWidth > 840 ? 3 : windowWidth > 600 ? 2 : 1}
        navigation // 네비게이션(화살표) 사용
        loop={true}
      >
        {movieListData.map((el) => (
          <SwiperSlide key={el.id}>
            <MovieCard movieData={el} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="max-w-[940px] p-[40px_0] flex flex-wrap gap-[10px] justify-center">
        {movieListData.map((el) => (
          <MovieCard key={el.id} movieData={el} />
        ))}
      </div>
    </>
  );
}
