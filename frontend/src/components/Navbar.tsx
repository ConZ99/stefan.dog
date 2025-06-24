import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="container">
        <ul className="nav-list">
          <li className="nav-item">
            <button className="nav-button" onClick={() => navigate("/")}>
              Home
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-button" onClick={() => navigate("/RockPaperScissors")}>
              RockPaperScissors
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-button"
              onClick={() => navigate("/BVGButBetter")}
            >
              BVGButBetter
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-button" onClick={() => navigate("/about")}>
              About
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
