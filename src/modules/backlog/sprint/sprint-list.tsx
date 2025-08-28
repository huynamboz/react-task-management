
import { SprintItem } from "./sprint-item";
import { useBacklogListDispatch, useBacklogListState } from "@/modules/backlog/backlog-store";
import type { Sprint } from "../shared/sprint/sprint-api-client";
import { useEffect } from "react";
import { sprintApiClient } from "../shared/sprint/sprint-api-client";

export const SprintList = () => {
  const dispatch = useBacklogListDispatch();
  const { sprints } = useBacklogListState();
  const sprintList = Array.from(sprints.values());

  useEffect(() => {
    sprintApiClient.getAll().then((sprints) => {
      console.log(sprints);
      dispatch({ type: "SET_SPRINTS", payload: sprints });
    });
  }, []);

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
