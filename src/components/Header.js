import React from 'react';
import { Plus } from 'lucide-react';

const Header = ({ onAddTask }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Task Tracker</h1>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </div>
        <button
          onClick={onAddTask}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Header;