import { createContext } from 'react';
import type { State, Action } from './types';

export const StateContext = createContext<State | undefined>(undefined);
export const DispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);
