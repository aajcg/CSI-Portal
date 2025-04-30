
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, UserCheck, UserX, Users } from "lucide-react";
import { useAttendance } from "@/hooks/useAttendance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SessionList } from "@/components/attendance/SessionList";
import { Session } from "@/types/attendance";
import { useToast } from "@/hooks/use-toast";

export default function AttendanceAnalysis() {
  const { sessions, viewSession, getPresentStudents, getAbsentStudents } = useAttendance();
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const { toast } = useToast();
  
  // Calculate overall attendance stats from actual data
  const totalSessions = sessions.length;
  const totalStudents = sessions.length > 0 ? sessions[0]?.totalStudents : 0;
  const averageAttendance = sessions.length > 0
    ? Math.round(sessions.reduce((acc, session) => acc + session.presentCount, 0) / sessions.length)
    : 0;
  const averagePercentage = totalStudents > 0
    ? Math.round((averageAttendance / totalStudents) * 100)
    : 0;
  
  const handleViewSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setSelectedSession(session);
    }
  };
  
  const handleDownloadAttendance = () => {
    if (!selectedSession) return;
    
    const present = getPresentStudents(selectedSession.id);
    const absent = getAbsentStudents(selectedSession.id);
    
    // Create a CSV string from actual data
    const presentRows = present.map(s => `${s.name},${s.rollNumber},Present`);
    const absentRows = absent.map(s => `${s.name},${s.rollNumber},Absent`);
    const csvContent = [
      `Attendance for: ${selectedSession.name} - ${new Date(selectedSession.date).toLocaleDateString()}`,
      "Name,Roll Number,Status",
      ...presentRows,
      ...absentRows
    ].join("\n");
    
    // Create downloadable link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `attendance_${selectedSession.name.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "Attendance report has been downloaded",
    });
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
      
      <h1 className="text-2xl font-bold mb-6">Attendance Analysis</h1>
      
      {sessions.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="text-2xl font-bold">{totalSessions}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <UserCheck className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-2xl font-bold">{averageAttendance}/{totalStudents}</span>
                  <span className="ml-2 text-muted-foreground">({averagePercentage}%)</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Absent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <UserX className="h-5 w-5 text-red-600 mr-2" />
                  <span className="text-2xl font-bold">{totalStudents - averageAttendance}/{totalStudents}</span>
                  <span className="ml-2 text-muted-foreground">({100 - averagePercentage}%)</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Session History</h2>
              <SessionList
                sessions={sessions}
                onViewSession={handleViewSession}
              />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Session Details</h2>
              {selectedSession ? (
                <Card>
                  <CardHeader className="pb-2 flex flex-row justify-between items-start">
                    <div>
                      <CardTitle>{selectedSession.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedSession.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleDownloadAttendance}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Present: <span className="font-medium text-green-600">{selectedSession.presentCount}</span></span>
                        <span>Absent: <span className="font-medium text-red-600">{selectedSession.absentCount}</span></span>
                        <span>Attendance: <span className="font-medium">{Math.round((selectedSession.presentCount / selectedSession.totalStudents) * 100)}%</span></span>
                      </div>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Roll Number</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getPresentStudents(selectedSession.id).map(student => (
                            <TableRow key={student.id}>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.rollNumber}</TableCell>
                              <TableCell className="text-green-600">Present</TableCell>
                            </TableRow>
                          ))}
                          {getAbsentStudents(selectedSession.id).map(student => (
                            <TableRow key={student.id}>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.rollNumber}</TableCell>
                              <TableCell className="text-red-600">Absent</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">Select a session to view details</p>
                </Card>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Users className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Attendance Sessions Found</h3>
          <p className="text-muted-foreground max-w-md mb-8">
            You haven't created any attendance sessions yet. Start by creating a new session.
          </p>
          <Button asChild>
            <Link to="/attendance/take">Create Attendance Session</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
