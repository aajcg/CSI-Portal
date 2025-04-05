import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAttendance } from "@/hooks/useAttendance";
import { ArrowLeft, Camera, CheckCircle, Upload } from "lucide-react";
import { WebcamCapture } from "@/components/attendance/WebcamCapture";
import { CreateSessionForm } from "@/components/attendance/CreateSessionForm";
import { ImageUpload } from "@/components/attendance/ImageUpload";
import { CurrentSession } from "@/components/attendance/CurrentSession";

export default function TakeAttendance() {
  const {
    createSession,
    currentSession,
    uploadPhoto,
    completeSession,
    getPresentStudents,
    getAbsentStudents,
  } = useAttendance();
  
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  
  // Handle session creation
  const handleCreateSession = () => {
    setIsCreatingSession(true);
  };
  
  const handleCreateSessionSubmit = (name: string) => {
    createSession(name);
    setIsCreatingSession(false);
  };
  
  // Handle photo capture
  const handleCapturePhoto = (imageData: string) => {
    if (!currentSession) return;
    
    // Use the captured photo for attendance
    uploadPhoto(currentSession.id, imageData);
    setShowCamera(false);
  };
  
  // Handle image upload
  const handleImageUpload = (imageData: string) => {
    if (!currentSession) return;
    
    // Use the uploaded photo for attendance
    uploadPhoto(currentSession.id, imageData);
    setShowUpload(false);
  };
  
  // Determine what to render based on state
  const renderContent = () => {
    if (isCreatingSession) {
      return (
        <CreateSessionForm
          onCreateSession={handleCreateSessionSubmit}
          onCancel={() => setIsCreatingSession(false)}
        />
      );
    }
    
    if (currentSession) {
      return (
        <div className="space-y-6">
          <CurrentSession
            session={currentSession}
            presentStudents={getPresentStudents(currentSession.id)}
            absentStudents={getAbsentStudents(currentSession.id)}
            onUploadPhoto={() => setShowCamera(true)}
            onFileUpload={() => setShowUpload(true)}
            onCompleteSession={completeSession}
          />
        </div>
      );
    }
    
    // No active session, show start options
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Take Attendance</h2>
          <p className="text-muted-foreground">
            Create a session and capture photos to take attendance
          </p>
        </div>
        
        <Button
          size="lg"
          onClick={handleCreateSession}
          className="bg-brand-deep-blue hover:bg-brand-royal-blue"
        >
          <CheckCircle className="mr-2 h-5 w-5" />
          Start New Session
        </Button>
      </div>
    );
  };

  return (
    <div className="container py-6 md:py-10 max-w-screen-xl">
      <div className="mb-4">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/attendance" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Attendance
          </Link>
        </Button>
      </div>
      
      <div className="space-y-6">
        {renderContent()}
      </div>
      
      {showCamera && (
        <WebcamCapture
          onCapture={handleCapturePhoto}
          onClose={() => setShowCamera(false)}
        />
      )}

      {showUpload && (
        <ImageUpload 
          onUpload={handleImageUpload}
          onClose={() => setShowUpload(false)}
        />
      )}
    </div>
  );
}
