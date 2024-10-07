import { useSearchParams } from "react-router-dom";
import { useFetchSearchData } from "../hooks/useFetchSearchData";
import MovieCard from "../components/MovieCard";
import loading from "../assets/loading.png";

export default function Search() {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("title"));
  const { data: searchData, loading: searchLoading } = useFetchSearchData(
    searchParams.get("title")
  );

  return (
    <div className="max-w-[940px] flex flex-wrap gap-[10px] justify-center pt-[60px]">
      {searchLoading ? (
        <div className="h-[400px] flex items-center">
          <img src={loading} className="animate-spin w-[100px] h-[100px]" />
        </div>
      ) : searchData.length !== 0 ? (
        searchData.map((el) => <MovieCard key={el.id} id={el.id} />)
      ) : (
        <div className="mt-[100px] text-[25px] font-bold">
          검색 결과가 없습니다!
        </div>
      )}
    </div>
  );
}
