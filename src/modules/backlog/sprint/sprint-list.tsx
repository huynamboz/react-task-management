
import { SprintItem } from "./sprint-item";
import { useBacklogListState } from "@/modules/backlog/backlog-store";
import type { Sprint } from "../backlog-store";

export const SprintList = () => {
  const { sprints } = useBacklogListState();
  const sprintList = Array.from(sprints.values());
  console.log(sprintList);
  return (
    <div>
      <div className="flex flex-col gap-6">
        {sprintList.map((sprint: Sprint) => (
          <SprintItem key={sprint.id} sprint={sprint} />
        ))}
      </div>
    </div>
  );
};
