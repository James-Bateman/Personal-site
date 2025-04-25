import { Link } from "react-router-dom";
import PlanetScene from "../components/PlanetScene";

const Planets = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 flex gap-4">
        <Link to="/">
          <button className="btn-primary text-white">
            Home
          </button>
        </Link>
        <Link to="/planets">
          <button className="btn-primary text-white">
            3D Planets
          </button>
        </Link>
        <Link to="/timeline">
          <button className="btn-primary text-white">
            Space Timeline
          </button>
        </Link>
      </div>
      <PlanetScene />
    </div>
  );
};

export default Planets;
