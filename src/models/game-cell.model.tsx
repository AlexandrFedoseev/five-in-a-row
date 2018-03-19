export class GameCell {
    constructor(
        public x: number,
        public y: number,
        public value: 0 | 1 | 2,
        public turn: number
    ) {}
}