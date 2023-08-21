/**
 * Gameドメインはゲームのプレイ状況を保持する
 */

export default class Game {
    constructor() {
        this.fps = 60;
        this.currentScore = 0;
        this.currentFrame = 0;
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
}
