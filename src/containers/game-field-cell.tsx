import * as React from 'react';
import { GameCell } from '../models/game-cell.model';

import './game-field-cell.scss';

export interface GameFieldCellProps {
    cellData: GameCell;
    onCellClick: (cell: GameCell) => void
}

export class GameFieldCell extends React.Component<GameFieldCellProps, {}> {
    constructor(props: GameFieldCellProps) {
        super(props);
    }

    public onCellClick() {
        if (this.props.cellData.value !== 0) {
            return;
        }
        this.props.onCellClick(this.props.cellData);
    }

    public cellTypeClass(cellType: 0 | 1 | 2): string {
        if (cellType === 0) {
            return 'empty';
        }
        return cellType === 1 ? 'x' : 'o';
    }

    public shouldComponentUpdate(nextParams: GameFieldCellProps, nextState: null) {
        return this.props.cellData !== nextParams.cellData;
    }

    render() {
        return <div className={'cell ' + this.cellTypeClass(this.props.cellData.value) } onClick={this.onCellClick.bind(this)}>
            <div className='turn-number'>{this.props.cellData.turn || ''}</div>
        </div>
    }
}