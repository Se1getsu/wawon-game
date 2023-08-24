/**
 * Gameドメインはゲームのプレイ状況を保持する
 */

export default class Game {
    constructor() {
        this.fps = 60;
        this.currentScore = 0;
        this.currentFrame = 0;
        this.judges = {
            just:   0,
            great:  0,
            good:   0,
            bad:    0,
            miss:   0
        }
        this.combo = 0;
    }

    increaseScore(score) {
        this.currentScore += score;
    }

    get CurrentScore() {
        return this.currentScore;
    }

    get CurrentFrame() {
        return this.currentFrame;
    }

    set CurrentFrame(currentFrame) {
        this.currentFrame = currentFrame;
    }

    get Combo() {
        return this.bpm;
    }

    incrementCombo() {
        this.combo++;
    }

    resetCombo() {
        this.combo = 0;
    }

    incrementJudge(judge) {
        this.judges[judge]++;
    }

    getJudgeCountOf(judge) {
        return this.judges[judge];
    }
}
