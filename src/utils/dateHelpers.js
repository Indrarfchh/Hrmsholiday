export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

// Get date X days from now
export const getDateInDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

// Check if date is today
export const isToday = (dateString) => {
  if (!dateString) return false;
  return dateString === getTodayDate();
};

// Check if date is this week
export const isThisWeek = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  return date >= weekAgo && date <= today;
};

// Get relative time string
export const getRelativeTime = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.abs(now - date) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return isToday(dateString) ? 'Today' : 'Yesterday';
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else if (diffInHours < 168) {
    return `${Math.floor(diffInHours / 24)} days ago`;
  } else {
    return date.toLocaleDateString();
  }
};
