import * as React from 'react';
import * as Immutable from 'Immutable';
import { GameCell } from '../models/game-cell.model';
import { GameFieldCell } from './game-field-cell';

export interface GameFieldRowProps {
    rowData: Immutable.Map<number, GameCell>;
    key: number
    onCellClick: (cell: GameCell) => void
}

import './game-field-row.scss';

export class GameFieldRow extends React.Component<GameFieldRowProps, {}> {
    constructor(props: GameFieldRowProps) {
        super(props);
    }

    public onCellClick(cell: GameCell) {
        this.props.onCellClick(cell);
    }

    render() {
        const cellItems: any[] = [];
        this.props.rowData.forEach((cell, i) => {
            cellItems.push(
                <GameFieldCell cellData={cell} key={i} onCellClick={this.onCellClick.bind(this)} />
            );
        });

        return <div className='row'>
            { cellItems }
        </div>
    }
}