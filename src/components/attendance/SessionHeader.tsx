
import { Button } from "@/components/ui/button";
import { PlusCircle, History, Download } from "lucide-react";
import { Session } from "@/types/attendance";

interface SessionHeaderProps {
  currentSession: Session | null;
  onCreateSession: () => void;
  onViewPastSessions: () => void;
  onDownloadAttendance: () => void;
}

export function SessionHeader({
  currentSession,
  onCreateSession,
  onViewPastSessions,
  onDownloadAttendance
}: SessionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {currentSession ? 'Current Session' : 'Attendance System'}
        </h1>
        <div className="flex items-center gap-2">
          {currentSession ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onDownloadAttendance}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download Attendance</span>
              <span className="sm:hidden">Download</span>
            </Button>
          ) : (
            <Button 
              onClick={onCreateSession} 
              size="sm"
              className="flex items-center gap-1 bg-brand-deep-blue hover:bg-brand-royal-blue"
            >
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Create Session</span>
              <span className="sm:hidden">New</span>
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onViewPastSessions}
            className="flex items-center gap-1"
          >
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">Past Sessions</span>
            <span className="sm:hidden">History</span>
          </Button>
        </div>
      </div>
      {currentSession && (
        <div className="mt-2 text-muted-foreground">
          <p className="text-lg font-medium">{currentSession.name}</p>
          <p className="text-sm">
            {new Date(currentSession.date).toLocaleDateString()} • 
            {currentSession.presentCount} present • 
            {currentSession.absentCount} absent
          </p>
        </div>
      )}
    </div>
  );
}
