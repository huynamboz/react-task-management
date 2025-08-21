import { useContext, useCallback } from 'react';
import { StateContext, DispatchContext } from './contexts';
import type { State } from './types';

export const useProjectStore = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  if (!state || !dispatch) {
    throw new Error('useProjectStore must be used within a ProjectProvider');
  }

  const selectSprint = useCallback((sprintId: string | null) => {
    dispatch({ type: 'SELECT_SPRINT', payload: sprintId });
  }, [dispatch]);

  const selectUserStory = useCallback((userStoryId: string | null) => {
    dispatch({ type: 'SELECT_USER_STORY', payload: userStoryId });
  }, [dispatch]);

  const setFilter = useCallback((filter: Partial<State['filters']>) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, [dispatch]);

  const selectedSprint = state.ui.selectedSprintId ? state.sprints.get(state.ui.selectedSprintId) : null;
  const selectedUserStory = state.ui.selectedSprintId && state.ui.selectedUserStoryId 
    ? state.userStories.get(state.ui.selectedSprintId)?.find(us => us.id === state.ui.selectedUserStoryId)
    : null;

  return {
    dispatch,
    sprints: Array.from(state.sprints.values()),
    userStories: state.userStories,
    tasks: state.tasks,
    selectedSprint,
    selectedUserStory,
    filters: state.filters,
    
    selectSprint,
    selectUserStory,
    setFilter,
  };
};