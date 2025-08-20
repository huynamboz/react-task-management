import { useProjectState } from "@/store/hooks";
import { UserStoryItem } from "./user-story-item";

type UserStoryListProps = {
  sprintId: string
}

export const UserStoryList = ({ sprintId }: UserStoryListProps) => {
  const state = useProjectState();
  const userStories = state.userStories.get(sprintId) || [];

  return (
    <div>
      <div className="flex flex-col gap-6">
        {userStories.map((userStory) => (
          <UserStoryItem key={userStory.id} userStory={userStory} />
        ))}
      </div>
    </div>
  );
};
