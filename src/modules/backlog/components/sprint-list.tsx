import type { Sprint } from "../types/backlog-types";
import { SprintItem } from "./sprint-item";

export const SprintList = ({ sprints }: { sprints: Sprint[] }) => {
  return (
    <div>
      <div className="flex flex-col gap-6">
        {sprints.map((sprint) => (
          <SprintItem key={sprint.id} sprint={sprint} />
        ))}
      </div>
    </div>
  );
};
