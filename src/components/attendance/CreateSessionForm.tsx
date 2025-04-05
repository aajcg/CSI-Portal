
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface CreateSessionFormProps {
  onCreateSession: (name: string) => void;
  onCancel: () => void;
}

export function CreateSessionForm({ onCreateSession, onCancel }: CreateSessionFormProps) {
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
    <Card className="mx-auto max-w-md animate-fade-in">
      <CardHeader>
        <CardTitle>Create New Attendance Session</CardTitle>
        <CardDescription>
          Start a new session to track attendance using face recognition
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="sessionName">Session Name</Label>
              <Input
                id="sessionName"
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
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit" className="bg-brand-deep-blue hover:bg-brand-royal-blue">
            Create Session
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
