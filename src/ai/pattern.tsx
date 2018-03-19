import { PatternOption } from "./models/pattern-option.model";
import { AIUtils } from './utils';

class Pattern {
    private patternOptions: PatternOption[]  = [
        new PatternOption(30000, ['xxxxx']),
        new PatternOption(1000, ['0xxxx0']),
        new PatternOption(500, ['xxxx0']),
        new PatternOption(400, ['x0xxx', 'xx0xx']),
        new PatternOption(100, ['00xxx000']),
        new PatternOption(80, ['00xxx00']),
        new PatternOption(75, ['0xxx00']),
        new PatternOption(50, ['0xxx0','xxx00']),
        new PatternOption(25, ['x0xx0', 'xx0x0', 'x00xx']),
        new PatternOption(10, ['000xx000']),
        new PatternOption(5, ['0xx0'])
    ];

    private pattern: any[] = [[], [], []]; // Массив шаблонов для Х и 0, генерируется из предыдущих шаблонов. Вес, для X, для O
    private winnerLine: RegExp[] = [null, /(1){5,}/, /(2){5,}/]; // Выигрышный шаблон, 1 - для Х, 2 - для О
    private possibleLine: RegExp[] = [null, /[01]*7[01]*/, /[02]*7[02]*/]; // Шаблон определения возможности поставить 5 в ряд (если длина линии будет >=5)
    public emptyPatern = '000070000'; // Шаблон "пустой строки" бессмысленной для анализа

    constructor() {
        this.init();
    }

    private init() {
        for (let option of this.patternOptions) {
            for (let pattern of option.patterns) {
                let genPatterns = AIUtils.replace7x(pattern);
                const fromTheEnd = AIUtils.reverseString(pattern)
                if (fromTheEnd !== pattern) {
                    genPatterns = genPatterns.concat(AIUtils.replace7x(fromTheEnd));
                }
                const combinedPattern: string = '(' + genPatterns.join('|') + ')';
                this.pattern[0].push(option.weight)
                this.pattern[1].push(new RegExp(combinedPattern.replace(/x/g, '1')))
                this.pattern[2].push(new RegExp(combinedPattern.replace(/x/g, '2')))
            }
        }
    }

    public isWinnerLine(xo: 1 | 2, s: string): boolean {
        return s.search(this.winnerLine[xo]) !== -1;
    };

    public getWinnerLine(xo: 1 | 2, s: string) {
        var start = s.search(this.winnerLine[xo]);
        if (start === -1) {
            return false;
        }
        return [start, this.winnerLine[xo].exec(s)[0].length];
    };

    public getLengthWinnerLine(xo: 1 | 2, s: string) {
        return this.winnerLine[xo].exec(s)[0].length;
    };

    public isPossibleLine(xo: 1 | 2, s: string) {
        var r = this.possibleLine[xo].exec(s);
        if (r !== null)
            return r[0].length >= 5;
        return false;
    };

    public getWeightPattern(xo: 1 | 2, s: string): number {
        var w = 0;
        for (var i in this.pattern[xo]) {
            if (this.pattern[xo][i].test(s)) {
                w += this.pattern[0][i];
                break;
            }
        }
        return w;
    }

}

const pattern = new Pattern();
export default pattern;