/**
 * ChartユースケースはChartのビジネスロジック
 */

export default class GameUsecase {
    constructor(game) {
        this.game = game;
    }

    setBpm(bpm) {
        this.bpm = bpm;
    }

    getBpm() {
        return this.game.Bpm;
    }

    setFps(fps) {
        this.game.Fps = fps;
    }

    getFps() {
        return this.game.Fps;
    }

    getCurrentScore(score) {
        return this.game.CurrentScore;
    }

    nextFrame() {
        let currentFrame = this.game.CurrentFrame;
        currentFrame++;
        this.game.CurrentFrame = currentFrame;
        // TODO: 判定幅を過ぎたノーツのMISS判定を出す。
    }

    _getCurrentBeatTime(bpm) {
        return (this.game.CurrentFrame * bpm) / (fps * 60);
    }
}
