import { useContext } from 'react';
import { StateContext, DispatchContext } from './contexts';

export function useProjectState() {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useProjectState must be used within a ProjectProvider');
  }
  return context;
}

export function useProjectDispatch() {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useProjectDispatch must be used within a ProjectProvider');
  }
  return context;
}