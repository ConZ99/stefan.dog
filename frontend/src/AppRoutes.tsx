import { Routes, Route } from "react-router-dom";
import ResumeSections from "./pages/ResumeSections";
import RockPaperScissors from "./pages/RockPaperScissors";
import About from "./pages/About";
import LocationSearch from "./pages/LocationSearch";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ResumeSections />} />
      <Route path="/game" element={<RockPaperScissors />} />
      <Route path="/BVGButBetter" element={<LocationSearch />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
