import { Button } from "@/components/ui/button";

import { IconPlus } from "@tabler/icons-react";
import { FilterBox } from "./backlog-header/filter-box";
import { AddSprintModal } from "./backlog-header/backlog-actions/add-sprint-modal";
import { AddUserStoryModal } from "./backlog-header/backlog-actions/add-user-story-modal";
import { AddTaskModal } from "./backlog-header/backlog-actions/add-task-modal";
import { useState } from "react";
import { SprintList } from "./sprint/sprint-list";

export const BacklogPage = () => {
  const [isAddSprintModalOpen, setIsAddSprintModalOpen] = useState(false);
  const [isAddUserStoryModalOpen, setIsAddUserStoryModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

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
