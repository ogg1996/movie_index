import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { useWindowWidthSize } from "../hooks/useWindowWidthSize";

// TODO : 반응형 디자인(보완 예정), 다크모드 라이트 모드 구현,
export default function NavBar() {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const debounceInput = useDebounce(searchInput);

  const windowWinth = useWindowWidthSize();

  useEffect(() => {
    // TODO : 검색어를 전부 지울시 마지막으로 있었던 페이지로 이동(검색 페이지 제외)
    if (debounceInput.trim() === "") {
      navigate("/");
    } else {
      navigate(`/search?title=${debounceInput}`);
    }
  }, [debounceInput]);

  return (
    <div
      className="fixed z-[999] w-[100%] p-[10px] 
      bg-black text-white font-bold 
      flex justify-between"
    >
      <div className="flex cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} className="w-[36px]" />
        <div
          className={`text-[24px] ${windowWinth > 750 ? "block" : "hidden"}`}
        >
          MovieIndex
        </div>
      </div>
      <div className="mx-[10px] flex">
        <div className="text-[24px]">🔎</div>
        <input
          type="text"
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
          className={`text-black pl-[10px] text-[16px] ${
            windowWinth > 500
              ? "w-[250px]"
              : windowWinth > 450
              ? "w-[200px]"
              : "w-[160px]"
          }`}
        />
      </div>
      <div
        className={`flex gap-[15px] ${
          windowWinth > 420 ? "text-[24px]" : "text-[18px]"
        }`}
      >
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/join")}>Join</button>
      </div>
    </div>
  );
}
