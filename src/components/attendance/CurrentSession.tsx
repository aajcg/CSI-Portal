
import { useState } from "react";
import { Session, Student } from "@/types/attendance";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle, Clock, UserX, UserCheck, Camera } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

interface CurrentSessionProps {
  session: Session;
  presentStudents: Student[];
  absentStudents: Student[];
  onUploadPhoto: (sessionId: string) => void;
  onFileUpload: (sessionId: string) => void;
  onCompleteSession: (sessionId: string) => void;
}

export function CurrentSession({
  session,
  presentStudents,
  absentStudents,
  onUploadPhoto,
  onFileUpload,
  onCompleteSession
}: CurrentSessionProps) {
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
      <Card>
        <CardHeader>
          <CardTitle>Current Session Status</CardTitle>
          <CardDescription>
            Upload photos to take attendance using face recognition
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Attendance</span>
              <span className="text-sm font-medium">{attendancePercentage}%</span>
            </div>
            <Progress value={attendancePercentage} className="h-2" />
            <div className="flex justify-between text-xs">
              <span className="text-green-600">Present: {session.presentCount}</span>
              <span className="text-red-600">Absent: {session.absentCount}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center gap-1">
                  <UserCheck className="h-4 w-4 text-green-600" />
                  Present
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <span className="text-3xl font-bold text-green-600">{session.presentCount}</span>
                <span className="text-sm text-muted-foreground"> students</span>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center gap-1">
                  <UserX className="h-4 w-4 text-red-600" />
                  Absent
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <span className="text-3xl font-bold text-red-600">{session.absentCount}</span>
                <span className="text-sm text-muted-foreground"> students</span>
              </CardContent>
            </Card>
          </div>
          
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertTitle>Session in progress</AlertTitle>
            <AlertDescription>
              This session has been active since {new Date(session.date).toLocaleTimeString()}.
              Upload photos to record attendance.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            disabled={isUploading}
            onClick={() => onCompleteSession(session.id)}
            className="w-full sm:w-auto"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Complete Session
          </Button>
          <div className="flex gap-2 w-full sm:w-auto sm:ml-auto">
            <Button 
              onClick={() => onFileUpload(session.id)}
              disabled={isUploading}
              variant="outline"
              className="flex-1 sm:flex-none"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
            <Button 
              onClick={handlePhotoUpload}
              disabled={isUploading}
              className="flex-1 sm:flex-none bg-brand-deep-blue hover:bg-brand-royal-blue"
            >
              <Camera className="mr-2 h-4 w-4" />
              {isUploading ? "Capturing..." : "Capture Photo"}
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <Tabs defaultValue="present" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="present" className="w-full">
            Present ({presentStudents.length})
          </TabsTrigger>
          <TabsTrigger value="absent" className="w-full">
            Absent ({absentStudents.length})
          </TabsTrigger>
          <TabsTrigger value="photos" className="w-full">
            Photos ({session.photos.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="present" className="mt-4">
          <Card>
            <CardContent className="p-4">
              {presentStudents.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No students marked present yet</p>
              ) : (
                <div className="space-y-2">
                  {presentStudents.map((student) => (
                    <div key={student.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md">
                      <Avatar className="h-8 w-8">
                        {student.photoUrl ? (
                          <AvatarImage src={student.photoUrl} alt={student.name} />
                        ) : null}
                        <AvatarFallback>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">Roll: {student.rollNumber}</p>
                      </div>
                      <UserCheck className="h-4 w-4 text-green-600 ml-auto" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="absent" className="mt-4">
          <Card>
            <CardContent className="p-4">
              {absentStudents.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No students marked absent</p>
              ) : (
                <div className="space-y-2">
                  {absentStudents.map((student) => (
                    <div key={student.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md">
                      <Avatar className="h-8 w-8">
                        {student.photoUrl ? (
                          <AvatarImage src={student.photoUrl} alt={student.name} />
                        ) : null}
                        <AvatarFallback>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">Roll: {student.rollNumber}</p>
                      </div>
                      <UserX className="h-4 w-4 text-red-600 ml-auto" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="photos" className="mt-4">
          <Card>
            <CardContent className="p-4">
              {session.photos.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No photos uploaded yet</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {session.photos.map((photo) => (
                    <div key={photo.id} className="space-y-2">
                      <div className="aspect-video bg-muted rounded-md overflow-hidden">
                        <img 
                          src={photo.url} 
                          alt="Class photo" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs">
                        <p className="text-muted-foreground">
                          {new Date(photo.uploadedAt).toLocaleTimeString()}
                        </p>
                        <p>Recognized: {photo.recognizedFaces} students</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
