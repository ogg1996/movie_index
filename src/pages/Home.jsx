import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "../styles/swiper.css";
import { useFetchTopMovieData } from "../hooks/useFetchTopMovieData";
import { useWindowWidthSize } from "../hooks/useWindowWidthSize";
import { useFetchMovieListData } from "../hooks/useFetchMovieListData";
import MovieCard from "../components/MovieCard";

export default function Home() {
  let ranking = 0;

  const { data: topMovieData, loading: topMovieLoading } =
    useFetchTopMovieData();

  const { data: movieListData, loading: movieListLoading } =
    useFetchMovieListData();

  const windowWidth = useWindowWidthSize();

  return (
    <div className="w-[100%] flex flex-col items-center pt-[56px] pb-[30px]">
      <div className="w-[100%] max-w-[940px] text-[30px] font-bold p-[20px]">
        인기 TOP 20!
      </div>
      {topMovieLoading ? (
        <div className="h-[400px] text-[30px] font-bold flex items-center">
          Loading...
        </div>
      ) : (
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          slidesPerView={windowWidth > 750 ? 3 : windowWidth > 500 ? 2 : 1}
          slidesPerGroup={windowWidth > 750 ? 3 : windowWidth > 500 ? 2 : 1}
          navigation={windowWidth > 500 ? false : true}
        >
          {topMovieData.map((el) => (
            <SwiperSlide key={el.id}>
              <div className="text-[30px] font-bold mr-[10px] leading-[30px]">
                {(ranking += 1)}
              </div>
              <MovieCard id={el.id} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="w-[100%] max-w-[940px] text-[30px] font-bold p-[20px]">
        영화 목록
      </div>
      {movieListLoading ? (
        <div className="h-[400px] text-[30px] font-bold flex items-center">
          Loading...
        </div>
      ) : (
        <div className="max-w-[940px] flex flex-wrap gap-[10px] justify-center">
          {movieListData.map((el) => (
            <MovieCard key={el.id} id={el.id} />
          ))}
        </div>
      )}
    </div>
  );
}
