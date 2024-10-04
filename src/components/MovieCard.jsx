import { useNavigate } from "react-router-dom";

export default function MovieCard({ movieData }) {
  const navigate = useNavigate();
  const { VITE_TMDB_API_IMG_BASE_URL } = import.meta.env;
  return (
    <div
      className="w-[200px] h-[400px] rounded-[10px]
        flex flex-col justify-between
        cursor-pointer
        group hover:bg-[#dddddd]"
      onClick={() => navigate(`/detail/${movieData.id}`)}
    >
      <img
        src={`${VITE_TMDB_API_IMG_BASE_URL}${movieData.poster_path}`}
        className="h-[300px] rounded-[10px] group-hover:opacity-50"
      ></img>
      <div className="pl-[10px] self-start font-bold">{movieData.title}</div>
      <div className="pr-[10px] pb-[10px] self-end text-[#777777]">
        👍 {Math.floor(movieData.popularity)} ⭐ {movieData.vote_average}
      </div>
    </div>
  );
}
