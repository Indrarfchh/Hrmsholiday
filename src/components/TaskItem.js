import React from 'react';
import { Check, Edit2, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { getPriorityColor, isOverdue } from '../utils/taskHelpers';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl ${
        task.completed ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <button
            onClick={() => onToggle(task.id)}
            className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-400'
            }`}
          >
            {task.completed && <Check size={16} />}
          </button>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className={`text-lg font-semibold ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}>
                {task.title}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {task.category}
              </span>
            </div>
            
            {task.description && (
              <p className={`text-gray-600 mb-3 ${task.completed ? 'line-through' : ''}`}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {task.dueDate && (
                <div className={`flex items-center gap-1 ${
                  isOverdue(task.dueDate, task.completed) ? 'text-red-600' : ''
                }`}>
                  {isOverdue(task.dueDate, task.completed) ? (
                    <AlertCircle size={16} />
                  ) : (
                    <Calendar size={16} />
                  )}
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                  {isOverdue(task.dueDate, task.completed) && (
                    <span className="text-red-600 font-medium">(Overdue)</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;