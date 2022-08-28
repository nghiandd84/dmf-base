import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { demoAction } from './actions';


export const isLoadingDemo = createReducer<boolean>(false as boolean)
  .handleAction([demoAction], (state, action) => true);
  
const demoReducer = combineReducers<{
  isLoadingDemo: boolean
}>({
  isLoadingDemo
});

export default demoReducer;
export type TodosState = ReturnType<typeof demoReducer>;
