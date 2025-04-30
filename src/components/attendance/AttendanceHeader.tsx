
import { Session } from "@/types/attendance";

interface AttendanceHeaderProps {
  currentSession: Session | null;
  onCreateSession: () => void;
  onViewPastSessions: () => void;
  onDownloadAttendance: () => void;
}

export default function AttendanceHeader({
  currentSession,
  onCreateSession,
  onViewPastSessions,
  onDownloadAttendance
}: AttendanceHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {currentSession ? 'Current Session' : 'Attendance System'}
        </h1>
        <div className="flex items-center gap-2">
          {currentSession ? (
            <button 
              onClick={onDownloadAttendance}
              className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span className="hidden sm:inline">Download Attendance</span>
              <span className="sm:hidden">Download</span>
            </button>
          ) : (
            <button 
              onClick={onCreateSession} 
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <span className="hidden sm:inline">Create Session</span>
              <span className="sm:hidden">New</span>
            </button>
          )}
          <button 
            onClick={onViewPastSessions}
            className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
            <span className="hidden sm:inline">Past Sessions</span>
            <span className="sm:hidden">History</span>
          </button>
        </div>
      </div>
      {currentSession && (
        <div className="mt-2 text-gray-600">
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
