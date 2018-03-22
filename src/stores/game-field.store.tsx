import { ReduceStore } from 'flux/utils';
import * as Flux from 'flux';
import * as Immutable from 'Immutable';
import Dispatcher from '../five-in-a-row.dispatcher';
import { AI } from '../ai/ai';

import { GameCell } from '../models/game-cell.model';
import { INITIAL_GAME_FIELD_SIZE } from '../five-in-a-row.cfg';
import { Action } from '../models/action.model';

export type GameFieldState = Immutable.Map<number, Immutable.Map<number, GameCell>>
export type GameState = {
    gameField: GameFieldState
    game: {
        isGameEnded: boolean,
        isPlayerWins: boolean
    }
};

class GameFieldStore extends ReduceStore<GameState, Action> {
    public gameField: GameState;
    private userPlays: 1 | 2 = 1;
    private turn = 1;
    private fieldSize = 15;

    private _ai: AI;

    constructor(dispatcher: Flux.Dispatcher<Action>) {
        super(dispatcher);
        this._ai = new AI(this.fieldSize, this.opposite(this.userPlays));
    }

    public getInitialState(size?: number): GameState {
        size = size == null ? INITIAL_GAME_FIELD_SIZE : size;
        let map: GameFieldState = Immutable.Map();
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                map = map.setIn([i, j], new GameCell(i, j, 0, null));
            }
        }
        let state = {
            gameField: map,
            game: {
                isGameEnded: false,
                isPlayerWins: false
            }
        }
        return state;
    }



    public reduce(state: GameState, action: Action): GameState {

        switch(action.type) {
            case 'CELL_CLICK': {
                let newState = state.gameField.setIn(
                    [action.cell.x, action.cell.y], new GameCell(action.cell.x, action.cell.y, this.userPlays, this.turn++)
                );
                const aiTurn = this._ai.takeTurn(action.cell.x, action.cell.y, this.userPlays);
                
                if (this._ai.checkIfWinner(action.cell.x, action.cell.y, this.userPlays)) {
                    'player wins'
                    state.game.isGameEnded = true;
                    state.game.isPlayerWins = true;
                } else {
                    newState = newState.setIn(
                        [aiTurn.row, aiTurn.col], new GameCell(aiTurn.row, aiTurn.col, aiTurn.val, this.turn++)
                    );
                    if (this._ai.checkIfWinner(aiTurn.row, aiTurn.col, aiTurn.val)) {
                        'ai wins'
                        state.game.isGameEnded = true;
                        state.game.isPlayerWins = false;
                    }
                }
                return {
                    gameField: newState,
                    game: {
                        isGameEnded: state.game.isGameEnded,
                        isPlayerWins: state.game.isPlayerWins
                    }
                };
            }
            case 'RESTART_GAME': {
                return this.makeNewGameState();
            }
            case 'RESIZE_FIELD': {
                this.fieldSize = action.size;
                return this.makeNewGameState();
            }
            case 'CHANGE_SIDE': {
                this.userPlays = this.opposite(this.userPlays);
                return this.makeNewGameState();
            }
            default: {
                return state;
            }
        }
        
    }

    private makeNewGameState(): GameState {
        this.turn = 1;
        this._ai.init(this.fieldSize, this.opposite(this.userPlays));
        let newState = this.getInitialState(this.fieldSize);
        if (this.userPlays === 2) {
            newState = this.takeFirstAiTurn(newState);
        }
        return newState;
    }

    private takeFirstAiTurn(state: GameState): GameState {
        const aiTurn = this._ai.takeTurn(null, null, this.userPlays);
        state.gameField = state.gameField.setIn(
            [aiTurn.row, aiTurn.col], new GameCell(aiTurn.row, aiTurn.col, aiTurn.val, this.turn++)
        );
        return state;
    }
    private opposite(side: 1 | 2): 1 | 2 {
        return side === 1 ? 2 : 1;
    }

}
export default new GameFieldStore(Dispatcher);

