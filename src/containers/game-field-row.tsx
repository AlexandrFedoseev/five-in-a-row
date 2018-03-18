import * as React from 'react';
import * as Immutable from 'Immutable';
import { GameCell } from '../models/game-cell.model';
import { GameFieldCell } from './game-field-cell';

export interface GameFieldRowProps {
    rowData: Immutable.Map<number, GameCell>;
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

    public shouldComponentUpdate(nextParams: GameFieldRowProps, nextState: any) {
        return this.props.rowData !== nextParams.rowData;
    }

    render() {
        return <div className='row'>
            {
                this.props.rowData.valueSeq().map((cell, i) => 
                    <GameFieldCell cellData={cell} key={i} onCellClick={this.onCellClick.bind(this)} />
                )
            }
        </div>
    }
}