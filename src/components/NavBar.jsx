import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useEffect, useState } from "react";

export default function NavBar() {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const debounceInput = useDebounce(searchInput);

  useEffect(() => {
    if (debounceInput.trim() === "") {
      navigate("/");
    } else {
      navigate(`/search/${debounceInput}`);
    }
  }, [debounceInput]);

  return (
    <div
      className="fixed z-[999] w-[100%] max-w-[940px] p-[10px] 
      bg-black text-white text-[24px] font-bold 
      flex justify-between"
    >
      <button onClick={() => navigate("/")}>Home</button>
      <div className="mx-[10px]">
        🔎{" "}
        <input
          type="text"
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
          className="text-black pl-[10px]"
        />
      </div>
      <div className="flex gap-[15px]">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/signup")}>SignUp</button>
      </div>
    </div>
  );
}
