import { useState, useCallback } from 'react';

export const useTaskManager = (initialTasks = []) => {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = useCallback((taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
  }, []);

  const updateTask = useCallback((id, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const getTaskById = useCallback((id) => {
    return tasks.find(task => task.id === id);
  }, [tasks]);

  const getTasksByFilter = useCallback((filter) => {
    switch(filter) {
      case 'completed': return tasks.filter(t => t.completed);
      case 'pending': return tasks.filter(t => !t.completed);
      case 'high': return tasks.filter(t => t.priority === 'high');
      case 'work': return tasks.filter(t => t.category === 'work');
      case 'personal': return tasks.filter(t => t.category === 'personal');
      default: return tasks;
    }
  }, [tasks]);

  const getStats = useCallback(() => {
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      pending: tasks.filter(t => !t.completed).length,
      overdue: tasks.filter(t => {
        if (!t.dueDate || t.completed) return false;
        return new Date(t.dueDate) < new Date();
      }).length
    };
  }, [tasks]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    getTaskById,
    getTasksByFilter,
    getStats
  };
};
