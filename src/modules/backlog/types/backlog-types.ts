export interface Sprint {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  userStories: UserStory[];
  isStarted: boolean;
  isCompleted: boolean;
}

export interface UserStory {
  id: number;
  title: string;
  description: string;
  tasks: Task[];
  priority: "low" | "medium" | "high";
  assignee: string;
  points?: number;
  tags?: string[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: "low" | "medium" | "high";
  assignee: string;
}