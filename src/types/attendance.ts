
export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  present: boolean;
  photoUrl: string | null;
}

export interface Photo {
  id: string;
  url: string;
  uploadedAt: string;
  recognizedFaces: number;
}

export interface Session {
  id: string;
  name: string;
  date: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  photos: Photo[];
  status?: "active" | "completed"; // Make status optional with specific values
}

// Adding the missing AttendanceRecord type
export interface AttendanceRecord {
  sessionId: string;
  studentId: string;
  timestamp: string;
  isPresent: boolean;
}
