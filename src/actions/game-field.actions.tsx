import dispatcher from '../five-in-a-row.dispatcher';
import { GameCell } from '../models/game-cell.model';
import { CellAction } from '../models/cell-action.model';
import { SimpleAction } from '../models/simple-action.model';

export function onCellClick(cell: GameCell): void {
    dispatcher.dispatch(new CellAction('CELL_CLICK', cell))
}

export function initState(): void {
    dispatcher.dispatch(new SimpleAction('START_LOAD'))
}