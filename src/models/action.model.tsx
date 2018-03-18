import { GameCell } from "./game-cell.model";
import { ActionType } from "./action.type";

export abstract class Action {
    public cell?: GameCell;
    public size?: number;

    constructor(public type: ActionType) {

    }
}