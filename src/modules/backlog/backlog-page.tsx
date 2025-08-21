import { Button } from "@/components/ui/button";

import { IconPlus } from "@tabler/icons-react";
import { FilterBox } from "./components/fillter-box";
import { SprintList } from "./components/sprint-list";
import { AddSprintModal } from "./components/add-sprint-modal";
import { AddUserStoryModal } from "./components/add-user-story-modal";
import { AddTaskModal } from "./components/add-task-modal";
import { useEffect, useState } from "react";
import { useProjectStore } from "@/store";
import { axiosClient } from "@/shared/query-client";
import { useQuery } from "@tanstack/react-query";

export const BacklogPage = () => {
  const {dispatch} = useProjectStore();
  // const { state } = useProjectStore();
  const [isAddSprintModalOpen, setIsAddSprintModalOpen] = useState(false);
  const [isAddUserStoryModalOpen, setIsAddUserStoryModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  // Load sample data on component mount
  // useEffect(() => {
  //   if (state.sprints.size === 0) {
  //     // Load sample sprints
  //     const sampleSprints = [
  //       {
  //         id: "sprint1",
  //         name: "Sprint 1",
  //         start_date: "2024-01-01",
  //         end_date: "2024-01-14",
  //         user_story_total: 3,
  //       },
  //       {
  //         id: "sprint2", 
  //         name: "Sprint 2",
  //         start_date: "2024-01-15",
  //         end_date: "2024-01-28",
  //         user_story_total: 2,
  //       },
  //     ];
  //     dispatch({ type: "SET_SPRINTS", payload: sampleSprints });

  //     // Load sample user stories
  //     const sampleUserStories = [
  //       {
  //         sprintId: "sprint1",
  //         userStories: [
  //           {
  //             id: "us1",
  //             sprintId: "sprint1",
  //             title: "User Story 1",
  //             description: "As a user, I want to...",
  //             priority: "high" as const,
  //             points: 5,
  //             creator: "John Doe",
  //           },
  //           {
  //             id: "us2",
  //             sprintId: "sprint1", 
  //             title: "User Story 2",
  //             description: "As a user, I want to...",
  //             priority: "medium" as const,
  //             points: 3,
  //             creator: "Jane Smith",
  //           },
  //         ]
  //       },
  //       {
  //         sprintId: "sprint2",
  //         userStories: [
  //           {
  //             id: "us3",
  //             sprintId: "sprint2",
  //             title: "User Story 3", 
  //             description: "As a user, I want to...",
  //             priority: "low" as const,
  //             points: 2,
  //             creator: "Bob Johnson",
  //           },
  //         ]
  //       }
  //     ];
  //     dispatch({ type: "SET_USER_STORIES", payload: sampleUserStories });

  //     // Load sample tasks
  //     const sampleTasks = [
  //       {
  //         userStoryId: "us1",
  //         tasks: [
  //           {
  //             id: "t1",
  //             userStoryId: "us1",
  //             title: "Task 1",
  //             description: "Implement feature A",
  //             priority: "high",
  //             assignee: "John Doe",
  //           },
  //           {
  //             id: "t2", 
  //             userStoryId: "us1",
  //             title: "Task 2",
  //             description: "Test feature A",
  //             priority: "medium",
  //             assignee: "Jane Smith",
  //           },
  //         ],
  //       },
  //       {
  //         userStoryId: "us2",
  //         tasks: [
  //           {
  //             id: "t3",
  //             userStoryId: "us2", 
  //             title: "Task 3",
  //             description: "Implement feature B",
  //             priority: "low",
  //             assignee: "Bob Johnson",
  //           },
  //         ],
  //       },
  //     ];
  //     dispatch({ type: "SET_TASKS", payload: sampleTasks });
  //   }
  // }, [state.sprints.size, dispatch]);
  // const { getSprints } = useProjectStore();
  // useEffect(() => {
  //   // getSprints();
  // }, [getSprints]);
  const result = useQuery({
    queryKey: ['sprints'],
    queryFn: async () => {
      const response = await axiosClient.get('/sprints');
      return response.data;
    },
  });
  console.log(result);

  useEffect(() => {
    if (result.data) {
      dispatch({ type: "SET_SPRINTS", payload: result.data });
    }
  }, [result.data, dispatch]);

  return (
    <div>
      <AddSprintModal isOpen={isAddSprintModalOpen} onClose={() => setIsAddSprintModalOpen(false)} />
      {/* header */}
      <div className="px-6 flex items-center justify-between mt-2">
        <div>
          <h1 className="text-2xl font-bold">Backlog</h1>
          <p className="text-base text-gray-500">
            Manage user stories, sprints and tasks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="px-4 py-2rounded-md" onClick={() => setIsAddSprintModalOpen(true)}>
            <IconPlus className="mr-2" />
            Create Sprint
          </Button>
          <Button 
            variant="outline" 
            className="px-4 py-2rounded-md"
            onClick={() => setIsAddTaskModalOpen(true)}
          >
            <IconPlus className="mr-2" />
            Add Task
          </Button>
          <Button 
            className="px-4 py-2rounded-md"
            onClick={() => setIsAddUserStoryModalOpen(true)}
          >
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
        <SprintList />
      </div>

      {/* Modals */}
      <AddSprintModal 
        isOpen={isAddSprintModalOpen} 
        onClose={() => setIsAddSprintModalOpen(false)} 
      />
      <AddTaskModal 
        isOpen={isAddTaskModalOpen} 
        onClose={() => setIsAddTaskModalOpen(false)} 
      />
      <AddUserStoryModal 
        isOpen={isAddUserStoryModalOpen} 
        onClose={() => setIsAddUserStoryModalOpen(false)} 
      />
    </div>
  );
};
