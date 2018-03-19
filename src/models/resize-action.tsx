import { Action } from "./action.model";
import { ActionType } from "./action.type";

export class ResizeAction extends Action {
    constructor(type: 'RESIZE_FIELD', public size: number) {
        super(type);
    }
}