import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Search from "./pages/Search";
import smoothscroll from "smoothscroll-polyfill";

function App() {
  return (
    <>
      <div className="flex justify-center">
        <NavBar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/detail/:id"} element={<MovieDetail />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/join"} element={<Join />} />
          <Route path={"/search"} element={<Search />} />
        </Routes>
      </div>
      <button
        className="text-[20px] font-bold text-white 
        w-[55px] h-[55px] rounded-[50%] bg-black
        fixed z-[999] right-[20px] bottom-[20px]"
        onClick={() => {
          smoothscroll.polyfill();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        TOP
      </button>
    </>
  );
}

export default App;
