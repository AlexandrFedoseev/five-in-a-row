export class Weight {
    constructor(
        public attack: number,
        public defence: number
    ) {}

    public get sum(): number {
        return this.attack + this.defence;
    }
}