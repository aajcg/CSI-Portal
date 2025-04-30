import { useState, useRef, useEffect } from "react";
import { Task, User } from "@/types/task";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  Edit, 
  Trash, 
  Tag 
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface TaskItemProps {
  task: Task;
  users: User[];
  onComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  currentUser: User;
}

const TaskItem = ({ 
  task, 
  users, 
  onComplete, 
  onDelete, 
  onUpdate,
  currentUser
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Format display date
  const displayDate = task.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "";
  
  // Get assignee info
  const assignee = users.find(user => user.id === task.assignedTo);
  const assignedBy = users.find(user => user.id === task.assignedBy);
  
  // Check if current user can delete or edit this task
  const canModify = currentUser.role === "head" || task.assignedTo === currentUser.id;
  
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim() !== "") {
      onUpdate(task.id, editedTitle);
      setIsEditing(false);
      toast.success("Task updated successfully");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditedTitle(task.title);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    onDelete(task.id);
    toast.success("Task deleted successfully");
  };

  const handleCheckboxChange = (checked: boolean) => {
    onComplete(task.id, checked);
    if (checked) {
      toast.success("Task completed!");
    }
  };

  return (
    <div 
      className={cn(
        "p-4 mb-3 rounded-lg glass task-transition group relative",
        task.completed ? "bg-muted/50" : "hover-scale",
        isHovered ? "shadow-md" : "shadow-sm"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <Checkbox 
          checked={task.completed} 
          onCheckedChange={handleCheckboxChange}
          className="mt-1.5 h-5 w-5 rounded-full"
        />
        
        <div className="flex-1">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              className="w-full p-1 bg-transparent border-b border-primary/20 focus:border-primary outline-none text-base"
              autoFocus
            />
          ) : (
            <div className="flex items-baseline justify-between">
              <div>
                <h3 
                  className={cn(
                    "text-base font-medium mb-1 transition-all",
                    task.completed && "line-through text-muted-foreground"
                  )}
                >
                  {task.title}
                </h3>
                
                {task.description && (
                  <p className={cn(
                    "text-sm text-muted-foreground mb-2",
                    task.completed && "line-through"
                  )}>
                    {task.description}
                  </p>
                )}
              </div>
              
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {canModify && (
                  <>
                    <Button variant="ghost" size="icon" onClick={handleEdit} className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleDelete} className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
          
          {/* Task metadata */}
          <div className="flex items-center flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{displayDate}</span>
              </div>
            )}
            
            {task.priority && (
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span className={cn(
                  task.priority === "high" && "text-destructive",
                  task.priority === "medium" && "text-amber-500",
                  task.priority === "low" && "text-green-500"
                )}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </span>
              </div>
            )}
            
            {task.category && (
              <div className="flex items-center gap-1">
                <Tag className="h-3.5 w-3.5" />
                <span>{task.category}</span>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
