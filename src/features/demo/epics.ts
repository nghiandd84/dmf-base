import { demoAction } from './actions';
import { Epic } from 'redux-observable';
import { filter, tap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootAction, RootState, Services } from 'dmf-base';

export const demoEpic: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  state$,
  { logger }
) =>
  action$.pipe(
    filter(isActionOf(demoAction)),
    tap(() => console.log('TODO Some thing here'))
  );
