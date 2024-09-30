import data from "../assets/data/movieDetailData.json";
import { startUrl } from "../assets/data/urls";

export default function MovieDetail() {
  return (
    <div className="max-w-[940px] pt-[40px] flex">
      <img
        src={`${startUrl}${data.poster_path}`}
        className="
          w-[50%]
        "
      />
      <div
        className="p-[10px] 
        flex flex-col gap-[20px]"
      >
        <div className="flex">
          <div className="grow-[2] text-[30px] font-bold">{data.title}</div>
          <div
            className="grow 
            text-[30px] text-right text-[#777777]"
          >
            {data.vote_average}
          </div>
        </div>
        <div>
          <div className="text-[25px] font-bold mb-[5px]">장르</div>
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
          <div className="text-[25px] font-bold mb-[5px]">줄거리</div>
          <div className="text-justify text-[18px]">{data.overview}</div>
        </div>
      </div>
    </div>
  );
}
