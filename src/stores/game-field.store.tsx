import { ReduceStore } from 'flux/utils';
import * as Immutable from 'Immutable';
import Dispatcher from '../five-in-a-row.dispatcher';

import { GameCell } from '../models/game-cell.model';
import { INITIAL_GAME_FIELD_SIZE } from '../five-in-a-row.cfg';
import { Action } from '../models/action.model';
import { SimpleAction } from '../models/simple-action.model';

export type GameFieldState = Immutable.Map<number, Immutable.Map<number, GameCell>>;

class GameFieldStore extends ReduceStore<GameFieldState, Action> {
    public fieldSize: number;
    public gameField: GameFieldState;
    constructor() {
        super(Dispatcher);
        this.fieldSize = INITIAL_GAME_FIELD_SIZE;
    }

    public getInitialState(): GameFieldState {
        let map: GameFieldState = Immutable.Map();
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                map = map.setIn([i, j], new GameCell(i, j, 0));
            }
        }
        return map;
    }



    public reduce(state: GameFieldState, action: Action): GameFieldState {

        switch(action.type) {
            case 'CELL_CLICK': {
                console.log(action.cell);
                action.cell.value = 1;
                return state.setIn([action.cell.x, action.cell.y], action.cell);
            }
            default: {
                return state;
            }
        }
        
    }

}
export default new GameFieldStore();

