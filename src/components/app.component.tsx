import * as React from 'react';
import * as Immutable from 'Immutable';
import GameFieldStore, { GameFieldState } from '../stores/game-field.store';
import * as GameFieldActions from '../actions/game-field.actions';
import { GameCell } from '../models/game-cell.model';
import { GameFieldRow } from '../containers/game-field-row';

import './app.component.scss';

export interface AppContainerProps { compiler: string; framework: string; }

export class AppComponent extends React.Component<AppContainerProps, {gameField: GameFieldState}> {
    constructor(props: AppContainerProps) {
        super(props);
        this.state = {
            gameField: GameFieldStore.getState()
        };
        console.log(this.state);
    }

    public onCellClick(cell: GameCell) {
        GameFieldActions.onCellClick(cell);
    }

    render() {
        const { gameField } = this.state;

        const rowItems: any[] = [];
        gameField.forEach((row, i) => {
            rowItems.push(
                <GameFieldRow rowData={row} key={i} onCellClick={this.onCellClick.bind(this)} />
            );
        });
        console.log(rowItems);
        return <div className="gameField">
            { rowItems }
        </div>
    }
}