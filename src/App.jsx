import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <div className="w-[100%] flex justify-center">
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/detail"} element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
