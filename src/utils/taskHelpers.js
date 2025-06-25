export const getPriorityColor = (priority) => {
  switch(priority) {
    case 'high': return 'text-red-600 bg-red-100';
    case 'medium': return 'text-yellow-600 bg-yellow-100';
    case 'low': return 'text-green-600 bg-green-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

// Check if task is overdue
export const isOverdue = (dueDate, completed) => {
  if (!dueDate || completed) return false;
  return new Date(dueDate) < new Date();
};

// Format date for display
export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};

// Sort tasks by priority
export const sortByPriority = (tasks) => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return [...tasks].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
};

// Sort tasks by due date
export const sortByDueDate = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });
};