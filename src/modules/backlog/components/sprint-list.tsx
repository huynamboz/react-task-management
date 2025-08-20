
import { SprintItem } from "./sprint-item";
import { useProjectState } from "@/store/hooks";

export const SprintList = () => {
  const state = useProjectState();
  const sprints = Array.from(state.sprints.values());

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
