import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconBook,
  IconCalendarEvent,
  IconChevronDown,
  IconDots,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { UserStoryList } from "./user-story-list";
import { useState } from "react";

export const SprintItem = () => {
  const [isShowUserStories, setIsShowUserStories] = useState(false);

  const toggleUserStories = () => {
    setIsShowUserStories(!isShowUserStories);
  };
  return (
    <div>
      <div className="border p-4 rounded-md flex items-center justify-between">
        {/* Right */}
        <div className="flex items-center">
          <Button variant="ghost" className="mr-2" onClick={toggleUserStories}>
            {isShowUserStories ? (
              <IconChevronDown />
            ) : (
              <IconChevronDown className="-rotate-90" />
            )}
          </Button>

          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold">
                Sprint 1 - Authentication & Dashboard
              </p>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 dark:bg-blue-600"
              >
                Planning
              </Badge>
            </div>

            <div className="mt-1 flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <IconCalendarEvent size={18} />
                <p>2/1/2024 - 2/14/2024</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <IconBook size={18} />
                <p>1 stories</p>
              </div>
            </div>
          </div>
        </div>

        {/* Left */}
        <div>
          <Button className="mr-2">
            <IconPlayerPlay />
            Start Sprint
          </Button>

          <Button variant="ghost">
            <IconDots />
          </Button>
        </div>
      </div>

      {/* User Stories Section */}
      {isShowUserStories && (
        <div className="pt-8 pl-12 pr-4">
          <UserStoryList />
        </div>
      )}
    </div>
  );
};
