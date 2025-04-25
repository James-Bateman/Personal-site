import React from "react";
import { Link } from "react-router-dom";
import PlanetScene from "../components/PlanetScene";
import PlanetInfo from "../components/PlanetInfo";

const Planets = () => {
  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 flex space-x-4">
        <Link to="/">
          <button className="bg-transparent border border-white text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-black transition duration-300">
            Home
          </button>
        </Link>
        <Link to="/planets">
          <button className="bg-transparent border border-white text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-black transition duration-300">
            3D Planets
          </button>
        </Link>
      </div>
      <PlanetScene />
    </div>
  );
};

export default Planets;
