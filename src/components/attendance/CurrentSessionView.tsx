
import { useState } from "react";
import { Session, Student } from "@/types/attendance";

interface CurrentSessionViewProps {
  session: Session;
  presentStudents: Student[];
  absentStudents: Student[];
  onUploadPhoto: (sessionId: string) => void;
  onFileUpload: (sessionId: string) => void;
  onCompleteSession: (sessionId: string) => void;
}

export default function CurrentSessionView({
  session,
  presentStudents,
  absentStudents,
  onUploadPhoto,
  onFileUpload,
  onCompleteSession
}: CurrentSessionViewProps) {
  const [activeTab, setActiveTab] = useState("present");
  const [isUploading, setIsUploading] = useState(false);
  
  const handlePhotoUpload = () => {
    setIsUploading(true);
    
    // Simulate photo upload
    setTimeout(() => {
      onUploadPhoto(session.id);
      setIsUploading(false);
    }, 1500);
  };
  
  const attendancePercentage = Math.round((session.presentCount / session.totalStudents) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold">Current Session Status</h2>
          <p className="text-sm text-gray-500">
            Upload photos to take attendance using face recognition
          </p>
        </div>
        <div className="px-6 pb-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Attendance</span>
              <span className="text-sm font-medium">{attendancePercentage}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `${attendancePercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-green-600">Present: {session.presentCount}</span>
              <span className="text-red-600">Absent: {session.absentCount}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-md">
              <div className="p-4 pb-2">
                <h3 className="text-base font-medium flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-600">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="m22 11-3 3-3-3"></path>
                  </svg>
                  Present
                </h3>
              </div>
              <div className="p-4 pt-2">
                <span className="text-3xl font-bold text-green-600">{session.presentCount}</span>
                <span className="text-sm text-gray-500"> students</span>
              </div>
            </div>
            
            <div className="border rounded-md">
              <div className="p-4 pb-2">
                <h3 className="text-base font-medium flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-red-600">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="m22 7-5 5-3-3"></path>
                  </svg>
                  Absent
                </h3>
              </div>
              <div className="p-4 pt-2">
                <span className="text-3xl font-bold text-red-600">{session.absentCount}</span>
                <span className="text-sm text-gray-500"> students</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-500 mr-2 mt-0.5">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div>
                <h4 className="text-sm font-semibold text-blue-800">Session in progress</h4>
                <p className="text-sm text-blue-700">
                  This session has been active since {new Date(session.date).toLocaleTimeString()}.
                  Upload photos to record attendance.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t flex flex-col sm:flex-row gap-2">
          <button 
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100 transition-colors"
            disabled={isUploading}
            onClick={() => onCompleteSession(session.id)}
          >
            <div className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Complete Session
            </div>
          </button>
          <div className="flex gap-2 sm:ml-auto">
            <button 
              onClick={() => onFileUpload(session.id)}
              disabled={isUploading}
              className="flex-1 sm:flex-none px-4 py-2 text-sm border rounded-md hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                Upload Image
              </div>
            </button>
            <button 
              onClick={handlePhotoUpload}
              disabled={isUploading}
              className="flex-1 sm:flex-none px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                  <circle cx="12" cy="13" r="3"></circle>
                </svg>
                {isUploading ? "Capturing..." : "Capture Photo"}
              </div>
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab("present")}
              className={`px-4 py-3 text-sm font-medium flex-1 ${
                activeTab === "present"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Present ({presentStudents.length})
            </button>
            <button
              onClick={() => setActiveTab("absent")}
              className={`px-4 py-3 text-sm font-medium flex-1 ${
                activeTab === "absent"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Absent ({absentStudents.length})
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={`px-4 py-3 text-sm font-medium flex-1 ${
                activeTab === "photos"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Photos ({session.photos.length})
            </button>
          </div>
        </div>
        
        <div className="p-4">
          {activeTab === "present" && (
            <div>
              {presentStudents.length === 0 ? (
                <p className="text-center py-4 text-gray-500">No students marked present yet</p>
              ) : (
                <div className="space-y-2">
                  {presentStudents.map((student) => (
                    <div key={student.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{student.name}</p>
                        <p className="text-xs text-gray-500">Roll: {student.rollNumber}</p>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-600 ml-auto">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === "absent" && (
            <div>
              {absentStudents.length === 0 ? (
                <p className="text-center py-4 text-gray-500">No students marked absent</p>
              ) : (
                <div className="space-y-2">
                  {absentStudents.map((student) => (
                    <div key={student.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{student.name}</p>
                        <p className="text-xs text-gray-500">Roll: {student.rollNumber}</p>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-red-600 ml-auto">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === "photos" && (
            <div>
              {session.photos.length === 0 ? (
                <p className="text-center py-4 text-gray-500">No photos uploaded yet</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {session.photos.map((photo) => (
                    <div key={photo.id} className="space-y-2">
                      <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
                        <img 
                          src={photo.url} 
                          alt="Class photo" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs">
                        <p className="text-gray-500">
                          {new Date(photo.uploadedAt).toLocaleTimeString()}
                        </p>
                        <p>Recognized: {photo.recognizedFaces} students</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
