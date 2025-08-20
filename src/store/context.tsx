import { useReducer, type ReactNode } from 'react';
import type { State } from './types';
import { projectReducer } from './reducer';
import { StateContext, DispatchContext } from './contexts';

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

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
