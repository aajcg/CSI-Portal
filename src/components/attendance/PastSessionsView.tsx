
import { format } from "date-fns";
import { Session } from "@/types/attendance";

interface PastSessionsViewProps {
  sessions: Session[];
  onViewSession: (sessionId: string) => void;
}

export default function PastSessionsView({ sessions, onViewSession }: PastSessionsViewProps) {
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <h3 className="text-lg font-medium">No sessions yet</h3>
        <p className="text-gray-500">Create a new session to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sessions.map((session) => {
        const attendancePercentage = Math.round((session.presentCount / session.totalStudents) * 100);
        
        return (
          <div key={session.id} className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4 pb-2">
              <h3 className="text-lg font-medium truncate">{session.name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>{format(new Date(session.date), "PPP")}</span>
              </div>
            </div>
            <div className="p-4 pt-2 pb-2">
              <div className="flex items-center justify-between mb-1 mt-1">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>{session.totalStudents} students</span>
                </div>
                <span className="text-sm font-medium">{attendancePercentage}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${attendancePercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className="text-green-600">Present: {session.presentCount}</span>
                <span className="text-red-600">Absent: {session.absentCount}</span>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t">
              <button 
                onClick={() => onViewSession(session.id)}
                className="w-full px-4 py-1.5 text-sm border rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
