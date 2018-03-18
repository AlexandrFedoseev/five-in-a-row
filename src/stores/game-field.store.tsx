import { ReduceStore } from 'flux/utils';
import * as Flux from 'flux';
import * as Immutable from 'Immutable';
import Dispatcher from '../five-in-a-row.dispatcher';
import { AI } from '../ai/ai';

import { GameCell } from '../models/game-cell.model';
import { INITIAL_GAME_FIELD_SIZE } from '../five-in-a-row.cfg';
import { Action } from '../models/action.model';
import { SimpleAction } from '../models/simple-action.model';

export type GameFieldState = Immutable.Map<number, Immutable.Map<number, GameCell>>;

class GameFieldStore extends ReduceStore<GameFieldState, Action> {
    public gameField: GameFieldState;
    private userPlays: 1 | 2 = 1;
    private turn = 1;

    private _ai: AI;

    constructor(dispatcher: Flux.Dispatcher<Action>) {
        super(dispatcher);
        this._ai = new AI();
    }

    public getInitialState(): GameFieldState {
        let map: GameFieldState = Immutable.Map();
        for (let i = 0; i < INITIAL_GAME_FIELD_SIZE; i++) {
            for (let j = 0; j < INITIAL_GAME_FIELD_SIZE; j++) {
                map = map.setIn([i, j], new GameCell(i, j, 0, null));
            }
        }
        return map;
    }



    public reduce(state: GameFieldState, action: Action): GameFieldState {

        switch(action.type) {
            case 'CELL_CLICK': {
                let newState = state.setIn(
                    [action.cell.x, action.cell.y], new GameCell(action.cell.x, action.cell.y, this.userPlays, this.turn++)
                );
                const aiTurn = this._ai.takeTurn(action.cell.x, action.cell.y, this.userPlays);
                
                if (this._ai.checkIfWinner(action.cell.x, action.cell.y, this.userPlays)) {
                    console.log('User wins');
                } else {
                    newState = newState.setIn(
                        [aiTurn.row, aiTurn.col], new GameCell(aiTurn.row, aiTurn.col, aiTurn.val, this.turn++)
                    );
                    if (this._ai.checkIfWinner(aiTurn.row, aiTurn.col, aiTurn.val)) {
                        console.log('Ai wins');
                    }
                }
                return newState;
            }
            default: {
                return state;
            }
        }
        
    }

}
export default new GameFieldStore(Dispatcher);

