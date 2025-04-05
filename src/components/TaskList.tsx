
import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { Task, User } from "@/types/task";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TaskListProps {
  tasks: Task[];
  users: User[];
  onComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  searchQuery: string;
  currentUser: User;
}

const TaskList = ({ 
  tasks, 
  users,
  onComplete, 
  onDelete, 
  onUpdate,
  searchQuery,
  currentUser
}: TaskListProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  
  // Filter tasks based on active tab and search query
  useEffect(() => {
    let result = [...tasks];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(query) || 
        task.description?.toLowerCase().includes(query) ||
        task.category?.toLowerCase().includes(query)
      );
    }
    
    // Apply tab filter
    if (activeTab === "active") {
      result = result.filter(task => !task.completed);
    } else if (activeTab === "completed") {
      result = result.filter(task => task.completed);
    } else if (activeTab === "high") {
      result = result.filter(task => task.priority === "high" && !task.completed);
    }
    
    setFilteredTasks(result);
  }, [tasks, activeTab, searchQuery]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="animate-fade-in">
      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="mb-6">
        <TabsList className="grid grid-cols-4 w-full sm:w-[400px]">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="high">High Priority</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className={cn(
        "transition-all duration-300",
        filteredTasks.length === 0 ? "opacity-50" : "opacity-100" 
      )}>
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center glass rounded-lg">
            <p className="text-xl font-medium mb-2">No tasks found</p>
            <p className="text-muted-foreground">
              {searchQuery 
                ? "Try a different search term" 
                : activeTab === "completed" 
                  ? "You haven't completed any tasks yet" 
                  : activeTab === "active" 
                    ? "You've completed all your tasks, great job!" 
                    : activeTab === "high"
                      ? "No high priority tasks found"
                      : "Add some tasks to get started"}
            </p>
          </div>
        ) : (
          <div>
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                users={users}
                onComplete={onComplete}
                onDelete={onDelete}
                onUpdate={onUpdate}
                currentUser={currentUser}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
