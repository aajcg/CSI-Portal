
import { useState } from "react";
import { Session, Student } from "@/types/attendance";
import CurrentSessionView from "@/components/attendance/CurrentSessionView";
import CreateSessionView from "@/components/attendance/CreateSessionView";
import PastSessionsView from "@/components/attendance/PastSessionsView";
import AttendanceHeader from "@/components/attendance/AttendanceHeader";
import { WebcamCapture } from "@/components/attendance/WebcamCapture";
import { ImageUpload } from "@/components/attendance/ImageUpload";

const sampleStudents: Student[] = [
  { id: "1", name: "Student 1", rollNumber: "S001", present: false, photoUrl: null },
  { id: "2", name: "Student 2", rollNumber: "S002", present: false, photoUrl: null },
  { id: "3", name: "Student 3", rollNumber: "S003", present: false, photoUrl: null },
  { id: "4", name: "Student 4", rollNumber: "S004", present: false, photoUrl: null },
  { id: "5", name: "Student 5", rollNumber: "S005", present: false, photoUrl: null },
];

// Empty sessions list
const sampleSessions: Session[] = [];

export default function AttendancePage() {
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [pastSessions, setPastSessions] = useState<Session[]>(sampleSessions);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [viewingPastSessions, setViewingPastSessions] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const [presentStudents, setPresentStudents] = useState<Student[]>(
    sampleStudents.filter(student => student.present)
  );
  const [absentStudents, setAbsentStudents] = useState<Student[]>(
    sampleStudents.filter(student => !student.present)
  );

  const handleCreateSession = (sessionName: string) => {
    const newSession: Session = {
      id: Date.now().toString(),
      name: sessionName,
      date: new Date().toISOString(),
      totalStudents: sampleStudents.length,
      presentCount: 0,
      absentCount: sampleStudents.length,
      photos: []
    };
    
    setCurrentSession(newSession);
    setIsCreateMode(false);
  };

  const handleCancelCreate = () => {
    setIsCreateMode(false);
  };

  const handleStartCreateSession = () => {
    setIsCreateMode(true);
    setViewingPastSessions(false);
  };

  const handleViewPastSessions = () => {
    setViewingPastSessions(true);
    setIsCreateMode(false);
  };

  const handleViewSession = (sessionId: string) => {
    const session = pastSessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
      setViewingPastSessions(false);
    }
  };

  const handleCompleteSession = (sessionId: string) => {
    if (currentSession) {
      setPastSessions([currentSession, ...pastSessions]);
      setCurrentSession(null);
    }
  };

  const handleWebcamCapture = (sessionId: string) => {
    setShowWebcam(true);
  };

  const handleFileUpload = (sessionId: string) => {
    setShowImageUpload(true);
  };

  const handleCaptureImage = (imageData: string) => {
    // In a real app, you would send this image to a backend for processing
    console.log("Captured image:", imageData);
    setShowWebcam(false);
    
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        photos: [
          ...currentSession.photos,
          {
            id: `photo-${Date.now()}`,
            url: imageData,
            uploadedAt: new Date().toISOString(),
            recognizedFaces: Math.floor(Math.random() * 10) + 5
          }
        ],
        presentCount: currentSession.presentCount + 3,
        absentCount: currentSession.absentCount - 3
      };
      
      setCurrentSession(updatedSession);
      
      // Update the students lists (this would be based on face recognition in a real app)
      const newPresent = [...absentStudents.slice(0, 3), ...presentStudents];
      const newAbsent = absentStudents.slice(3);
      
      setPresentStudents(newPresent);
      setAbsentStudents(newAbsent);
    }
  };

  const handleUploadImage = (imageData: string) => {
    // Similar to handleCaptureImage but for uploaded images
    console.log("Uploaded image:", imageData);
    setShowImageUpload(false);
    
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        photos: [
          ...currentSession.photos,
          {
            id: `photo-${Date.now()}`,
            url: imageData,
            uploadedAt: new Date().toISOString(),
            recognizedFaces: Math.floor(Math.random() * 10) + 5
          }
        ],
        presentCount: currentSession.presentCount + 2,
        absentCount: currentSession.absentCount - 2
      };
      
      setCurrentSession(updatedSession);
      
      // Update the students lists
      const newPresent = [...absentStudents.slice(0, 2), ...presentStudents];
      const newAbsent = absentStudents.slice(2);
      
      setPresentStudents(newPresent);
      setAbsentStudents(newAbsent);
    }
  };

  const handleDownloadAttendance = () => {
    // In a real app, this would generate a CSV or PDF of attendance data
    alert("Attendance report would be downloaded here");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AttendanceHeader
        currentSession={currentSession}
        onCreateSession={handleStartCreateSession}
        onViewPastSessions={handleViewPastSessions}
        onDownloadAttendance={handleDownloadAttendance}
      />

      {isCreateMode && (
        <CreateSessionView
          onCreateSession={handleCreateSession}
          onCancel={handleCancelCreate}
        />
      )}

      {!isCreateMode && !viewingPastSessions && currentSession && (
        <CurrentSessionView
          session={currentSession}
          presentStudents={presentStudents}
          absentStudents={absentStudents}
          onUploadPhoto={handleWebcamCapture}
          onFileUpload={handleFileUpload}
          onCompleteSession={handleCompleteSession}
        />
      )}

      {viewingPastSessions && (
        <PastSessionsView 
          sessions={pastSessions}
          onViewSession={handleViewSession} 
        />
      )}

      {showWebcam && (
        <WebcamCapture 
          onCapture={handleCaptureImage}
          onClose={() => setShowWebcam(false)}
        />
      )}

      {showImageUpload && (
        <ImageUpload 
          onUpload={handleUploadImage}
          onClose={() => setShowImageUpload(false)}
        />
      )}
    </div>
  );
}
