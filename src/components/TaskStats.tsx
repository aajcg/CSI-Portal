
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  CheckCircle, 
  ClipboardList, 
  AlertCircle, 
  Clock 
} from "lucide-react";

interface TaskStatsProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
    highPriority: number;
  };
}

const TaskStats = ({ stats }: TaskStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-brand-ice-blue border-brand-light-blue">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          <ClipboardList className="h-4 w-4 text-brand-electric-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">
            Total tasks in the system
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-green-50 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.completed}</div>
          <p className="text-xs text-muted-foreground">
            {stats.total > 0 ? 
              `${Math.round((stats.completed / stats.total) * 100)}% completion rate` : 
              "No tasks available"}
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <Clock className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pending}</div>
          <p className="text-xs text-muted-foreground">
            Tasks awaiting completion
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-red-50 border-red-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          <AlertCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.highPriority}</div>
          <p className="text-xs text-muted-foreground">
            Urgent tasks requiring attention
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskStats;
