import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Search from "./pages/Search";
import supabase from "./scripts/supabaseClient";
import { useEffect, useState } from "react";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // 사용자의 세션 상태를 확인하는 함수
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 로그인 상태가 변경될 때마다 세션 상태를 업데이트
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log(session);
        setSession(session);
      }
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <NavBar session={session} />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/detail/:id"} element={<MovieDetail />} />
          <Route path={"/login"} element={<Login setSession={setSession} />} />
          <Route path={"/join"} element={<Join />} />
          <Route path={"/search"} element={<Search />} />
        </Routes>
      </div>
      <button
        className="text-[20px] font-bold text-white 
        w-[55px] h-[55px] rounded-[50%] bg-black
        fixed z-[999] right-[20px] bottom-[20px]"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        TOP
      </button>
    </>
  );
}

export default App;
