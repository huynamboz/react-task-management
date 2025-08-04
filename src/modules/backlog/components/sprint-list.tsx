import { SprintItem } from "./sprint-item";


export const SprintList = () => {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <SprintItem />
      <SprintItem />
      </div>
    </div>
  );
};
