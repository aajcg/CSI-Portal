import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Session, Student, AttendanceRecord } from "@/types/attendance";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

// Sample students data
const sampleStudents: Student[] = [
  {
    id: uuidv4(),
    name: "Ishit Dandawate",
    rollNumber: "CS001",
    present: false, // Add the missing 'present' property
    photoUrl: "/lovable-uploads/3705d2e8-16d8-4cc9-a7ca-278f93bf23bb.png",
  },
  {
    id: uuidv4(),
    name: "Anannya Gupta",
    rollNumber: "CS002",
    present: false, // Add the missing 'present' property
    photoUrl: null, // Add the missing 'photoUrl' property
  },
  {
    id: uuidv4(),
    name: "Aksh Garg",
    rollNumber: "CS003",
    present: false, // Add the missing 'present' property
    photoUrl: null, // Add the missing 'photoUrl' property
  },
  {
    id: uuidv4(),
    name: "Tanmay Bansal",
    rollNumber: "CS004",
    present: false, // Add the missing 'present' property
    photoUrl: null, // Add the missing 'photoUrl' property
  },
  {
    id: uuidv4(),
    name: "Abhilove Goyal",
    rollNumber: "CS005",
    present: false, // Add the missing 'present' property
    photoUrl: null, // Add the missing 'photoUrl' property
  },
];

// Initialize with empty sessions instead of sample ones
const initialSessions: Session[] = [];

export function useAttendance() {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [students] = useState<Student[]>(sampleStudents);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const { toast: useToastNotification } = useToast();

  const createSession = (name: string) => {
    const newSession: Session = {
      id: uuidv4(),
      name,
      date: new Date().toISOString(),
      totalStudents: students.length,
      presentCount: 0,
      absentCount: students.length,
      status: "active", // Now valid since we added it to the Session type
      photos: [],
    };

    setSessions([newSession, ...sessions]);
    setCurrentSession(newSession);

    // Show success toast
    useToastNotification({
      title: "Session created",
      description: `New session "${name}" has been created`
    });
    
    toast.success("Session created successfully");
    
    return newSession;
  };

  const uploadPhoto = (sessionId: string, photoUrl: string) => {
    // Mock face recognition results - simulating AI processing
    const recognizedFaces = Math.floor(Math.random() * students.length) + 1;
    
    const newPhoto = {
      id: uuidv4(),
      url: photoUrl,
      uploadedAt: new Date().toISOString(),
      recognizedFaces: recognizedFaces,
    };

    // Update sessions with the new photo
    const updatedSessions = sessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          photos: [...session.photos, newPhoto],
        };
      }
      return session;
    });

    setSessions(updatedSessions);

    // If this is the current session, update it
    if (currentSession && currentSession.id === sessionId) {
      setCurrentSession({
        ...currentSession,
        photos: [...currentSession.photos, newPhoto],
      });
    }

    // Mock attendance records based on recognized faces
    const presentStudentIds = students
      .slice(0, newPhoto.recognizedFaces)
      .map(student => student.id);

    const newAttendanceRecords = presentStudentIds.map(studentId => ({
      sessionId,
      studentId,
      timestamp: new Date().toISOString(),
      isPresent: true,
    }));

    setAttendanceRecords([...attendanceRecords, ...newAttendanceRecords]);

    // Update session with attendance counts
    updateSessionAttendance(sessionId, presentStudentIds.length);

    // Show success toast
    useToastNotification({
      title: "Photo processed",
      description: `Recognized ${newPhoto.recognizedFaces} students`
    });
    
    toast.success(`Recognized ${newPhoto.recognizedFaces} students in the image`);
    
    return newPhoto;
  };

  const updateSessionAttendance = (sessionId: string, presentCount: number) => {
    const updatedSessions = sessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          presentCount,
          absentCount: session.totalStudents - presentCount,
        };
      }
      return session;
    });

    setSessions(updatedSessions);

    // If this is the current session, update it
    if (currentSession && currentSession.id === sessionId) {
      setCurrentSession({
        ...currentSession,
        presentCount,
        absentCount: currentSession.totalStudents - presentCount,
      });
    }
  };

  const completeSession = (sessionId: string) => {
    const updatedSessions = sessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          status: "completed" as "active" | "completed", // Explicitly cast to the correct union type
        };
      }
      return session;
    });

    setSessions(updatedSessions);
    setCurrentSession(null);

    // Show success toast
    useToastNotification({
      title: "Session completed",
      description: "Attendance data has been saved"
    });
    
    toast.success("Session completed successfully");
  };

  const viewSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
    }
  };

  const clearCurrentSession = () => {
    setCurrentSession(null);
  };

  const getPresentStudents = (sessionId: string) => {
    const sessionRecords = attendanceRecords.filter(
      record => record.sessionId === sessionId && record.isPresent
    );
    
    const presentStudentIds = new Set(sessionRecords.map(record => record.studentId));
    
    return students.filter(student => presentStudentIds.has(student.id));
  };

  const getAbsentStudents = (sessionId: string) => {
    const presentStudentIds = new Set(
      attendanceRecords
        .filter(record => record.sessionId === sessionId && record.isPresent)
        .map(record => record.studentId)
    );
    
    return students.filter(student => !presentStudentIds.has(student.id));
  };

  return {
    sessions,
    currentSession,
    students,
    createSession,
    uploadPhoto,
    completeSession,
    viewSession,
    clearCurrentSession,
    getPresentStudents,
    getAbsentStudents
  };
}
