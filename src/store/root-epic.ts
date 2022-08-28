import { combineEpics } from 'redux-observable';

import * as demoEpics from '../features/demo/epics';

export default combineEpics(...Object.values(demoEpics));
