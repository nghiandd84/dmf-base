import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import demoReducer from '../features/demo/reducer';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    todos: demoReducer,
  });

export default rootReducer;
