
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, BarChart, ArrowRight, Upload } from "lucide-react";

export default function AttendanceSystem() {
  return (
    <div className="container py-6 md:py-10 max-w-screen-xl">
      <div className="mb-4">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Attendance System</h1>
          <p className="text-muted-foreground">
            Track student attendance using facial recognition
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-brand-deep-blue" />
                Take Attendance
              </CardTitle>
              <CardDescription>
                Create a session and take attendance with facial recognition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Use the camera to capture photos and automatically mark attendance
                using facial recognition. Perfect for instructors and team leaders.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Upload className="h-4 w-4" />
                <span>Supports both camera capture and image upload</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-brand-deep-blue hover:bg-brand-royal-blue">
                <Link to="/attendance/take" className="flex items-center justify-between">
                  <span>Take Attendance</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-brand-deep-blue" />
                Attendance Analysis
              </CardTitle>
              <CardDescription>
                View attendance statistics and download reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Access detailed attendance records, analyze trends, and export
                attendance data. Available for all team members.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/attendance/analysis" className="flex items-center justify-between">
                  <span>View Analysis</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
