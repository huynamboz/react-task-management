/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Sprint } from './shared/sprint/sprint-api-client';

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


const initialState: State = {
  sprints: new Map(),
  userStories: new Map(),
  tasks: new Map(),
  filters: {
    search: "",
    priority: "all",
    assignee: "all",
  },
  ui: {
    selectedSprintId: null,
    selectedUserStoryId: null,
  },
};


const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_SPRINTS":
      return {
        ...state,
        sprints: new Map(action.payload.map(s => [s.id, s])),
      };

    case "SET_USER_STORIES":
      return {
        ...state,
        userStories: new Map(action.payload.map(({ sprintId, userStories }) => [sprintId, userStories])),
      };

    case "SET_USER_STORIES_BY_SPRINT_ID":
      return {
        ...state,
        userStories: new Map(state.userStories).set(action.payload.sprintId, action.payload.userStories),
      };

    case "SET_TASKS":
      return {
        ...state,
        tasks: new Map(action.payload.map(({ userStoryId, tasks }) => [userStoryId, tasks])),
      };

    case "SELECT_SPRINT":
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedSprintId: action.payload,
          selectedUserStoryId: null, // reset khi đổi sprint
        },
      };

    case "SELECT_USER_STORY":
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedUserStoryId: action.payload,
        },
      };

    case "SET_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    case "ADD_SPRINT":
      return {
        ...state,
        sprints: new Map(state.sprints).set(action.payload.id, action.payload),
      };

    case "UPDATE_SPRINT":
      return {
        ...state,
        sprints: new Map(state.sprints).set(action.payload.id, action.payload),
      };

    case "DELETE_SPRINT":
      {const newSprints = new Map(state.sprints);
      newSprints.delete(action.payload);
      return {
        ...state,
        sprints: newSprints,
      };}

    case "ADD_USER_STORY":
      {const currentUserStories = state.userStories.get(action.payload.sprintId) || [];
      return {
        ...state,
        userStories: new Map(state.userStories).set(action.payload.sprintId, [
          ...currentUserStories,
          action.payload.userStory,
        ]),
      };}

    case "UPDATE_USER_STORY":
      {const userStoriesToUpdate = state.userStories.get(action.payload.sprintId) || [];
      const updatedUserStories = userStoriesToUpdate.map(userStory =>
        userStory.id === action.payload.userStory.id ? action.payload.userStory : userStory
      );
      return {
        ...state,
        userStories: new Map(state.userStories).set(action.payload.sprintId, updatedUserStories),
      };}

    case "DELETE_USER_STORY":
      {const userStoriesToDelete = state.userStories.get(action.payload.sprintId) || [];
      const filteredUserStories = userStoriesToDelete.filter(userStory => userStory.id !== action.payload.userStoryId);
      return {
        ...state,
        userStories: new Map(state.userStories).set(action.payload.sprintId, filteredUserStories),
      };}

    case "ADD_TASK":
      {const currentTasks = state.tasks.get(action.payload.userStoryId) || [];
      return {
        ...state,
        tasks: new Map(state.tasks).set(action.payload.userStoryId, [
          ...currentTasks,
          action.payload.task,
        ]),
      };}

    case "UPDATE_TASK":
      {const tasksToUpdate = state.tasks.get(action.payload.userStoryId) || [];
      const updatedTasks = tasksToUpdate.map(task =>
        task.id === action.payload.task.id ? action.payload.task : task
      );
      return {
        ...state,
        tasks: new Map(state.tasks).set(action.payload.userStoryId, updatedTasks),
      };}

    case "DELETE_TASK":
      {const tasksToDelete = state.tasks.get(action.payload.userStoryId) || [];
      const filteredTasks = tasksToDelete.filter(task => task.id !== action.payload.taskId);
      return {
        ...state,
        tasks: new Map(state.tasks).set(action.payload.userStoryId, filteredTasks),
      };}

    default:
      return state;
  }
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// Hooks
export const useBacklogListState = () => {
  const context = useContext(StateContext);
  if (!context) throw new Error("useBacklogListState must be used within BacklogListProvider");
  return context;
};

export const useBacklogListDispatch = () => {
  const context = useContext(DispatchContext);
  if (!context) throw new Error("useBacklogListDispatch must be used within BacklogListProvider");
  return context;
};