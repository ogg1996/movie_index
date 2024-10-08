import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { useWindowWidthSize } from "../hooks/useWindowWidthSize";
import supabase from "../scripts/supabaseClient";
import userIcon from "../assets/userIcon.png";

// TODO : 반응형 디자인(보완 예정), 다크모드 라이트 모드 구현(전역 상태 관리)
export default function NavBar() {
  const navigate = useNavigate();

  // TODO : 디테일 페이지로 넘어갈 때 입력창을 초기화 하려면 전역 상태 관리를 해야할까?
  const [searchInput, setSearchInput] = useState("");
  const debounceInput = useDebounce(searchInput);

  const [userInfo, setUserInfo] = useState(null);

  const windowWinth = useWindowWidthSize();

  const [isClickSearch, setIsClickSearch] = useState(false);
  const [isClickUserIcon, setIsClickUserIcon] = useState(false);

  useEffect(() => {
    if (debounceInput.trim() === "") {
      navigate("/");
    } else {
      navigate(`/search?title=${debounceInput}`);
    }
  }, [debounceInput]);

  useEffect(() => {
    supabase.auth.getSession().then((res) => {
      setUserInfo(res.data.session);
    });
  }, [supabase.auth.getSession()]);

  const logout = async () => {
    await supabase.auth.signOut();
    setUserInfo(null);
    setIsClickUserIcon(false);
    alert("로그아웃 되었습니다");
  };

  return (
    <div
      className="fixed z-[999] w-[100%] p-[10px] 
      bg-black text-white font-bold 
      flex justify-between"
    >
      <div
        className="flex cursor-pointer"
        onClick={() => {
          setSearchInput("");
          navigate("/");
        }}
      >
        <img src={logo} className="w-[36px]" />
        <div
          className={`text-[24px] ${windowWinth > 750 ? "block" : "hidden"}`}
        >
          MovieIndex
        </div>
      </div>
      <div className="flex">
        <div className="mx-[10px] flex">
          <input
            type="text"
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
            value={searchInput}
            className={`${
              isClickSearch ? "block" : "hidden"
            } text-black pl-[10px] text-[16px] ${
              windowWinth > 500
                ? "w-[250px]"
                : windowWinth > 450
                ? "w-[200px]"
                : "w-[160px]"
            }`}
          />
          <div
            className="text-[24px] cursor-pointer"
            onClick={() => {
              setIsClickSearch(!isClickSearch);
            }}
          >
            🔎
          </div>
        </div>
        {userInfo ? (
          <div>
            <img
              src={userIcon}
              className="w-[36px] cursor-pointer"
              onClick={() => setIsClickUserIcon(!isClickUserIcon)}
            />
            {isClickUserIcon && (
              <button
                className="w-[150px] text-[20px] py-[5px] border-t-white fixed top-[58px] right-0 bg-[gray]"
                onClick={() => logout()}
              >
                로그아웃
              </button>
            )}
          </div>
        ) : (
          <div
            className={`${isClickSearch ? "hidden" : "flex"} gap-[15px] ${
              windowWinth > 420 ? "text-[24px]" : "text-[18px]"
            }`}
          >
            <button
              onClick={() => {
                setSearchInput("");
                navigate("/login");
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                setSearchInput("");
                navigate("/join");
              }}
            >
              Join
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
