
import { SprintItem } from "./sprint-item";
import { useProjectStore } from "@/store";

export const SprintList = () => {
  const { sprints } = useProjectStore();
  console.log(sprints);
  // const sprints = Array.from(state.sprints.values());

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
