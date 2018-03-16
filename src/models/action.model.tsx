import { GameCell } from "./game-cell.model";
import { ActionType } from "./action.type";

export abstract class Action {
    public cell?: GameCell;

    constructor(public type: ActionType) {

    }
}