import { useNavigate } from "react-router-dom";
import { useFetchMovieIdData } from "../hooks/useFetchMovieIdData";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MovieCard({ id }) {
  const navigate = useNavigate();
  const { VITE_TMDB_API_IMG_BASE_URL } = import.meta.env;

  const { data, loading } = useFetchMovieIdData(id);
  return (
    <>
      {!loading ? (
        <div
          className="w-[200px] h-[400px] rounded-[10px]
          flex flex-col justify-between
          cursor-pointer
          group hover:bg-[#dddddd]"
          onClick={() => navigate(`/detail/${data.id}`)}
        >
          <img
            src={`${VITE_TMDB_API_IMG_BASE_URL}${data.poster_path}`}
            className="h-[300px] rounded-[10px] group-hover:opacity-50"
          />
          <div className="pl-[10px] self-start font-bold">{data.title}</div>
          <div className="pr-[10px] pb-[10px] self-end text-[#777777]">
            👍 {Math.floor(data.popularity)} ⭐ {data.vote_average}
          </div>
        </div>
      ) : (
        <div
          className="w-[200px] h-[400px] rounded-[10px]
          flex flex-col justify-between animate-pulse"
        >
          <Skeleton width={200} height={300} />
          {/* Skeleton 자체에 플렉스 속성이 사용되지 않아서 스판에 추가.. */}
          <span className="self-start">
            <Skeleton width={150} height={24} />
          </span>
          <span className="self-end">
            <Skeleton width={150} height={24} />
          </span>
        </div>
      )}
    </>
  );
}
