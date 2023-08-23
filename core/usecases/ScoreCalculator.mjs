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

    calcNoteScore(judge) {
        return this.baseScoreOfNote
            * this.judgeCoef[judge];
    }

}
