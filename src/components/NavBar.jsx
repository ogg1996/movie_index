import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <div
      className="fixed z-[999] w-[100%] max-w-[940px] p-[10px] 
      bg-black text-white text-[24px] font-bold 
      flex justify-between"
    >
      <button onClick={() => navigate("/")}>Home</button>
      <div className="flex gap-[15px]">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/signup")}>SignUp</button>
      </div>
    </div>
  );
}
