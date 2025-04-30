
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TaskHeaderProps {
  onAddTask: (title: string) => void;
  onSearch: (query: string) => void;
  isHeadRole?: boolean;
}

const TaskHeader = ({ onAddTask, onSearch, isHeadRole = false }: TaskHeaderProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const handleAddTask = () => {
    if (!isAdding) {
      setIsAdding(true);
      return;
    }
    
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle.trim());
      setNewTaskTitle("");
      setIsAdding(false);
      toast({
        title: "Task added",
        description: "Your new task has been created"
      });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTaskTitle.trim()) {
      handleAddTask();
    } else if (e.key === "Escape") {
      setNewTaskTitle("");
      setIsAdding(false);
    }
  };

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium tracking-tight text-brand-deep-blue">
          {isHeadRole ? "All Tasks" : "My Tasks"}
        </h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-9 w-[240px] transition-all focus:w-[280px]"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          {(isHeadRole || isAdding) && (
            <Button onClick={handleAddTask} className="hover-scale bg-brand-electric-blue hover:bg-brand-deep-blue">
              <Plus className="mr-2 h-4 w-4" />
              {isAdding ? "Save Task" : "Add Task"}
            </Button>
          )}
        </div>
      </div>
      
      {isAdding && (
        <div className="mb-6 animate-scale-in">
          <Input
            autoFocus
            placeholder="Enter task title..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-3 text-lg shadow-sm"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Press Enter to save or Escape to cancel
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskHeader;
