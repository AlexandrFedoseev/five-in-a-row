import * as React from 'react';
import { GameCell } from '../models/game-cell.model';

import './game-field-cell.scss';

export interface GameFieldCellProps {
    cellData: GameCell;
    key: number;
    onCellClick: (cell: GameCell) => void
}

export class GameFieldCell extends React.Component<GameFieldCellProps, {}> {
    constructor(props: GameFieldCellProps) {
        super(props);
    }

    public onCellClick() {
        this.props.onCellClick(this.props.cellData);
    }

    render() {
        return <span onClick={this.onCellClick.bind(this)}>
            {this.props.cellData.value}
        </span>
    }
}