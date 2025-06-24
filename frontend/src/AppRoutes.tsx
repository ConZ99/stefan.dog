import { Routes, Route } from "react-router-dom";
import ResumeSections from "./pages/ResumeSections";
import RockPaperScissors from "./pages/RockPaperScissors";
import About from "./pages/About";
import BVGButBetter from "./pages/BVGButBetter";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ResumeSections />} />
      <Route path="/RockPaperScissors" element={<RockPaperScissors />} />
      <Route path="/BVGButBetter" element={<BVGButBetter />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
