import { Button } from "@/components/ui/button";

import { IconPlus } from "@tabler/icons-react";
import { FilterBox } from "./components/fillter-box";
import { SprintList } from "./components/sprint-list";

export const BacklogPage = () => {
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
        <SprintList />
      </div>
    </div>
  );
};
