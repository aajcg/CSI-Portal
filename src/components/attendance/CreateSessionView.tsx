
import { useState } from "react";

interface CreateSessionViewProps {
  onCreateSession: (name: string) => void;
  onCancel: () => void;
}

export default function CreateSessionView({ 
  onCreateSession, 
  onCancel 
}: CreateSessionViewProps) {
  const [sessionName, setSessionName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sessionName.trim()) {
      setError("Please enter a session name");
      return;
    }
    
    onCreateSession(sessionName);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border rounded-lg shadow-md animate-fade-in">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Create New Attendance Session</h2>
        <p className="text-sm text-gray-500">
          Start a new session to track attendance using face recognition
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          <div className="space-y-1.5">
            <label htmlFor="sessionName" className="block text-sm font-medium">Session Name</label>
            <input
              id="sessionName"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Morning Lecture - Data Structures"
              value={sessionName}
              onChange={(e) => {
                setSessionName(e.target.value);
                if (error) setError("");
              }}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t rounded-b-lg flex justify-between">
          <button 
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Session
          </button>
        </div>
      </form>
    </div>
  );
}
