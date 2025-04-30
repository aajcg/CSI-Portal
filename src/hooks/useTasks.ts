import { useState, useEffect } from "react";
import { Task, User } from "@/types/task";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { 
  getVisibleTasksByRole, 
  getTaskStats, 
  createTask 
} from "@/utils/taskUtils";

// Sample users for demo
export const sampleUsers: User[] = [
  {
    id: uuidv4(),
    name: "Ishit Dandawate",
    role: "head",
    email: "ishit@csi.org",
    position: "Project Lead",
    profileImage: "/lovable-uploads/3705d2e8-16d8-4cc9-a7ca-278f93bf23bb.png"
  },
  {
    id: uuidv4(),
    name: "Anannya Gupta",
    role: "core",
    email: "anannya@csi.org",
    position: "Developer",
  },
  {
    id: uuidv4(),
    name: "Aksh Garg",
    role: "core",
    email: "aksh@csi.org",
    position: "Designer",
  },
  {
    id: uuidv4(),
    name: "Tanmay Bansal",
    role: "core",
    email: "tanmay@csi.org",
    position: "Content Writer",
  },
  {
    id: uuidv4(),
    name: "Abhilove Goyal",
    role: "core",
    email: "abhilove@csi.org",
    position: "Marketing",
  }
];

// Sample initial tasks
const initialTasks: Task[] = [
  {
    id: uuidv4(),
    title: "Complete project proposal",
    description: "Finalize the proposal for the upcoming CSI event",
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "high",
    assignedTo: sampleUsers[1].id,
    assignedBy: sampleUsers[0].id,
    category: "Documentation"
  },
  {
    id: uuidv4(),
    title: "Review code changes",
    description: "Review the PR for the new homepage",
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    assignedTo: sampleUsers[2].id,
    assignedBy: sampleUsers[0].id,
    category: "Development"
  },
  {
    id: uuidv4(),
    title: "Schedule team meeting",
    description: "Coordinate with all team members for weekly sync",
    completed: true,
    createdAt: new Date().toISOString(),
    priority: "low",
    assignedTo: sampleUsers[3].id,
    assignedBy: sampleUsers[0].id,
    category: "Management"
  }
];

export function useTasks(currentUser: User) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast: useToastNotification } = useToast();

  // In a real app, you'd fetch tasks from an API here
  useEffect(() => {
    // This would be replaced with an API call
    console.log("Tasks component mounted, would fetch tasks here");
  }, []);

  const visibleTasks = getVisibleTasksByRole(tasks, currentUser);
  const taskStats = getTaskStats(visibleTasks);

  const handleAddTask = (title: string) => {
    const newTask = createTask(title, currentUser.id);
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const handleCompleteTask = (id: string, completed: boolean) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.filter(task => task.id !== id)
    );
  };

  const handleUpdateTask = (id: string, title: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, title } : task
      )
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAssignTask = (task: Partial<Task>) => {
    const newTask = createTask(
      task.title || "",
      currentUser.id,
      {
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        assignedTo: task.assignedTo,
        category: task.category
      }
    );
    
    setTasks(prevTasks => [newTask, ...prevTasks]);
    
    // Show success toast with both toast libraries for compatibility
    useToastNotification({
      title: "Task assigned",
      description: "Task has been successfully assigned"
    });
    
    toast.success("Task assigned successfully");
  };

  return {
    tasks: visibleTasks,
    taskStats,
    searchQuery,
    handleAddTask,
    handleCompleteTask,
    handleDeleteTask,
    handleUpdateTask,
    handleSearch,
    handleAssignTask
  };
}
