
import { useState } from "react";
import TaskHeader from "@/components/TaskHeader";
import TaskList from "@/components/TaskList";
import { User } from "@/types/task";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssignTaskForm from "@/components/AssignTaskForm";
import TaskStats from "@/components/TaskStats";
import { Card, CardContent } from "@/components/ui/card";
import { useTasks, sampleUsers } from "@/hooks/useTasks";

const Tasks = () => {
  // For demo, we start with the head user role
  const [currentUser, setCurrentUser] = useState<User>(sampleUsers[0]);
  const [currentView, setCurrentView] = useState<"list" | "assign">("list");
  
  const {
    tasks,
    taskStats,
    searchQuery,
    handleAddTask,
    handleCompleteTask,
    handleDeleteTask,
    handleUpdateTask,
    handleSearch,
    handleAssignTask
  } = useTasks(currentUser);

  return (
    <div className="container max-w-4xl py-8 px-4 sm:px-6">
      {/* Main header for the page */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-deep-blue">CSI Task Management</h1>
        <p className="text-muted-foreground mt-2">
          {currentUser.role === "head" 
            ? "Assign, track, and manage tasks for your team" 
            : "View and manage your assigned tasks"}
        </p>
      </div>

      {/* Task stats dashboard */}
      <TaskStats stats={taskStats} />
      
      {/* Tabs for switching between task views */}
      <Tabs defaultValue="tasks" className="mt-8">
        <TabsList className="grid grid-cols-2 sm:w-[400px]">
          <TabsTrigger value="tasks" onClick={() => setCurrentView("list")}>Task List</TabsTrigger>
          {currentUser.role === "head" && (
            <TabsTrigger value="assign" onClick={() => setCurrentView("assign")}>Assign Tasks</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="tasks" className="mt-6">
          <TaskHeader 
            onAddTask={handleAddTask} 
            onSearch={handleSearch} 
            isHeadRole={currentUser.role === "head"}
          />
          <TaskList 
            tasks={tasks}
            users={sampleUsers}
            onComplete={handleCompleteTask}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
            searchQuery={searchQuery}
            currentUser={currentUser}
          />
        </TabsContent>
        
        {currentUser.role === "head" && (
          <TabsContent value="assign" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <AssignTaskForm 
                  onAssign={handleAssignTask} 
                  users={sampleUsers.filter(user => user.role === "core")} 
                />
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Tasks;
