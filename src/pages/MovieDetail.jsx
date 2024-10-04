import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetail() {
  // 데이터를 담을 상태
  const [movieDetailData, setMovieDetailData] = useState();
  const param = useParams();
  const movieId = param.id;

  const { VITE_TMDB_API_BASE_URL, VITE_TMDB_API_KEY } = import.meta.env;

  useEffect(() => {
    fetch(
      `${VITE_TMDB_API_BASE_URL}/movie/${movieId}?api_key=${VITE_TMDB_API_KEY}&language=ko-KR`
    )
      .then((res) => res.json())
      .then((res) => {
        setMovieDetailData(res);
      });
  }, []);

  return (
    <div className="w-[100%] flex flex-col items-center pt-[56px]">
      {!movieDetailData ? (
        <div className="text-[50px] font-bold">Loading...</div>
      ) : (
        <div className="max-w-[940px] pt-[40px] flex">
          <img
            src={`${import.meta.env.VITE_TMDB_API_IMG_BASE_URL}${
              movieDetailData.poster_path
            }`}
            className="w-[400px]"
          />
          <div className="p-[10px] flex flex-col gap-[20px]">
            <div className="flex items-center">
              <div className="grow-[2] text-[30px] font-bold">
                {movieDetailData.title}
              </div>
              <div className="grow text-[20px] text-right text-[#777777]">
                👍 {Math.floor(movieDetailData.popularity)} ⭐
                {movieDetailData.vote_average}
              </div>
            </div>
            <div>
              <div className="text-[25px] font-bold mb-[5px]">장르</div>
              <div className="flex flex-wrap gap-[10px]">
                {movieDetailData.genres.map((el) => (
                  <span
                    key={el.id}
                    className="before:content-['#'] text-[#777777] text-[20px]"
                  >
                    {el.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[25px] font-bold mb-[5px]">줄거리</div>
              <div className="text-justify text-[18px]">
                {movieDetailData.overview}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
