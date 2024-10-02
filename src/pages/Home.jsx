import MovieCard from "../components/MoviCard";
import data from "../assets/data/movieListData.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "../styles/swiper.css";
import { useEffect, useState } from "react";

export default function Home() {
  // 데이터를 담을 상태
  const [movieListData] = useState(data.results);

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
    <>
      {!movieListData ? (
        <div>Loding...</div>
      ) : (
        <>
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
          <div className="max-w-[940px] p-[40px_0] flex flex-wrap gap-[10px] justify-center">
            {movieListData.map((el) => (
              <MovieCard key={el.id} movieData={el} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
