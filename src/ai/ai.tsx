import { Weight } from "./models/weight.model";
import { Map } from "Immutable";
import { Coords } from "./models/coords.model";
import * as Utils from "../utils/utils";
import pattern from './pattern';

type PotentialMoves = Map<number, Map<number, Weight>>;

export class AI {
    private potentialMoves: PotentialMoves;
    private size: number;
    private aiSide: 1 | 2;
    private userSide: 1 | 2;
    private matrix: Array<Array<0 | 1 | 2>>;

    constructor(size: number, aiSide: 1 | 2) {
        this.init(size, aiSide);
    }

    public init(size: number, aiSide: 1 | 2) {
        this.size = size;
        this.aiSide = aiSide;
        this.userSide = aiSide === 1 ? 2 : 1;
        this.potentialMoves = Map<number, Map<number, Weight>>();
        this.matrix = this.makeNewGameMatrix(size);
        this.potentialMoves = this.setFirstPotentialMove(size);
    }

    private makeNewGameMatrix(size: number): Array<Array<0 | 1 | 2>> {
        const newMatrix: Array<Array<0 | 1 | 2>> = [];
        for (let i = 0; i < size; i++) {
            newMatrix[i] = [];
            for (let j = 0; j < size; j++) {
                newMatrix[i][j] = 0;
            }
        }
        return newMatrix;
    }

    private setFirstPotentialMove(size: number): PotentialMoves {
        const fieldCenter = Math.floor(size / 2);
        this.potentialMoves = this.potentialMoves.setIn([fieldCenter, fieldCenter], new Weight(0, 0));
        return this.potentialMoves;
    }


    public takeTurn(n: number, m: number, xo: 1 | 2) {
        if (n != null && m != null) {
            this.saveMove(n, m, xo)
            this.updatePotentialMove(n, m);
            this.calculatePotentialMovePattern(this.aiSide === 1);
        }

        const goodMoves: Coords[] = this.getGoodMoves();
        const move: Coords = this.getRandomGoodMove(goodMoves);
        this.saveMove(move.row, move.col, this.aiSide);
        this.updatePotentialMove(move.row, move.col);
        this.calculatePotentialMovePattern(xo === 1);
        return ({
            row: move.row,
            col: move.col,
            val: this.aiSide
        });
    }

    public checkIfWinner(row: number, col: number, xo: 1 | 2): boolean {
        let lines: string[] = this.getAllLines(row, col);
        for (let line of lines) {
            if (pattern.isWinnerLine(xo, line)) {
                return true;
            }
        }
        return false;
    }

    private saveMove = function(n: number, m: number, xo: 1 | 2) {
        this.matrix[n][m] = xo;
    }

    private getGoodMoves(): Coords[] {
        const goodMoves: Coords[] = [];
        let max = 0;
        this.potentialMoves.forEach((row, i) => {
            row.forEach((cell: Weight) => {
                if (cell.sum > max) {
                    max = 0.9 * cell.sum
                }
            })
        })
        this.potentialMoves.forEach((row, i: number )=> {
            row.forEach((cell: Weight, j: number) => {
                if (cell.sum >= max) {
                    goodMoves.push(new Coords(i, j))
                }
            })
        })
        return goodMoves;
    }

    private getRandomGoodMove(moves: Coords[]): Coords {
        return moves[Utils.getRandomInt(0, moves.length - 1)];
    }

    private updatePotentialMove(row: number, cell: number) {
        this.potentialMoves = this.potentialMoves.deleteIn([row, cell]);
        for (let i = -2; i <= 2; i++) {
            for (let j = -2; j <= 2; j++) {
                const cellCoords = new Coords(row + i, cell + j);
                if (!this.isEmptyCell(cellCoords, this.matrix)) {
                    continue;
                }
                this.potentialMoves = this.potentialMoves.setIn([cellCoords.row, cellCoords.col], new Weight(0, 0));
            }
        }
    }

    private calculatePotentialMovePattern(isAIPlayingX: boolean) {
        this.potentialMoves.forEach((row, rowIndex) => {
            row.forEach((cell: Weight, cellIndex) => {
                let weightX = 0;
                let weightO = 0;
                const lines: string[] = this.getAllLines(rowIndex, cellIndex, true);
                for (let i in lines) {
                    const line = lines[i];
                    if (line === pattern.emptyPatern) {
                        continue;
                    }
                    if (pattern.isPossibleLine(1, line)) {
                        weightX += pattern.getWeightPattern(1, line);
                    }
                    if (pattern.isPossibleLine(2, line)) {
                        weightO += pattern.getWeightPattern(2, line);
                    }
                    const weight = isAIPlayingX ? new Weight((1.02 * weightX), weightO)
                    : new Weight((1.02 * weightO), weightX);
                    this.potentialMoves = this.potentialMoves.setIn([rowIndex, cellIndex], weight);
                }
            })
        })
    };

    private isCellOnField(cellCoords: Coords, size: number): boolean {
        return cellCoords.row >= 0
        && cellCoords.col >= 0
        && cellCoords.row < size
        && cellCoords.col < size
    }
    private isEmptyCell(cellCoords: Coords, matrix: Array<Array<0 | 1 | 2>>): boolean {
        if (!this.isCellOnField(cellCoords, matrix.length)) {
            return false;
        }
        return matrix[cellCoords.row][cellCoords.col] === 0;
    }

    private getOneSymbol(i: number, n: number, m: number, test: boolean) {
        if (!this.isCellOnField(new Coords(n, m), this.size)) {
            return '';
        }
        return (test && i === 0) ? '7' : this.matrix[n][m];
    };

    private getLine(lineNumber: number, row: number, col: number, test: boolean) {
        let s = '';
        for (var i = -4; i <= 4; i++) {
            if (lineNumber === 1) {
                s += this.getOneSymbol(i, row + i, col, test);
            } else if (lineNumber === 2) {
                s += this.getOneSymbol(i, row, col + i, test);
            } else if (lineNumber === 3) {
                s += this.getOneSymbol(i, row + i, col + i, test);
            } else {
                s += this.getOneSymbol(i, row - i, col + i, test);
            }
        }
        return s;
    }

    private getAllLines(row: number, col: number, a?: boolean): string[] {
        let test = a || false;
        const lines: string[] = [];
        for (let j = 1; j <= 4; j++)
            lines[lines.length] = this.getLine(j, row, col, test);
        return lines;
    };

    // this.getLines = function(n, m, a) { // Получение 4 линий:  | — \ /  -- оптимизированный аналог getAllLines
    //     var test = a || false;
    //     var nT = Math.min(n, 4);
    //     var nR = Math.min(this.size - m - 1, 4);
    //     var nB = Math.min(this.size - n - 1, 4);
    //     var nL = Math.min(m, 4);
    //     var lines = ['', '', '', ''];//[['', 1, n - nT, m], ['', 1, n, m - nL], ['', 3, n - Math.min(nT, nL), m - Math.min(nT, nL)], ['', 4, n + Math.min(nB, nL), m - Math.min(nB, nL)]];

    //     for (var j = n - nT; j <= n + nB; j++)
    //         lines[0] += (test && j === n) ? '7' : this.matrix[j][m];
    //     for (var i = m - nL; i <= m + nR; i++)
    //         lines[1] += (test && i === m) ? '7' : this.matrix[n][i];
    //     for (var i = -Math.min(nT, nL); i <= Math.min(nR, nB); i++)
    //         lines[2] += (test && i === 0) ? '7' : this.matrix[n + i][m + i];
    //     for (var i = -Math.min(nB, nL); i <= Math.min(nR, nT); i++)
    //         lines[3] += (test && i === 0) ? '7' : this.matrix[n - i][m + i];
    //     return lines;
    // };
}