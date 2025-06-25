import React from 'react';

const StatsCard = ({ stats }) => {
  const statItems = [
    { label: 'Total Tasks', value: stats.total, color: 'text-blue-600' },
    { label: 'Completed', value: stats.completed, color: 'text-green-600' },
    { label: 'Pending', value: stats.pending, color: 'text-orange-600' },
    { label: 'Overdue', value: stats.overdue, color: 'text-red-600' }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {statItems.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-md">
          <div className={`text-2xl font-bold ${stat.color}`}>
            {stat.value}
          </div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;