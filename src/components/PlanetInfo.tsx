import React from "react";

interface PlanetInfoProps {
  name: string;
  description: string;
  diameter: string;
  distanceFromSun: string;
}

const PlanetInfo: React.FC<PlanetInfoProps> = ({
  name,
  description,
  diameter,
  distanceFromSun,
}) => {
  return (
    <div className="bg-black bg-opacity-80 text-white p-4 rounded-md shadow-lg w-64">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-sm mb-2">{description}</p>
      <p className="text-sm">
        <strong>Diameter:</strong> {diameter}
      </p>
      <p className="text-sm">
        <strong>Distance from Sun:</strong> {distanceFromSun}
      </p>
    </div>
  );
};

export default PlanetInfo;