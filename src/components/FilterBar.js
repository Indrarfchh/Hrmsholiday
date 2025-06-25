import React from 'react';
import { Filter } from 'lucide-react';

const FilterBar = ({ filter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All Tasks' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
    { key: 'high', label: 'High Priority' },
    { key: 'work', label: 'Work' },
    { key: 'personal', label: 'Personal' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Filter size={20} className="text-gray-600" />
        <span className="font-medium text-gray-700">Filter Tasks</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filter === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;