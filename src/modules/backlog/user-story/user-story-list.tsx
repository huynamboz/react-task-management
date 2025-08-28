// import { useProjectState } from "@/store/hooks";
import { useBacklogListState } from "@/modules/backlog/backlog-store";
import { UserStoryItem } from "./user-story-item";

type UserStoryListProps = {
  sprintId: string
}

export const UserStoryList = ({ sprintId }: UserStoryListProps) => {
  const { userStories } = useBacklogListState();
  const userStoriesBySprintId = userStories.get(sprintId) || [];

  return (
    <div>
      <div className="flex flex-col gap-6">
        {userStoriesBySprintId.map((userStory) => (
          <UserStoryItem key={userStory.id} userStory={userStory} />
        ))}
      </div>
    </div>
  );
};
