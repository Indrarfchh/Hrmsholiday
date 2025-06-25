import React from 'react';
import { Clock } from 'lucide-react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, filter, onToggle, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-gray-400 mb-4">
          <Clock size={48} className="mx-auto" />
        </div>
        <h3 className="text-xl font-medium text-gray-600 mb-2">No tasks found</h3>
        <p className="text-gray-500">
          {filter === 'all' 
            ? 'Start by adding your first task!' 
            : `No tasks match the "${filter}" filter.`
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;