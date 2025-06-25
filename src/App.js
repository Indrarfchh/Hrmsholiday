import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import FilterBar from './components/FilterBar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { isOverdue } from './utils/taskHelpers';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Sample data for demonstration
  useEffect(() => {
    const sampleTasks = [
      {
        id: 1,
        title: 'Complete project documentation',
        description: 'Write comprehensive documentation for the new feature',
        completed: false,
        priority: 'high',
        dueDate: '2025-06-30',
        category: 'work',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Buy groceries',
        description: 'Milk, bread, eggs, and vegetables',
        completed: true,
        priority: 'low',
        dueDate: '2025-06-26',
        category: 'personal',
        createdAt: new Date().toISOString()
      }
    ];
    setTasks(sampleTasks);
  }, []);

  // Task management functions
  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([newTask, ...tasks]);
    setShowAddForm(false);
  };

  const updateTask = (taskData) => {
    setTasks(tasks.map(task => 
      task.id === editingTask ? { ...task, ...taskData } : task
    ));
    setEditingTask(null);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEdit = (task) => {
    setEditingTask(task.id);
    setShowAddForm(true);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setShowAddForm(false);
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    switch(filter) {
      case 'completed': return task.completed;
      case 'pending': return !task.completed;
      case 'high': return task.priority === 'high';
      case 'work': return task.category === 'work';
      case 'personal': return task.category === 'personal';
      default: return true;
    }
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => isOverdue(t.dueDate, t.completed)).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Header onAddTask={() => setShowAddForm(true)} />
        <StatsCard stats={stats} />
        <FilterBar filter={filter} onFilterChange={setFilter} />
        
        {showAddForm && (
          <TaskForm
            task={editingTask ? tasks.find(t => t.id === editingTask) : null}
            onSubmit={editingTask ? updateTask : addTask}
            onCancel={cancelEdit}
            isEditing={!!editingTask}
          />
        )}
        
        <TaskList
          tasks={filteredTasks}
          filter={filter}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={startEdit}
        />
      </div>
    </div>
  );
};

export default App;