import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
import ResumeSections from "./pages/ResumeSections";
import RockPaperScissors from "./pages/RockPaperScissors";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Navbar from "./components/Navbar";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ResumeSections />} />
      <Route path="/game" element={<RockPaperScissors />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
