import type { State, Action } from './types';

export function projectReducer(state: State, action: Action): State {
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
