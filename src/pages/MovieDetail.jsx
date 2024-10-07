import { useParams } from "react-router-dom";
import { useFetchMovieIdData } from "../hooks/useFetchMovieIdData";
import { useWindowWidthSize } from "../hooks/useWindowWidthSize";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MovieDetail() {
  const param = useParams();

  const { data, loading } = useFetchMovieIdData(param.id);
  const windowWidth = useWindowWidthSize();

  const { VITE_TMDB_API_IMG_BASE_URL } = import.meta.env;

  return (
    <div
      className={`w-[100%] max-w-[940px] ${
        !loading ? "animate-none" : "animate-pulse"
      }`}
    >
      <div className="flex flex-col gap-[30px] m-[70px_20px]">
        {!loading ? (
          <>
            <img
              src={`${VITE_TMDB_API_IMG_BASE_URL}${data.poster_path}`}
              className="self-center w-[100%] max-w-[400px] rounded-[20px]"
            />
            <div
              className={`flex ${
                windowWidth > 700
                  ? "justify-between items-center"
                  : "flex-col gap-[10px]"
              }`}
            >
              <div className="text-[25px] font-bold">{data.title}</div>
              <div className="text-[20px] text-[#777777] self-end">
                👍 {Math.floor(data.popularity)} ⭐{data.vote_average}
              </div>
            </div>
            <div>
              <div className="text-[25px] font-bold mb-[10px]">장르</div>
              <div className="flex flex-wrap gap-[10px]">
                {data.genres.map((el) => (
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
              <div className="text-[25px] font-bold mb-[10px]">줄거리</div>
              <div className="text-justify text-[18px]">{data.overview}</div>
            </div>
          </>
        ) : (
          <>
            <div className="self-center w-[100%] max-w-[400px]">
              <Skeleton height={500} borderRadius={20} />
            </div>
            <div
              className={`flex ${
                windowWidth > 700
                  ? "justify-between items-center"
                  : "flex-col gap-[10px]"
              }`}
            >
              <Skeleton width={200} height={35} />
              <div className="self-end">
                <Skeleton width={100} height={30} />
              </div>
            </div>
            <Skeleton width={100} height={35} className="mb-[10px]" />
            <div className="flex gap-[10px]">
              <Skeleton width={50} height={30} />
              <Skeleton width={50} height={30} />
              <Skeleton width={50} height={30} />
            </div>
            <Skeleton width={100} height={35} className="mb-[10px]" />
            <Skeleton width="100%" height={23} count={3} />
          </>
        )}
      </div>
    </div>
  );
}
