
export type Priority = "low" | "medium" | "high";
export type Role = "general" | "core" | "head" | "president";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  priority?: Priority;
  assignedTo?: string;
  assignedBy?: string;
  userRole?: Role;
  category?: string;
}

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  position?: string;
  profileImage?: string;
}
