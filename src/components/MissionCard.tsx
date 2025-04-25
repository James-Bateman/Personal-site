

import React from 'react';

interface MissionCardProps {
  missionName: string;
  launchDate: string;
  description: string;
}

const MissionCard: React.FC<MissionCardProps> = ({ missionName, launchDate, description }) => {
  return (
    <div className="bg-black bg-opacity-50 text-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2">{missionName}</h2>
      <p className="text-sm text-gray-400 mb-4">{launchDate}</p>
      <p className="text-base">{description}</p>
    </div>
  );
};

export default MissionCard;