/**
 * ScoreCalculatorはスコアの計算を行うビジネスロジック
 */

export default class ScoreCalculator {
    constructor() {
        this.baseScoreOfNote = 100;
        this.judgeCoef = {
            just:   1.0,
            great:  0.7,
            good:   0.5,
            bad:    0.0,
            miss:   0.0,
        }
    }

    calcNoteScore(judge, combo) {
        return Math.floor(
            this.baseScoreOfNote
            * this.judgeCoef[judge]
            * calcComboCoef(combo)
        );
    }

    calcComboCoef(combo) {
        return Math.min(
            Math.floor((combo-1) / 3) * 0.01,
            0.1
        );
    }

}
