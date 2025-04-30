
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="container py-10 max-w-5xl">
      <h1 className="text-4xl font-bold mb-6 text-center">CSI Dashboard</h1>
      <p className="text-center text-gray-500 mb-10">
        Welcome to the CSI Management Dashboard. Choose a module to get started.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-brand-deep-blue" />
              Task Management
            </CardTitle>
            <CardDescription>
              Assign and track tasks for your team members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Create, assign, and monitor tasks. Track progress and ensure deadlines are met.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-brand-deep-blue hover:bg-brand-royal-blue">
              <Link to="/tasks">Go to Tasks</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-brand-deep-blue" />
              Attendance System
            </CardTitle>
            <CardDescription>
              Track attendance using face recognition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Create sessions, upload photos, and automatically mark attendance using facial recognition.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-brand-deep-blue hover:bg-brand-royal-blue">
              <Link to="/attendance">Go to Attendance</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
