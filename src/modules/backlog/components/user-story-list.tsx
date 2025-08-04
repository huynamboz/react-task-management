import type { UserStory } from "../types/backlog-types";
import { UserStoryItem } from "./user-story-item";

type UserStoryListProps = {
  userStories: UserStory[]
}

export const UserStoryList = ({ userStories }: UserStoryListProps) => {
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
