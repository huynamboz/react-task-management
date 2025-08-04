import { Button } from "@/components/ui/button";

import { IconPlus } from "@tabler/icons-react";
import { FilterBox } from "./components/fillter-box";
import { SprintList } from "./components/sprint-list";
import { useState } from "react";
import type { Sprint } from "./types/backlog-types";

export const BacklogPage = () => {
  const [sprints] = useState<Sprint[]>([
    {
      id: 1,
      title: "Sprint 1 - Authentication & Dashboard",
      startDate: "2/1/2024",
      endDate: "2/14/2024",
      isStarted: false,
      isCompleted: false,
      userStories: [
        {
          id: 1,
          title: "As a user, I want to log into the system so that I can access my dashboard",
          description: "Users need a secure way to authenticate and access their personalized dashboard",
          priority: "high",
          assignee: "John Doe",
          points: 8,
          tags: ["authentication", "security"],
          tasks: [
            { 
              id: 1, 
              title: "Implement JWT authentication", 
              description: "Add JWT token-based authentication system", 
              isCompleted: false,
              priority: "high",
              assignee: "John Doe"
            },
            { 
              id: 2, 
              title: "Create login page UI", 
              description: "Design and implement the login form interface", 
              isCompleted: false,
              priority: "medium",
              assignee: "Jane Smith"
            },
          ],
        },
        {
          id: 2,
          title: "As a user, I want to view my dashboard so that I can see my project overview",
          description: "Create a comprehensive dashboard showing key metrics and project status",
          priority: "medium",
          assignee: "Mike Johnson",
          points: 5,
          tags: ["dashboard", "ui", "analytics"],
          tasks: [
            { 
              id: 3, 
              title: "Design dashboard layout", 
              description: "Create responsive dashboard layout with widgets", 
              isCompleted: false,
              priority: "high",
              assignee: "Sarah Wilson"
            },
            { 
              id: 4, 
              title: "Implement dashboard API", 
              description: "Create backend endpoints for dashboard data", 
              isCompleted: false,
              priority: "medium",
              assignee: "Mike Johnson"
            },
            { 
              id: 5, 
              title: "Add dashboard widgets", 
              description: "Implement charts and statistics widgets", 
              isCompleted: false,
              priority: "low",
              assignee: "Alex Brown"
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Sprint 2 - Project Management Features",
      startDate: "2/15/2024",
      endDate: "2/28/2024",
      isStarted: true,
      isCompleted: false,
      userStories: [
        {
          id: 3,
          title: "As a project manager, I want to create and manage sprints",
          description: "Enable project managers to create, edit, and manage sprint cycles",
          priority: "high",
          assignee: "David Lee",
          points: 6,
          tags: ["sprint", "management", "agile"],
          tasks: [
            { 
              id: 6, 
              title: "Create sprint management interface", 
              description: "Build UI for creating and editing sprints", 
              isCompleted: true,
              priority: "medium",
              assignee: "Sarah Wilson"
            },
            { 
              id: 7, 
              title: "Implement sprint CRUD operations", 
              description: "Add backend functionality for sprint management", 
              isCompleted: false,
              priority: "high",
              assignee: "David Lee"
            },
          ],
        },
        {
          id: 4,
          title: "As a team member, I want to track task progress",
          description: "Allow team members to update task status and track progress",
          priority: "medium",
          assignee: "Emily Chen",
          points: 4,
          tags: ["tracking", "progress", "productivity"],
          tasks: [
            { 
              id: 8, 
              title: "Add task status updates", 
              description: "Implement task status change functionality", 
              isCompleted: false,
              priority: "high",
              assignee: "Emily Chen"
            },
            { 
              id: 9, 
              title: "Create progress tracking dashboard", 
              description: "Build dashboard for tracking team progress", 
              isCompleted: false,
              priority: "medium",
              assignee: "Alex Brown"
            },
            { 
              id: 10, 
              title: "Add time tracking", 
              description: "Implement time logging for tasks", 
              isCompleted: false,
              priority: "low",
              assignee: "Tom Wilson"
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Sprint 3 - Advanced Features & Polish",
      startDate: "3/1/2024",
      endDate: "3/14/2024",
      isStarted: false,
      isCompleted: false,
      userStories: [
        {
          id: 5,
          title: "As a user, I want to receive notifications about important updates",
          description: "Implement notification system for project updates and deadlines",
          priority: "medium",
          assignee: "Alice Green",
          tasks: [
            { 
              id: 11, 
              title: "Design notification system", 
              description: "Plan notification architecture and UI components", 
              isCompleted: false,
              priority: "medium",
              assignee: "Alice Green"
            },
            { 
              id: 12, 
              title: "Implement real-time notifications", 
              description: "Add WebSocket-based real-time notifications", 
              isCompleted: false,
              priority: "high",
              assignee: "Bob Smith"
            },
            { 
              id: 13, 
              title: "Add email notifications", 
              description: "Implement email notification service", 
              isCompleted: false,
              priority: "low",
              assignee: "Charlie Brown"
            },
          ],
        },
        {
          id: 6,
          title: "As a project manager, I want to generate reports",
          description: "Create comprehensive reporting features for project analysis",
          priority: "low",
          assignee: "Alice Green",
          tasks: [
            { 
              id: 14, 
              title: "Create report templates", 
              description: "Design various report templates for different metrics", 
              isCompleted: false,
              priority: "medium",
              assignee: "Diana Prince"
            },
            { 
              id: 15, 
              title: "Implement data export", 
              description: "Add functionality to export reports as PDF/Excel", 
              isCompleted: false,
              priority: "low",
              assignee: "Bruce Wayne"
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Sprint 4 - Bug Fixes & Performance",
      startDate: "3/15/2024",
      endDate: "3/28/2024",
      isStarted: false,
      isCompleted: true,
      userStories: [
        {
          id: 7,
          title: "As a user, I want the application to load quickly",
          description: "Optimize application performance and loading times",
          priority: "high",
          assignee: "Alice Green",
          tasks: [
            { 
              id: 16, 
              title: "Optimize database queries", 
              description: "Review and optimize slow database queries", 
              isCompleted: true,
              priority: "high",
              assignee: "Alice Green"
            },
            { 
              id: 17, 
              title: "Implement code splitting", 
              description: "Add lazy loading and code splitting for better performance", 
              isCompleted: true,
              priority: "medium",
              assignee: "Bob Smith"
            },
            { 
              id: 18, 
              title: "Add caching layer", 
              description: "Implement Redis caching for frequently accessed data", 
              isCompleted: true,
              priority: "medium",
              assignee: "Charlie Brown"
            },
          ],
        },
      ],
    },
  ]);
  return (
    <div>
      {/* header */}
      <div className="px-6 flex items-center justify-between mt-2">
        <div>
          <h1 className="text-2xl font-bold">Backlog</h1>
          <p className="text-base text-gray-500">
            Manage user stories, sprints and tasks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="px-4 py-2rounded-md">
            <IconPlus className="mr-2" />
            Create Sprint
          </Button>
          <Button variant="outline" className="px-4 py-2rounded-md">
            <IconPlus className="mr-2" />
            Add Task
          </Button>
          <Button className="px-4 py-2rounded-md">
            <IconPlus className="mr-2" />
            Add User Story
          </Button>
        </div>
      </div>

      {/* Filter box */}
      <div className="px-6 mt-4">
        <FilterBox />
      </div>

      <div className="border-b mt-6"></div>

      {/* Content */}
      <div className="px-6 mt-6">
        <SprintList sprints={sprints} />
      </div>
    </div>
  );
};
