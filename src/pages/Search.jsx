import { useSearchParams } from "react-router-dom";
import { useFetchSearchData } from "../hooks/useFetchSearchData";
import MovieCard from "../components/MovieCard";

export default function Search() {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("title"));
  const { data: searchData, loading: searchLoading } = useFetchSearchData(
    searchParams.get("title")
  );

  return (
    <div className="max-w-[940px] flex flex-wrap gap-[10px] justify-center pt-[60px]">
      {searchLoading ? (
        <div>로딩중...</div>
      ) : (
        searchData.map((el) => <MovieCard key={el.id} id={el.id} />)
      )}
    </div>
  );
}
