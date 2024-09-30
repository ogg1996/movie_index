import MovieCard from "../components/MoviCard";
import data from "../assets/data/movieListData.json";

export default function Home() {
  const movieListData = data.results;
  return (
    <div className="max-w-[940px] p-[40px_0] flex flex-wrap gap-[10px] justify-center">
      {movieListData.map((el) => (
        <MovieCard key={el.id} movieData={el} />
      ))}
    </div>
  );
}
