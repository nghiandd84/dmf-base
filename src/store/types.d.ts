import { Epic } from 'redux-observable';
import { ActionType, StateType } from 'typesafe-actions';

declare module 'dmf-base' {
  export type Store = StateType<typeof import('./index').default>;

  export type RootState = StateType<typeof import('./root-reducer').default>;

  export type RootAction = ActionType<typeof import('./root-action').default>;
  export type RootEpic = Epic<RootAction, RootAction, RootState, Services>;
}
