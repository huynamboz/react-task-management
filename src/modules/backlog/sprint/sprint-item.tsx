import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconBook,
  IconCalendarEvent,
  IconChevronDown,
  IconDots,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { UserStoryList } from "@/modules/backlog/user-story/user-story-list";
import { useState } from "react";
import { CircleCheckBig } from "lucide-react";
import type { Sprint } from "@/modules/backlog/shared/sprint/sprint-api-client";
import { useBacklogListDispatch } from "@/modules/backlog/backlog-store";
import { userStoryApiClient } from "../shared/user-story/userstory-api-client";

type SprintItemProps = {
  sprint: Sprint
}
export const SprintItem = ({ sprint }: SprintItemProps) => {
  const [isShowUserStories, setIsShowUserStories] = useState(false);
  const [isSprintStarted, setIsSprintStarted] = useState(false);
  const [isSprintCompleted, setIsSprintCompleted] = useState(false);
  const dispatch = useBacklogListDispatch();

  const markSprintAsCompleted = () => {
    setIsSprintCompleted(true);
  };

  const toggleSprint = () => {
    setIsSprintStarted(!isSprintStarted);
  };

  const toggleUserStories = async () => {
    if (!isShowUserStories) {
      const userStories = await userStoryApiClient.getAll();
      console.log(userStories);
      dispatch({
        type: "SET_USER_STORIES_BY_SPRINT_ID",
        payload: {
          sprintId: sprint.id,
          userStories: userStories.filter(us => us.sprintId === sprint.id),
        },
      });
    }
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
                {sprint.name}
              </p>
              <Badge
                variant="secondary"
                className={`${isSprintCompleted ? "bg-slate-100 text-slate-600" : "bg-blue-100 text-blue-800 hover:bg-opacity-90"}`}
              >
                {isSprintCompleted ? "Completed" : "Planning"}
              </Badge>
            </div>

            <div className="mt-1 flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <IconCalendarEvent size={18} />
                <p>{sprint.startDate} - {sprint.endDate}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <IconBook size={18} />
                {/* <p>{sprint.userStoryTotal} stories</p> */}
              </div>
            </div>
          </div>
        </div>

        {/* Left */}
        <div>
          {!isSprintStarted && (
            <Button className="mr-2 h-8" onClick={toggleSprint}>
              <IconPlayerPlay />
              Start Sprint
            </Button>
          )}

           {isSprintStarted && !isSprintCompleted && (
            <Button variant="outline" className="mr-2 h-8" onClick={markSprintAsCompleted}>
              <CircleCheckBig />
              Complete Sprint
            </Button>
          )}

          <Button variant="ghost">
            <IconDots />
          </Button>
        </div>
      </div>

      {/* User Stories Section */}
      {isShowUserStories && (
        <div className="pt-8 pl-12 pr-4">
          <UserStoryList sprintId={sprint.id} />
        </div>
      )}
    </div>
  );
};
