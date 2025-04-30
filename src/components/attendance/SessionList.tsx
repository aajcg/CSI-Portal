
import { Session } from "@/types/attendance";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Eye, Calendar, Users } from "lucide-react";
import { format } from "date-fns";

interface SessionListProps {
  sessions: Session[];
  onViewSession: (sessionId: string) => void;
}

export function SessionList({ sessions, onViewSession }: SessionListProps) {
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <h3 className="text-lg font-medium">No sessions yet</h3>
        <p className="text-muted-foreground">Create a new session to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sessions.map((session) => {
        const attendancePercentage = Math.round((session.presentCount / session.totalStudents) * 100);
        
        return (
          <Card key={session.id} className="hover-scale overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="truncate text-lg">{session.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{format(new Date(session.date), "PPP")}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between mb-1 mt-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span>{session.totalStudents} students</span>
                </div>
                <span className="text-sm font-medium">{attendancePercentage}%</span>
              </div>
              <Progress value={attendancePercentage} className="h-2" />
              <div className="flex justify-between mt-2 text-xs">
                <span className="text-green-600">Present: {session.presentCount}</span>
                <span className="text-red-600">Absent: {session.absentCount}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full gap-1" 
                onClick={() => onViewSession(session.id)}
              >
                <Eye className="h-3.5 w-3.5" />
                View Details
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
