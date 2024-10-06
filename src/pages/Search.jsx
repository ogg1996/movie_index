import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useFetchSearchData } from "../hooks/useFetchSearchData";

const MovieCard = lazy(() => import("../components/MovieCard"));

export default function Search() {
  const param = useParams();
  const { data: searchData, loading: searchLoading } =
    useFetchSearchData(param);

  return (
    <div className="max-w-[940px] flex flex-wrap gap-[10px] justify-center pt-[60px]">
      {searchLoading ? (
        <div>로딩중...</div>
      ) : (
        searchData.map((el) => (
          <Suspense key={el.id}>
            <MovieCard movieData={el} />
          </Suspense>
        ))
      )}
    </div>
  );
}
