import { Dispatcher } from 'flux';
import { Action } from './models/action.model';

const dispatcher: Dispatcher<Action> = new Dispatcher();

export default dispatcher;