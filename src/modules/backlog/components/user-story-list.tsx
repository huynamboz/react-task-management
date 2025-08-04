import { UserStoryItem } from "./user-story-item";


export const UserStoryList = () => {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <UserStoryItem />
      </div>
    </div>
  );
};
