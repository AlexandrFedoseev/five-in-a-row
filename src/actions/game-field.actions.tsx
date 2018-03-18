import dispatcher from '../five-in-a-row.dispatcher';
import { GameCell } from '../models/game-cell.model';
import { CellAction } from '../models/cell-action.model';
import { SimpleAction } from '../models/simple-action.model';
import { ResizeAction } from '../models/resize-action';

export function onCellClick(cell: GameCell): void {
    dispatcher.dispatch(new CellAction('CELL_CLICK', cell))
}

export function onRestartGame(): void {
    dispatcher.dispatch(new SimpleAction('RESTART_GAME'))
}

export function onSizeChange(size: number): void {
    dispatcher.dispatch(new ResizeAction('RESIZE_FIELD', size))
}


