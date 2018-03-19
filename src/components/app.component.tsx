import * as React from 'react';
import * as Immutable from 'Immutable';
import GameFieldStore, { GameState } from '../stores/game-field.store';
import * as GameFieldActions from '../actions/game-field.actions';
import { GameCell } from '../models/game-cell.model';
import { GameFieldRow } from '../containers/game-field-row';
import { ControlPannel } from '../containers/contol-pannel';

import './app.component.scss';
import { INITIAL_GAME_FIELD_SIZE } from '../five-in-a-row.cfg';
import { GameResultModal } from '../containers/game-result-modal';


export interface AppContainerProps { compiler: string; framework: string; }

export class AppComponent extends React.Component<AppContainerProps, {gameSate: GameState}> {
    private listenerSubscription: { remove: Function };
    public arr: Immutable.Map<number, GameCell>[] = [];
    public vievEls: Element[];
    constructor(props: AppContainerProps) {
        super(props);
        this.state = {
            gameSate: GameFieldStore.getState(),
        }
    }
    public componentDidMount() {
        this.listenerSubscription = GameFieldStore.addListener(this.handleStateChange.bind(this));
    }
    public componentWillUnmount() {
        this.listenerSubscription.remove();
    }
    public handleStateChange() {
        const state = {
            gameSate: GameFieldStore.getState(),
        }
        this.setState(state);
    }
    public onCellClick(cell: GameCell) {
        GameFieldActions.onCellClick(cell);
    }
    public drawModal() {
        if (this.state.gameSate.game.isGameEnded) {
            return <GameResultModal isWinnerModal={this.state.gameSate.game.isPlayerWins} />
        }
        return '';
    }
    
    render() {
        const { gameField } = this.state.gameSate;
        

        return <div className="game-view-port">
            <ControlPannel />
            <div className='game-field-scroll-port'>
                <div className='game-field'>
                    {
                        gameField.valueSeq().map((row, i) =>
                            <GameFieldRow rowData={row} key={i.toString()} onCellClick={this.onCellClick.bind(this)} />
                        )
                    }
                </div>
                { this.drawModal() }
            </div>
        </div>
    }
}