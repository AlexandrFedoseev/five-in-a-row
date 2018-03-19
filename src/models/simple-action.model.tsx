import { Action } from './action.model';
import { ActionType } from './action.type';

export class SimpleAction extends Action {
    constructor(type: 'RESTART_GAME' |'CHANGE_SIDE') {
        super(type);
    }
}