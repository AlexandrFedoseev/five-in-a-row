import * as React from 'react';
import * as Immutable from 'Immutable';
import GameFieldStore, { GameFieldState } from '../stores/game-field.store';
import * as GameFieldActions from '../actions/game-field.actions';
import { GameCell } from '../models/game-cell.model';
import { GameFieldRow } from '../containers/game-field-row';

import './app.component.scss';
import { INITIAL_GAME_FIELD_SIZE } from '../five-in-a-row.cfg';

export interface AppContainerProps { compiler: string; framework: string; }

export class AppComponent extends React.Component<AppContainerProps, {gameField: GameFieldState}> {
    private listenerSubscription: { remove: Function };
    public arr: Immutable.Map<number, GameCell>[] = [];
    public vievEls: Element[];
    constructor(props: AppContainerProps) {
        super(props);
        this.state = {
            gameField: GameFieldStore.getState()
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
            gameField: GameFieldStore.getState()
        }
        this.setState(state);
    }
    public onCellClick(cell: GameCell) {
        GameFieldActions.onCellClick(cell);
    }
    public onRestartClick() {
        GameFieldActions.onRestartGame();
    }
    public onSizeChange(size: number) {
        GameFieldActions.onSizeChange(size);
    }

    render() {
        const { gameField } = this.state;

        return <div className="game-view-port">
            <div className='gameField'>
            {
                gameField.valueSeq().map((row, i) =>
                    <GameFieldRow rowData={row} key={i.toString()} onCellClick={this.onCellClick.bind(this)} />
                )
            }
            </div>
            <button onClick={this.onRestartClick.bind(this)}>Restart</button>
            <button onClick={this.onSizeChange.bind(this, [10])}>Size 10</button>
            <button onClick={this.onSizeChange.bind(this, [15])}>Size 15</button>
            <button onClick={this.onSizeChange.bind(this, [20])}>Size 20</button>
            <button onClick={this.onSizeChange.bind(this, [25])}>Size 25</button>
        </div>
    }
}