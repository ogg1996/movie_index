import { startUrl } from "../assets/data/urls";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movieData }) {
  const navigate = useNavigate();
  return (
    <div
      className="w-[200px] h-[400px]
      flex flex-col justify-between
      cursor-pointer
      hover:bg-[#dddddd]"
      onClick={() => navigate("/detail")}
    >
      <img
        src={`${startUrl}${movieData.poster_path}`}
        className="h-[300px] hover:opacity-50"
      ></img>
      <div className="self-start font-bold">{movieData.title}</div>
      <div className="self-end text-[#777777]">{movieData.vote_average}</div>
    </div>
  );
}
