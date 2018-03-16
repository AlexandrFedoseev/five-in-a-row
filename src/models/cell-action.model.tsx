import { Action } from "./action.model";
import { ActionType } from "./action.type";
import { GameCell } from "./game-cell.model";

export class CellAction extends Action {
    constructor(type: ActionType, public cell: GameCell) {
        super(type);
    }
}