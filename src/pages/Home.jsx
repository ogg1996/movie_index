import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "../styles/swiper.css";
import { lazy, Suspense } from "react";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import { useFetchTopMovieData } from "../hooks/useFetchTopMovieData";
import { useWindowWidthSize } from "../hooks/useWindowWidthSize";
import { useFetchMovieListData } from "../hooks/useFetchMovieListData";

const MovieCard = lazy(() => import("../components/MovieCard"));

export default function Home() {
  // top20 영화 랭킹 표기 변수
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
        <div>Loading</div>
      ) : (
        <Swiper
          modules={[Navigation]}
          slidesPerView={windowWidth > 840 ? 3 : windowWidth > 600 ? 2 : 1}
          slidesPerGroup={windowWidth > 840 ? 3 : windowWidth > 600 ? 2 : 1}
          navigation
        >
          {topMovieData.map((el) => (
            <SwiperSlide key={el.id}>
              <div className="text-[30px] font-bold mr-[10px] leading-[30px]">
                {(ranking += 1)}
              </div>
              <Suspense fallback={<MovieCardSkeleton />}>
                <MovieCard movieData={el} />
              </Suspense>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="w-[100%] max-w-[940px] text-[30px] font-bold p-[20px]">
        영화 목록
      </div>
      {movieListLoading ? (
        <div>Loading</div>
      ) : (
        <div className="max-w-[940px] flex flex-wrap gap-[10px] justify-center">
          {movieListData.map((el) => (
            <Suspense key={el.id} fallback={<MovieCardSkeleton />}>
              <MovieCard movieData={el} />
            </Suspense>
          ))}
        </div>
      )}
    </div>
  );
}
