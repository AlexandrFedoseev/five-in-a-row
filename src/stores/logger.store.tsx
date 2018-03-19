import { Action } from '../models/action.model';
import { ReduceStore } from 'flux/utils';
import Dispatcher from '../five-in-a-row.dispatcher';

const DEBUG = false;

class LoggerStore extends ReduceStore<null, Action> {
    constructor() {
        super(Dispatcher);
    }

    public getInitialState(): null {
        return null;
    }

    public reduce(state: null, action: Action): null {
        this.writeLog(action);
        return state;
    }

    private writeLog(action: Action): void {
        if (DEBUG) {
            console.info(action);
        }
    }

}

export default new LoggerStore();