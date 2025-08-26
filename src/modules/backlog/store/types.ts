export type Sprint = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  userStoryTotal: number;
};

export type UserStory = {
  id: string;
  title: string;
  description: string;
  priorityId: string;
  point: number;
  sprintId: string | null;
  tags: string[];
  creator?: string;
};

// Legacy type for backward compatibility
export type LegacyUserStory = {
  id: string;
  sprintId: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  points: number;
  creator: string;
};

export type Task = {
  id: string;
  userStoryId: string;
  title: string;
  description: string;
  priority: string;
  assignee: string;
};

export type State = {
  sprints: Map<string, Sprint>;
  userStories: Map<string, UserStory[]>;
  tasks: Map<string, Task[]>;
  filters: {
    search: string;
    priority: "all" | "high" | "medium" | "low";
    assignee: "all" | string;
  };
  ui: {
    selectedSprintId: string | null;
    selectedUserStoryId: string | null;
  };
};

export type Action =
  | { type: "SET_SPRINTS"; payload: Sprint[] }
  | { type: "SET_USER_STORIES"; payload: { sprintId: string; userStories: UserStory[] }[] }
  | { type: "SET_USER_STORIES_BY_SPRINT_ID"; payload: { sprintId: string; userStories: UserStory[] } }
  | { type: "SET_TASKS"; payload: { userStoryId: string; tasks: Task[] }[] }
  | { type: "SELECT_SPRINT"; payload: string | null }
  | { type: "SELECT_USER_STORY"; payload: string | null }
  | { type: "SET_FILTER"; payload: Partial<State["filters"]> }
  | { type: "ADD_SPRINT"; payload: Sprint }
  | { type: "UPDATE_SPRINT"; payload: Sprint }
  | { type: "DELETE_SPRINT"; payload: string }
  | { type: "ADD_USER_STORY"; payload: { sprintId: string; userStory: UserStory } }
  | { type: "UPDATE_USER_STORY"; payload: { sprintId: string; userStory: UserStory } }
  | { type: "DELETE_USER_STORY"; payload: { sprintId: string; userStoryId: string } }
  | { type: "ADD_TASK"; payload: { userStoryId: string; task: Task } }
  | { type: "UPDATE_TASK"; payload: { userStoryId: string; task: Task } }
  | { type: "DELETE_TASK"; payload: { userStoryId: string; taskId: string } };
