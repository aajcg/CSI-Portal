
import { Task, User, Priority } from "@/types/task";
import { v4 as uuidv4 } from "uuid";

// Filter tasks based on user role
export const getVisibleTasksByRole = (tasks: Task[], currentUser: User) => {
  if (currentUser.role === "head" || currentUser.role === "president") {
    // Heads and presidents can see all tasks
    return tasks;
  } else if (currentUser.role === "core") {
    // Core team members can only see tasks assigned to them or created by them
    return tasks.filter(task => 
      task.assignedTo === currentUser.id || 
      task.assignedBy === currentUser.id
    );
  }
  // General members only see tasks assigned to them
  return tasks.filter(task => task.assignedTo === currentUser.id);
};

// Get task statistics
export const getTaskStats = (tasks: Task[]) => {
  const completed = tasks.filter(task => task.completed).length;
  const pending = tasks.filter(task => !task.completed).length;
  const highPriority = tasks.filter(task => task.priority === "high" && !task.completed).length;
  
  return {
    total: tasks.length,
    completed,
    pending,
    highPriority
  };
};

// Create a new task
export const createTask = (
  title: string,
  assignedBy: string,
  options?: {
    description?: string;
    dueDate?: string;
    priority?: Priority;
    assignedTo?: string;
    category?: string;
  }
): Task => {
  return {
    id: uuidv4(),
    title,
    description: options?.description,
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: options?.dueDate,
    priority: options?.priority,
    assignedTo: options?.assignedTo,
    assignedBy,
    category: options?.category
  };
};

// Filter tasks based on search query
export const filterTasksBySearch = (tasks: Task[], query: string) => {
  if (!query) return tasks;
  
  const lowercaseQuery = query.toLowerCase();
  return tasks.filter(task => 
    task.title.toLowerCase().includes(lowercaseQuery) || 
    task.description?.toLowerCase().includes(lowercaseQuery) ||
    task.category?.toLowerCase().includes(lowercaseQuery)
  );
};

// Filter tasks based on tab
export const filterTasksByTab = (tasks: Task[], activeTab: string) => {
  switch (activeTab) {
    case "active":
      return tasks.filter(task => !task.completed);
    case "completed":
      return tasks.filter(task => task.completed);
    case "high":
      return tasks.filter(task => task.priority === "high" && !task.completed);
    default:
      return tasks;
  }
};
