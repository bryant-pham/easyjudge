import { user } from './user.reducer';
import { admin } from './admin.reducer';
import { scoresheets } from './scoresheets.reducer';
import { event } from './event.reducer';

export const REDUCERS = {
   user: user,
   admin: admin,
   event: event,
   scoresheets: scoresheets
};
